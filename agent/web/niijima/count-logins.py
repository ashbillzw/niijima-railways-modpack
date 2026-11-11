"""Count successful joins in retained Forge/vanilla server logs, without changing them.

Pass create-cn/logs first, then train-cn/logs. Identical archived sessions are
credited to the first server. Run again while both are stopped for final seeds.
"""
import argparse
import gzip
import hashlib
import re
from collections import Counter
from datetime import date
from pathlib import Path

ARCHIVE = re.compile(r"(\d{4}-\d\d-\d\d)-(\d+)\.log(?:\.gz)?$")
JOIN = re.compile(rb"^\[[^\]\n]+\] \[Server thread/INFO\](?: \[(?:net\.minecraft\.server\.players\.PlayerList|minecraft/PlayerList)/?\])?: [^\s\[]+\[[^\n]*?\] logged in with entity id -?\d+ at ", re.M)


def scan(path):
    digest = hashlib.sha256()
    count = 0
    with (gzip.open if path.suffix == ".gz" else open)(path, "rb") as stream:
        while chunk := stream.read(1024 * 1024):
            if not chunk.endswith(b"\n"):
                chunk += stream.readline()
            digest.update(chunk)
            count += sum(1 for _ in JOIN.finditer(chunk))
    return digest.digest(), count


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("logs", type=Path, nargs="+")
    args = parser.parse_args()
    seen = set()
    total = 0
    for directory in args.logs:
        archives = sorted(p for p in directory.iterdir() if ARCHIVE.fullmatch(p.name))
        dates = Counter(p.name[:10] for p in archives)
        raw = duplicate = shared = 0
        for path in [*archives, directory / "latest.log"]:
            fingerprint, count = scan(path)
            raw += count
            if fingerprint in seen:
                duplicate += count
                shared += 1
            seen.add(fingerprint)
        first, last = (min(dates), max(dates)) if dates else ("-", "-")
        gaps = (date.fromisoformat(last) - date.fromisoformat(first)).days + 1 - len(dates) if dates else 0
        print(f"{directory.parent.name}: archives={len(archives)} range={first}..{last} "
              f"days_without_rotation={gaps} including_latest={raw} duplicate_files={shared} "
              f"duplicate_joins={duplicate} seed={raw - duplicate}", flush=True)
        total += raw - duplicate
    print(f"total={total}", flush=True)


if __name__ == "__main__":
    main()
