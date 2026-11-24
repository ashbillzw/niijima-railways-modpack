"""Install a local test release, run a plan in a private world and collect evidence."""
import argparse
import json
import os
import re
from pathlib import Path
import shutil
import subprocess
import sys
import time
import uuid


def read(path):
    return json.loads(path.read_text(encoding="utf-8-sig"))


def bootstrap():
    return [{"op": "waitScreen", "screen": "random_video", "stableMs": 1200},
            {"op": "createWorld", "seed": 42}, {"op": "waitWorld"}]


def load_steps(path, x, fresh=False):
    plan = read(path)
    if isinstance(plan, dict):
        mode = plan["gamemode"]
        if mode not in ("creative", "survival"):
            raise ValueError("Invalid fixture gamemode")
        steps = [{"op": "preparePlayer"}, {"op": "command", "command": f"gamemode {mode} @s"},
                 {"op": "command", "command": "clear @s"}]
        for step in plan["steps"]:
            if step["op"] == "command":
                cmd = re.sub(r"\$x([+-]\d+(?:\.\d+)?)?", lambda m: format(x + float(m[1] or 0), "g"),
                             step["command"])
                if len(cmd) > 256:
                    raise ValueError(f"Command exceeds 256 characters: {cmd}")
                step["command"] = cmd
            steps.append(step)
        return (bootstrap() if fresh else []) + steps
    if not isinstance(plan, list) or not plan:
        raise ValueError("Expected a fixture or a non-empty array of steps")
    return plan


def wait_for(path, deadline, process=None, stopped=None, crashes=None, started=0, early_exit=None):
    while not path.is_file():
        if early_exit and early_exit.is_file():
            failure = read(early_exit)
            raise RuntimeError(f"Client exited during startup: {failure['error']} {failure['exception']}".strip())
        if process and process.poll() not in (None, 0):
            raise RuntimeError(f"Launcher exited with {process.returncode} while waiting for {path.name}")
        if stopped and stopped.exists():
            raise RuntimeError("Client exited before writing its result")
        if crashes:
            for report in crashes.glob("crash-*.txt"):
                if report.stat().st_mtime_ns >= started:
                    raise RuntimeError(f"Game crashed: {report.name}")
        if time.monotonic() >= deadline:
            raise TimeoutError(f"Timed out waiting for {path}")
        time.sleep(.2)
    return path


def run(args, output, run_id):
    launcher = [str(args.launcher.resolve())]
    if args.data_dir:
        launcher += ["--dir", str(args.data_dir.resolve())]
    steps = bootstrap() if args.resident else load_steps(args.plan, -32, fresh=True)

    receipt = output / "installed.json"
    if args.reuse:
        shutil.copyfile(args.reuse, receipt)
    else:
        install = subprocess.Popen(launcher + ["--install-test", args.pack_id, "--test-result-dir", str(output)])
        wait_for(receipt, time.monotonic() + args.timeout, install)
        install.wait(timeout=30)
    metadata = read(receipt)
    if "error" in metadata:
        raise RuntimeError(metadata["error"])
    game = Path(metadata["gameRoot"])
    if metadata["packId"] != args.pack_id or read(game / "niijima-pack.json")["pack-id"] != args.pack_id:
        raise ValueError("Installed instance does not match the requested pack ID")
    if not (game / "mods/niijima-client-test.jar").is_file():
        raise ValueError("Installed release does not contain the client test mod")

    sessions = game / ".niijima-test"
    sessions.mkdir(exist_ok=True)
    lock = sessions / "runner.lock"
    with lock.open("x", encoding="ascii") as file:
        file.write(run_id)
    request = sessions / "request.json"
    session = sessions / run_id
    started = time.time_ns()
    crashes = game / "crash-reports"
    launch_exit = sessions / (run_id + ".launch.json")
    process = None
    try:
        if request.exists():
            raise RuntimeError("Instance already has a pending test")
        pending = sessions / (run_id + ".tmp")
        pending.write_text(json.dumps({"run": run_id, "steps": steps, "heapMiB": args.heap_mib,
                                       "resident": args.resident}), encoding="utf-8")
        pending.rename(request)
        command = launcher + ["--launch", metadata["instance"]]
        if args.offline_name:
            command += ["--offline", args.offline_name]
        process = subprocess.Popen(command)
        deadline = time.monotonic() + args.timeout
        wait_for(session / "result.json", deadline, process, session / "stopped", crashes, started,
                 launch_exit)
        result = read(session / "result.json")
        print(json.dumps(result, ensure_ascii=False), flush=True)
        if args.resident:
            shutil.copyfile(session / "result.json", output / "result.json")
            print("Resident session ready" if result["passed"] else "World setup failed", flush=True)
        wait_for(session / "stopped", float("inf") if args.resident else deadline, process, crashes=crashes,
                 started=started, early_exit=launch_exit)
        wait_for(launch_exit, time.monotonic() + 60)
        return 0 if result["passed"] else 1
    finally:
        if request.is_file() and read(request).get("run") == run_id:
            request.unlink()
        if session.is_dir():
            shutil.copytree(session, output, dirs_exist_ok=True)
        log = game / "logs/latest.log"
        if log.is_file() and log.stat().st_mtime_ns >= started:
            shutil.copyfile(log, output / "latest.log")
        for report in crashes.glob("crash-*.txt"):
            if report.stat().st_mtime_ns >= started:
                shutil.copyfile(report, output / report.name)
        # After a timeout the client may still be running. Keep its instance reserved.
        if process is None or launch_exit.exists() or process.poll() not in (None, 0):
            lock.unlink()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("pack_id")
    parser.add_argument("--launcher", type=Path, required=True)
    parser.add_argument("--data-dir", type=Path)
    mode = parser.add_mutually_exclusive_group()
    mode.add_argument("--plan", type=Path, default=Path(__file__).with_name("smoke.json"))
    mode.add_argument("--resident", action="store_true", help="Create a private world and await individual cases")
    parser.add_argument("--results", type=Path, default=Path("client-test-results"))
    parser.add_argument("--reuse", type=Path, help="installed.json from a previous dedicated test installation")
    parser.add_argument("--offline-name", help="Use the launcher's existing offline launch mode")
    parser.add_argument("--heap-mib", type=int, help="Limit the Java heap for this test launch (MiB)")
    parser.add_argument("--timeout", type=int, default=600)
    args = parser.parse_args()
    if args.heap_mib is not None and args.heap_mib <= 0:
        parser.error("--heap-mib must be positive")
    run_id = str(uuid.uuid4())
    output = args.results.resolve() / run_id
    output.mkdir(parents=True)
    print(output, flush=True)
    try:
        return run(args, output, run_id)
    except (OSError, ValueError, RuntimeError, subprocess.SubprocessError) as error:
        (output / "runner-error.txt").write_text(str(error), encoding="utf-8")
        print(error, file=sys.stderr)
        return 2


if __name__ == "__main__":
    sys.exit(main())
