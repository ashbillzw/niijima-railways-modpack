"""本机待办管理页。运行 python server.py 后打开终端打印的地址。"""
from hashlib import sha256
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
import json
import os
from pathlib import Path
import re
from tempfile import NamedTemporaryFile
from threading import Lock

ROOT = Path(__file__).resolve().parent
TODO = ROOT.parent / "todo-list.md"
ADDRESS = ("127.0.0.1", 18768)
URL = f"http://{ADDRESS[0]}:{ADDRESS[1]}"
WRITE_LOCK = Lock()
ASSETS = {"/": ("index.html", "text/html"), "/app.js": ("app.js", "text/javascript"),
          "/style.css": ("style.css", "text/css")}
CHECK = re.compile(r"^- \[([ xX])\] (.+)")
HEADER = re.compile(r"^(#{2,4}) (.+)")


class Board:
    def __init__(self, raw):
        self.revision = sha256(raw).hexdigest()
        self.newline = "\r\n" if b"\r\n" in raw else "\n"
        self.encoding = "utf-8-sig" if raw.startswith(b"\xef\xbb\xbf") else "utf-8"
        self.lines = raw.decode(self.encoding).replace("\r\n", "\n").split("\n")
        end = self.lines.index("<details>")
        self.groups = {}
        self.cards = {}
        stack = []
        group = None
        index = 0
        while index < end:
            line = self.lines[index]
            heading = HEADER.fullmatch(line)
            item = CHECK.fullmatch(line)
            if heading:
                depth = len(heading[1])
                stack = [entry for entry in stack if entry[0] < depth]
                stack.append((depth, heading[2]))
                if group:
                    group["end"] = index
                group = {"id": index, "path": [name for _, name in stack], "end": end}
                self.groups[index] = group
            if item and group:
                stop = index + 1
                while stop < end:
                    note = stop
                    while note < end and not self.lines[note]:
                        note += 1
                    if note == end or not self.lines[note].startswith(("  ", "\t")):
                        break
                    stop = note + 1
                self.cards[index] = {"id": index, "group": group["id"], "end": stop,
                                     "done": item[1].lower() == "x",
                                     "text": "\n".join([item[2], *self.lines[index + 1:stop]])}
                index = stop
            else:
                index += 1
        occupied = {card["group"] for card in self.cards.values()}
        groups = list(self.groups.values())
        for current, following in zip(groups, groups[1:]):
            if len(following["path"]) > len(current["path"]) and current["id"] not in occupied:
                del self.groups[current["id"]]

    def view(self):
        return {"revision": self.revision, "groups": list(self.groups.values()), "cards": list(self.cards.values())}

    def change(self, data):
        card = self.cards[data["id"]]
        start, stop = card["id"], card["end"]
        action = data["action"]
        block = self.lines[start:stop]
        if action == "check" and type(data["done"]) is bool:
            self.lines[start] = "- [" + ("x" if data["done"] else " ") + "] " + self.lines[start][6:]
        elif action == "edit":
            lines = data["text"].strip().splitlines()
            if not lines or not lines[0].strip():
                raise ValueError("Empty task")
            body = [s if not s.strip() or s.startswith(("  ", "\t")) else "  " + s for s in lines[1:]]
            block = [self.lines[start][:6] + lines[0], *body]
            if data.get("group", card["group"]) == card["group"]:
                self.lines[start:stop] = block
            else:
                action = "move"
        elif action != "move":
            raise ValueError("Unknown action")
        if action == "move":
            group = self.groups[data["group"]]
            before = data.get("before")
            if before is None:
                at = group["end"]
            else:
                if self.cards[before]["group"] != group["id"]:
                    raise ValueError("Wrong category")
                at = before
            if at < start or at >= stop:
                if not self.lines[stop]:
                    stop += 1
                del self.lines[start:stop]
                if at >= stop:
                    at -= stop - start
                pad = [""] if at and self.lines[at - 1] else []
                self.lines[at:at] = [*pad, *block, ""]
        return self.newline.join(self.lines).encode(self.encoding)


def save(data, path=TODO):
    raw = path.read_bytes()
    board = Board(raw)
    if data["revision"] != board.revision:
        raise FileExistsError
    updated = board.change(data)
    next_board = Board(updated)
    if len(board.cards) != len(next_board.cards):
        raise ValueError("Invalid task structure")
    with NamedTemporaryFile(dir=path.parent, delete=False) as tmp:
        tmp_path = Path(tmp.name)
        try:
            tmp.write(updated)
        except BaseException:
            tmp.close()
            tmp_path.unlink()
            raise
    try:
        if path.read_bytes() != raw:
            raise FileExistsError
        os.replace(tmp_path, path)
    finally:
        tmp_path.unlink(missing_ok=True)
    return next_board.view()


class Handler(BaseHTTPRequestHandler):
    def reply(self, code, body=b"", mime="text/plain"):
        self.send_response(code)
        self.send_header("Content-Type", mime + "; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.send_header("X-Frame-Options", "DENY")
        self.end_headers()
        self.wfile.write(body)

    def send_board(self, view):
        self.reply(200, json.dumps(view, ensure_ascii=False).encode(), "application/json")

    def do_GET(self):
        if self.headers.get("Host") != URL[7:]:
            return self.reply(403)
        if self.path == "/api/board":
            return self.send_board(Board(TODO.read_bytes()).view())
        if self.path not in ASSETS:
            return self.reply(404)
        name, mime = ASSETS[self.path]
        self.reply(200, (ROOT / name).read_bytes(), mime)

    def do_POST(self):
        if self.path != "/api/board":
            return self.reply(404)
        if self.headers.get("Host") != URL[7:] or self.headers.get("Origin") != URL:
            return self.reply(403)
        if self.headers.get_content_type() != "application/json":
            return self.reply(415)
        try:
            length = int(self.headers["Content-Length"])
            if not 0 < length <= 1024 * 1024:
                return self.reply(413)
            data = json.loads(self.rfile.read(length))
            with WRITE_LOCK:
                result = save(data)
            self.send_board(result)
        except FileExistsError:
            self.reply(409)
        except (ValueError, KeyError, TypeError, AttributeError):
            self.reply(400)
        except OSError:
            self.reply(500)


if __name__ == "__main__":
    with ThreadingHTTPServer(ADDRESS, Handler) as server:
        print(URL, flush=True)
        server.serve_forever()
