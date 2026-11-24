"""Submit one case to an existing local client, or ask it to save and close."""
import argparse
import json
from pathlib import Path
import shutil
import sys
import time
from uuid import uuid4

from run import load_steps, read, wait_for


def submit(args):
    output = args.session.resolve()
    game = Path(read(output / "installed.json")["gameRoot"])
    root = game / ".niijima-test"
    session = root / output.name
    stopped = session / "stopped"
    exit_file = root / (output.name + ".launch.json")
    deadline = time.monotonic() + args.timeout
    if (root / "runner.lock").read_text() != output.name or stopped.exists():
        raise RuntimeError("This session is no longer running")
    ready = read(wait_for(session / "result.json", deadline, stopped=stopped, early_exit=exit_file))
    if not read(session / "plan.json").get("resident"):
        raise ValueError("Expected a resident session")
    if not ready["passed"] and not args.close:
        raise RuntimeError("World setup failed")
    last = max((int(d.name[5:]) for d in session.glob("case-*")), default=0)
    if last and not (session / f"case-{last}/result.json").exists():
        raise RuntimeError(f"Case {last} is still in progress or the session is closing")
    number = last + 1
    case = session / f"case-{number}"
    origin = -32 + 32 * last
    plan = {"close": True} if args.close else {
        "name": args.plan.stem, "originX": origin, "steps": load_steps(args.plan, origin)}
    pending = session / (str(uuid4()) + ".tmp")
    pending.mkdir()
    log = game / "logs/latest.log"
    offset = log.stat().st_size
    try:
        (pending / "plan.json").write_text(json.dumps(plan, ensure_ascii=False), encoding="utf-8")
        pending.rename(case)
    finally:
        if pending.exists():
            shutil.rmtree(pending)
    if args.close:
        wait_for(stopped, deadline, early_exit=exit_file)
        wait_for(exit_file, deadline)
        print("Client stopped")
        return 0
    target = output / case.name
    try:
        result = read(wait_for(case / "result.json", deadline, stopped=stopped, early_exit=exit_file))
    finally:
        shutil.copytree(case, target, dirs_exist_ok=True)
        with log.open("rb") as src, (target / "latest.log").open("wb") as dst:
            src.seek(offset)
            shutil.copyfileobj(src, dst)
    print(target, json.dumps(result, ensure_ascii=False), flush=True)
    return 0 if result["passed"] else 1


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("session", type=Path, help="Result directory printed by run.py --resident")
    action = parser.add_mutually_exclusive_group(required=True)
    action.add_argument("--plan", type=Path)
    action.add_argument("--close", action="store_true")
    parser.add_argument("--timeout", type=int, default=600)
    try:
        sys.exit(submit(parser.parse_args()))
    except (OSError, ValueError, RuntimeError) as error:
        print(f"Session error: {error}", file=sys.stderr)
        sys.exit(2)
