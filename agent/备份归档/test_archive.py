import contextlib
import io
import json
import os
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch
import zipfile
from datetime import datetime, timezone

import archive as app
from simulate import simulate

POLICY = {'min_days': 7, 'ratio': .3, 'max_days': 180}


class PolicyTests(unittest.TestCase):
    def test_simulation_regression(self):
        snapshots = simulate([100, 200, 500, 1000], POLICY)
        self.assertEqual([len(v) for v in snapshots.values()], [17, 21, 26, 30])
        self.assertEqual(snapshots[1000], [0, 2, 4, 6, 8, 10, 12, 16, 22, 28,
            34, 40, 52, 64, 76, 88, 112, 136, 160, 184, 232, 280, 328, 424,
            520, 616, 712, 808, 904, 1000])

    def test_endpoints_protection_and_each_gap(self):
        now = 1000 * app.DAY
        kept = [app.Backup(str(d), d*app.DAY, ()) for d in range(0, 1001, 2)]
        protected = {str(d) for d in range(988, 1001, 2)}
        for b in app.deletion_order(kept, protected, now, POLICY):
            i = kept.index(b)
            self.assertNotIn(b.name, protected)
            self.assertGreater(i, 0)
            self.assertLess(i, len(kept)-1)
            c, _, a = kept[i-1:i+2]
            self.assertLessEqual(a.timestamp-c.timestamp, app.allowance(now-a.timestamp, POLICY))
            kept.pop(i)
        self.assertEqual(kept[0].name, '0')
        self.assertEqual(app.deletion_order(kept, protected, now, POLICY), [])

    def test_future_and_duplicate_dates_fail(self):
        with self.assertRaises(ValueError):
            app.deletion_order([app.Backup('future', 2, ())], set(), 1, POLICY)
        with self.assertRaises(ValueError):
            app.deletion_order([app.Backup('a', 0, ()), app.Backup('b', 0, ())], set(), 1, POLICY)

    def test_ceiling(self):
        self.assertEqual(app.allowance(10000*app.DAY, POLICY), 180*app.DAY)


class FilesystemTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name).resolve()
        self.source = self.root/'world'/'automatic'
        self.archive = self.source.parent/'archive'
        self.source.mkdir(parents=True)
        self.archive.mkdir()
        self.logs = self.root/'logs'
        self.logs.mkdir()
        self.job = dict(name='world', prefix='world_', source=str(self.source), archive=str(self.archive), logs=str(self.logs))
        self.config = dict(policy=POLICY, timezone='UTC', minimum_age_seconds=3600,
                           mount={'target': str(self.root)}, jobs=[self.job])
        self.now = 1760000000
        self.addCleanup(patch.stopall)
        patch.object(app, 'mount_check', return_value=self.root).start()

    def make(self, day, folder=None):
        name = f'world_2025-01-{day:02d}_00-00-00.zip'
        path = (folder or self.source)/name
        with zipfile.ZipFile(path, 'w') as z:
            z.writestr('level.dat', 'test world')
        stamp = datetime(2025, 1, day, tzinfo=timezone.utc).timestamp()
        os.utime(path, (stamp+60, stamp+60))
        with (self.logs/'latest.log').open('a', encoding='utf-8') as log:
            log.write(f'[{day:02d}Jan2025 00:00:00.000] [SimpleBackups/INFO] [mod/]: Backup started...\n')
            log.write(f'[{day:02d}Jan2025 00:01:01.000] [SimpleBackups/INFO] [mod/]: Backup completed in 1min (1 MB)\n')
        return path

    def run_mode(self, mode):
        with contextlib.redirect_stdout(io.StringIO()):
            app.run_job(self.config, self.job, mode, self.now)

    def test_dry_run_no_writes(self):
        self.make(1)
        self.run_mode('dry-run')
        self.assertEqual(list(self.archive.iterdir()), [])

    def test_link_idempotence_and_original_rotation(self):
        src = self.make(1)
        self.run_mode('link-only')
        dst = self.archive/src.name
        self.assertTrue(os.path.samefile(src, dst))
        self.run_mode('link-only')
        src.unlink()
        with zipfile.ZipFile(dst) as z:
            self.assertEqual(z.read('level.dat'), b'test world')

    def test_prune_protects_source_and_oldest(self):
        for d in (1, 3, 5):
            self.make(d, self.archive)
        src = self.make(7)
        self.run_mode('prune')
        self.assertTrue((self.archive/'world_2025-01-01_00-00-00.zip').exists())
        self.assertEqual(len(list(self.archive.iterdir())), 2)
        self.assertTrue(os.path.samefile(src, self.archive/src.name))

    def test_incomplete_and_fresh_zip_deferred(self):
        fresh = self.make(1)
        os.utime(fresh, (self.now, self.now))
        incomplete = self.source/'world_2025-01-03_00-00-00.zip'
        incomplete.write_bytes(b'PK\x03\x04 unfinished')
        os.utime(incomplete, (self.now-7200, self.now-7200))
        self.run_mode('link-only')
        self.assertEqual(list(self.archive.iterdir()), [])

    def test_same_name_different_inode_refused(self):
        self.make(1)
        self.make(1, self.archive)
        with self.assertRaisesRegex(ValueError, 'Same name'):
            self.run_mode('prune')

    def test_empty_source_refuses_cleanup(self):
        self.make(1, self.archive)
        with self.assertRaisesRegex(ValueError, 'empty'):
            self.run_mode('prune')
        self.assertEqual(len(list(self.archive.iterdir())), 1)

    def test_unrecognized_file_refuses_cleanup(self):
        self.make(1)
        (self.archive/'manual.zip').write_bytes(b'keep')
        with self.assertRaisesRegex(ValueError, 'Unexpected entry'):
            self.run_mode('prune')
        self.assertTrue((self.archive/'manual.zip').exists())

    def test_change_before_write_aborts(self):
        src = self.make(1)
        real_check = app.check_directories
        calls = 0
        def change(*args):
            nonlocal calls
            calls += 1
            if calls == 2:
                src.write_bytes(b'changed')
            return real_check(*args)
        with patch.object(app, 'check_directories', side_effect=change):
            with self.assertRaisesRegex(ValueError, 'changed'):
                self.run_mode('link-only')
        self.assertFalse((self.archive/src.name).exists())

    def test_failed_link_does_not_prune(self):
        self.make(1, self.archive)
        self.make(3, self.archive)
        self.make(5)
        with patch.object(app.os, 'link', side_effect=PermissionError('denied')):
            with self.assertRaises(PermissionError):
                self.run_mode('prune')
        self.assertEqual(len(list(self.archive.iterdir())), 2)

    def test_write_gate(self):
        cfg = self.root/'config.json'
        cfg.write_text(json.dumps(self.config), encoding='utf-8')
        with patch('sys.argv', ['archive.py', '--config', str(cfg), '--mode', 'prune']):
            with contextlib.redirect_stderr(io.StringIO()):
                self.assertEqual(app.main(), 1)

    def test_valid_zip_without_success_log_blocks_cleanup(self):
        self.make(1)
        (self.logs/'latest.log').write_text('', encoding='utf-8')
        with self.assertRaisesRegex(ValueError, 'No matching successful'):
            self.run_mode('prune')
        self.assertEqual(list(self.archive.iterdir()), [])

    def test_failed_backup_log_blocks_archive(self):
        self.make(1)
        p = self.logs/'latest.log'
        p.write_text(p.read_text().replace('Backup completed in 1min (1 MB)', 'Error backing up').replace(
            '00:01:01.000] [SimpleBackups/INFO]', '00:01:01.000] [SimpleBackups/ERROR]'))
        with self.assertRaisesRegex(ValueError, 'No matching successful'):
            self.run_mode('link-only')

    def test_rotated_gzip_success_log(self):
        self.make(1)
        latest = self.logs/'latest.log'
        with app.gzip.open(self.logs/'2025-01-01-1.log.gz', 'wt') as log:
            log.write(latest.read_text())
        latest.unlink()
        self.run_mode('link-only')
        self.assertEqual(len(list(self.archive.iterdir())), 1)


class MountTests(unittest.TestCase):
    def test_wrong_mount_rejected(self):
        cfg = {'mount': {'target': '/synology/MCShare', 'source': 'nas:/volume1/MCShare'}}
        for fs in [dict(target='/synology/MCShare', source='/dev/sda', fstype='ext4'),
                   dict(target='/synology/MCShare', source='other:/share', fstype='nfs')]:
            with patch('subprocess.check_output', return_value=json.dumps({'filesystems': [fs]})):
                with self.assertRaises(ValueError):
                    app.mount_check(cfg)


if __name__ == '__main__':
    unittest.main()
