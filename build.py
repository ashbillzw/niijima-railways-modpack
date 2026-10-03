"""Build pack.zip; the launcher downloads the indexed MCEF ZIP. Requires Python 3.10+ and 7z on PATH."""
# import hashlib
# import json
import shutil
import subprocess
# import tarfile
import uuid
from contextlib import contextmanager
# import time
# import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent
OUTPUT = ROOT / 'output'
# DEST = Path('overrides/AshBill/免下载MCEF/mcef-libraries')

@contextmanager
def build_workspace(parent, prefix):
    # Python's private temp directories can retain owner-only Windows ACLs
    # after moving their contents. Inherit the output directory's ACL instead.
    path = parent / (prefix + uuid.uuid4().hex)
    path.mkdir()
    try:
        yield path
    finally:
        assert path.resolve().is_relative_to(OUTPUT.resolve())
        shutil.rmtree(path)

# Previous bundled-runtime preparation, retained for reference.
# def sha256(path):
#     h = hashlib.sha256()
#     with path.open('rb') as f:
#         for block in iter(lambda: f.read(1024 * 1024), b''):
#             h.update(block)
#     return h.hexdigest()
#
# def valid_runtime(path, spec):
#     return (path.is_dir()
#             and {f.relative_to(path).as_posix() for f in path.rglob('*') if f.is_file()} == set(spec['files'])
#             and all(sha256(path / n) == digest for n, digest in spec['files'].items()))
#
# def download(url, archive):
#     partial = archive.with_suffix(archive.suffix + '.part')
#     print(f'Downloading: {url}\nManual download location: {archive}', flush=True)
#     try:
#         start = time.monotonic()
#         request = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
#         with urllib.request.urlopen(request, timeout=30) as response, partial.open('wb') as f:
#             total = int(response.headers.get('Content-Length', '0'))
#             received, last_update = 0, start
#             while block := response.read(1024 * 1024):
#                 f.write(block)
#                 received += len(block)
#                 now = time.monotonic()
#                 if now - last_update >= 0.5 or (total > 0 and received >= total):
#                     speed = received / max(now - start, 0.001)
#                     progress = f'{received / total:.1%}' if total > 0 else f'{received / 1048576:.1f} MiB'
#                     seconds = round(max(0, total - received) / speed) if total > 0 else None
#                     eta = f'{seconds // 60}m{seconds % 60:02d}s' if seconds is not None else 'unknown'
#                     print(f'\r{progress} | {speed / 1048576:.2f} MiB/s | ETA {eta}     ', end='', flush=True)
#                     last_update = now
#                 if now - start > 300:
#                     raise TimeoutError('Download exceeded 5 minutes; download manually instead.')
#             if total > 0 and received != total:
#                 raise IOError(f'Incomplete download: {received}/{total} bytes')
#         partial.replace(archive)
#     finally:
#         print(flush=True)
#         partial.unlink(missing_ok=True)
#
# def prepare_runtime(spec):
#     platform = spec['platform']
#     runtime = ROOT / 'pack' / DEST / platform
#     if valid_runtime(runtime, spec):
#         print('Using complete MCEF runtime in pack.', flush=True)
#         return runtime
#     archive = OUTPUT / f'{platform}.tar.gz'
#     url = f"https://mcef-download.cinemamod.com/java-cef-builds/{spec['commit']}/{platform}.tar.gz"
#     if not archive.exists():
#         download(url, archive)
#     if sha256(archive) != spec['archive_sha256']:
#         raise ValueError(f'Archive checksum mismatch. Replace manually: {archive}')
#     # Only the download is staged, so an interrupted extraction cannot be used.
#     with build_workspace(OUTPUT, 'mcef-') as temp:
#         stage = temp / platform
#         with tarfile.open(archive, 'r:gz') as tar:
#             for member in tar:
#                 name = member.name.removeprefix('./')
#                 if member.isdir():
#                     continue
#                 relative = name.removeprefix(platform + '/')
#                 if not member.isfile() or name == relative or relative not in spec['files']:
#                     raise ValueError(f'Unexpected archive entry: {member.name}')
#                 target = stage / relative
#                 target.parent.mkdir(parents=True, exist_ok=True)
#                 with tar.extractfile(member) as source, target.open('wb') as dest:
#                     shutil.copyfileobj(source, dest)
#         if not valid_runtime(stage, spec):
#             raise ValueError('Runtime contents do not match mcef-runtime.json.')
#         if runtime.exists():
#             assert runtime.resolve().is_relative_to((ROOT / 'pack' / DEST).resolve())
#             shutil.rmtree(runtime)
#         runtime.parent.mkdir(parents=True, exist_ok=True)
#         shutil.move(str(stage), str(runtime))
#     archive.unlink()
#     return runtime
#
def main():
    if not shutil.which('7z'):
        raise RuntimeError('7z must be available on PATH.')
    # spec = json.loads((ROOT / 'mcef-runtime.json').read_text(encoding='utf-8'))
    OUTPUT.mkdir(parents=True, exist_ok=True)
    # prepare_runtime(spec)
    with build_workspace(OUTPUT, 'zip-') as temp:
        archive = temp / 'pack.zip'
        subprocess.run(['7z', 'a', '-tzip', str(archive), '.\\*'], cwd=ROOT / 'pack', check=True)
        subprocess.run(['7z', 't', str(archive)], check=True)
        archive.replace(OUTPUT / 'pack.zip')
    print(f"Build complete: {OUTPUT / 'pack.zip'}")

if __name__ == '__main__':
    try:
        main()
    except Exception as exc:
        print(f'Build failed: {exc}')
        raise SystemExit(1)
