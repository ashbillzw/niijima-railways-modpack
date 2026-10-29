#!/usr/bin/env python3
"""Hourly hard-link archive. Run writes only through the single systemd service."""
import argparse
from dataclasses import dataclass
from datetime import datetime, timedelta
from fractions import Fraction
import json
import gzip
import os
from pathlib import Path
import re
import stat
import subprocess
import sys
import time
import zipfile
from zoneinfo import ZoneInfo

DAY = 86400


@dataclass(frozen=True)
class Backup:
    name: str
    timestamp: int
    signature: tuple


def signature(path):
    s = path.lstat()
    if not stat.S_ISREG(s.st_mode):
        raise ValueError(f"Not a regular file: {path}")
    # ctime/link count change when hard links are created, so exclude them.
    return s.st_dev, s.st_ino, s.st_size, s.st_mtime_ns


def allowance(age, policy):
    return min(max(policy['min_days'] * DAY,
                   Fraction(str(policy['ratio'])) * age),
               policy['max_days'] * DAY)


def deletion_order(backups, protected, now, policy):
    """Oldest endpoint survives; ties remove the older middle point first."""
    kept = sorted(backups, key=lambda b: (b.timestamp, b.name))
    if len({b.timestamp for b in kept}) != len(kept):
        raise ValueError('Duplicate backup timestamps')
    if any(b.timestamp > now for b in kept):
        raise ValueError('Future backup timestamp; check clock/timezone')
    removed = []
    while True:
        choices = []
        for i in range(1, len(kept) - 1):
            c, b, a = kept[i-1:i+2]
            if b.name in protected:
                continue
            limit = allowance(now - a.timestamp, policy)
            gap = a.timestamp - c.timestamp
            if gap <= limit:
                choices.append((Fraction(gap) / limit, b.timestamp, b.name, i))
        if not choices:
            return removed
        removed.append(kept.pop(min(choices)[-1]))


def inventory(directory, prefix, timezone):
    pattern = re.compile(re.escape(prefix) + r'(\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2})\.zip')
    result = {}
    for path in sorted(directory.iterdir()):
        match = pattern.fullmatch(path.name)
        if not match:
            raise ValueError(f'Unexpected entry (no changes permitted): {path}')
        dt = datetime.strptime(match[1], '%Y-%m-%d_%H-%M-%S').replace(tzinfo=ZoneInfo(timezone))
        result[path.name] = Backup(path.name, int(dt.timestamp()), signature(path))
    return result


def mount_check(config):
    mount = Path(config['mount']['target'])
    output = subprocess.check_output(
        ['findmnt', '--json', '--mountpoint', str(mount), '--output', 'TARGET,SOURCE,FSTYPE'],
        text=True)
    filesystems = json.loads(output)['filesystems']
    if len(filesystems) != 1:
        raise ValueError('Expected exactly one NAS mount')
    fs = filesystems[0]
    if (fs['target'] != str(mount) or fs['source'] != config['mount']['source']
            or fs['fstype'] not in ('nfs', 'nfs4')):
        raise ValueError(f'Unexpected NAS mount: {fs}')
    return mount


def check_directories(config, job):
    mount = mount_check(config)
    source, archive = Path(job['source']), Path(job['archive'])
    for path in (source, archive):
        if not path.is_absolute() or not path.is_dir() or path.resolve() != path:
            raise ValueError(f'Directory missing or contains symlinks: {path}')
        if mount not in path.parents:
            raise ValueError(f'Outside NAS mount: {path}')
    if source.parent != archive.parent or source.name != 'automatic' or archive.name != 'archive':
        raise ValueError('Expected sibling automatic/ and archive/ directories')
    if source.stat().st_dev != archive.stat().st_dev:
        raise ValueError('Hard links require the same filesystem')
    return source, archive


def complete_zip(path, expected, now, minimum_age):
    if now * 1_000_000_000 - expected.signature[3] < minimum_age * 1_000_000_000:
        return False
    if signature(path) != expected.signature:
        raise ValueError(f'File changed: {path}')
    try:
        # Read central directory only; no decompression/full-file CRC scan.
        with zipfile.ZipFile(path) as z:
            if not z.infolist():
                return False
    except zipfile.BadZipFile:
        return False
    if signature(path) != expected.signature:
        raise ValueError(f'File changed during ZIP inspection: {path}')
    return True


def success_intervals(log_dir, backups, timezone):
    """Forge 1.20.1 dated logs; a valid ZIP alone does not prove backup success."""
    zone = ZoneInfo(timezone)
    paths = set()
    for b in backups:
        day = datetime.fromtimestamp(b.timestamp, zone).date()
        for offset in (-1, 0, 1):
            paths.update(log_dir.glob(f'{day + timedelta(days=offset)}-*.log.gz'))
    if (log_dir/'latest.log').is_file():
        paths.add(log_dir/'latest.log')
    events = set()
    pattern = re.compile(r'^\[(\d{2})([A-Z][a-z]{2})(\d{4}) (\d{2}):(\d{2}):(\d{2})[.](\d{3})\] '
                         r'\[SimpleBackups/(INFO|ERROR)\] .*?: (.*)$')
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    for path in sorted(paths):
        opener = gzip.open if path.suffix == '.gz' else open
        with opener(path, 'rt', encoding='utf-8', errors='replace') as stream:
            for line in stream:
                m = pattern.match(line)
                if not m:
                    continue
                d, month, y, h, minute, sec, ms, level, message = m.groups()
                if message == 'Backup started...':
                    kind = 'start'
                elif message.startswith('Backup completed in '):
                    kind = 'finish'
                elif level == 'ERROR':
                    kind = 'error'
                else:
                    continue
                stamp = datetime(int(y), months.index(month)+1, int(d), int(h), int(minute),
                                 int(sec), int(ms)*1000, tzinfo=zone).timestamp()
                events.add((stamp, kind))
    intervals, start, overlapping = [], None, False
    for stamp, kind in sorted(events):
        if kind == 'start':
            if start is not None:
                overlapping = True
            start = stamp
        elif kind == 'error':
            start, overlapping = None, False
        else:
            if start is not None and not overlapping:
                intervals.append((int(start), stamp))
            start, overlapping = None, False
    return intervals


def logged_success(backup, intervals):
    # Backup filename is generated after save-all, between start and completion.
    # NAS mtime and JVM log timestamps need not share a synchronized clock.
    return any(start <= backup.timestamp <= end for start, end in intervals)


def run_job(config, job, mode, now):
    source, archive = check_directories(config, job)
    def scan(path):
        return inventory(path, job['prefix'], config['timezone'])
    originals, archived = scan(source), scan(archive)
    if not originals:
        raise ValueError(f'{job["name"]}: automatic is empty; refusing cleanup')
    if any(b.timestamp > now for b in [*originals.values(), *archived.values()]):
        raise ValueError('Future backup timestamp')
    for name in originals.keys() & archived.keys():
        if originals[name].signature != archived[name].signature:
            raise ValueError(f'Same name is not the same unchanged inode: {name}')
    additions = {}
    pending = [b for n, b in originals.items() if n not in archived]
    intervals = success_intervals(Path(job['logs']), pending, config['timezone']) if pending else []
    for name, backup in originals.items():
        if name not in archived:
            if complete_zip(source/name, backup, now, config['minimum_age_seconds']):
                if not logged_success(backup, intervals):
                    raise ValueError(f'No matching successful backup log: {name}; no cleanup')
                additions[name] = backup
            else:
                print(f'{job["name"]}: defer {name}', flush=True)
    # Only completed archived/eligible points can anchor the retention algorithm.
    combined = archived | additions
    removals = deletion_order(combined.values(), set(originals), now, config['policy'])
    for name in additions:
        print(f'{job["name"]}: link {name}', flush=True)
    for backup in removals:
        print(f'{job["name"]}: {"delete" if mode == "prune" else "would-delete"} {backup.name}', flush=True)
    if mode != 'dry-run':
        check_directories(config, job)
        if scan(source) != originals or scan(archive) != archived:
            raise ValueError('Directory changed since planning; retry next run')
        for name, backup in additions.items():
            if signature(source/name) != backup.signature:
                raise ValueError(f'Source changed before link: {name}')
            os.link(source/name, archive/name, follow_symlinks=False)
            if signature(archive/name) != backup.signature:
                raise ValueError(f'Source changed while linking: {name}; inspect archive')
        if mode == 'prune':
            # Any source rotation/new backup postpones deletion until next run.
            if scan(source) != originals or scan(archive) != combined:
                raise ValueError('Directory changed before cleanup')
            for backup in removals:
                check_directories(config, job)
                if scan(source) != originals:
                    raise ValueError('Source directory changed during cleanup')
                # Revalidate all surviving anchors, not just the deletion target.
                if scan(archive) != combined:
                    raise ValueError('Archive changed during cleanup')
                (archive/backup.name).unlink()
                del combined[backup.name]
    remaining = len(combined) - (len(removals) if mode == 'dry-run' else 0)
    print(f'{job["name"]}: mode={mode} originals={len(originals)} additions={len(additions)} '
          f'eligible_deletions={len(removals)} archive_count={remaining}', flush=True)


def validate(config):
    p = config['policy']
    if not (0 < p['min_days'] <= p['max_days'] and 0 < p['ratio'] <= 1):
        raise ValueError('Invalid retention policy')
    if config['minimum_age_seconds'] < 0:
        raise ValueError('Invalid minimum age')
    ZoneInfo(config['timezone'])
    paths = [j[k] for j in config['jobs'] for k in ('source', 'archive')]
    if len(paths) != len(set(paths)) or not paths:
        raise ValueError('Duplicate or empty job paths')


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--config', required=True)
    parser.add_argument('--mode', choices=['dry-run', 'link-only', 'prune'], default='dry-run')
    args = parser.parse_args()
    try:
        config = json.loads(Path(args.config).read_text(encoding='utf-8'))
        validate(config)
        if args.mode != 'dry-run' and config.get('completion_contract_verified') is not True:
            raise ValueError('Verify completed ZIP immutability before enabling writes')
        failed = False
        for job in config['jobs']:
            try:
                run_job(config, job, args.mode, int(time.time()))
            except (OSError, ValueError, subprocess.SubprocessError, KeyError) as exc:
                print(f'{job["name"]}: ERROR {exc}', file=sys.stderr, flush=True)
                failed = True
        return int(failed)
    except (OSError, ValueError, KeyError) as exc:
        print(f'ERROR {exc}', file=sys.stderr)
        return 1


if __name__ == '__main__':
    sys.exit(main())
