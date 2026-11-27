"""Loopback review server with validated, immutable export snapshots."""
import argparse
from datetime import datetime
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import json
from pathlib import Path
from urllib.parse import urlsplit
from uuid import uuid4

PUBLIC=Path(__file__).parent/"public"

def validate(data, initial):
    if not isinstance(data,dict) or data.get("schema")!=1 or data.get("pack")!="1.6.test0119":
        raise ValueError("version")
    rows=data["rows"]
    if not isinstance(rows,list) or len(rows)!=len(initial): raise ValueError("row count")
    seen=set()
    for r in rows:
        if not isinstance(r,dict) or set(r)!={"id","status","note"}: raise ValueError("fields")
        id=r["id"]
        if id not in initial or id in seen: raise ValueError("ID")
        allowed={"native"} if initial[id]=="native" else {"on","off","pending"}
        if r["status"] not in allowed or not isinstance(r["note"],str): raise ValueError("status or note")
        seen.add(id)

class Handler(SimpleHTTPRequestHandler):
    def reply(self,status,obj):
        raw=json.dumps(obj,ensure_ascii=False).encode()
        self.send_response(status)
        self.send_header("Content-Type","application/json; charset=utf-8")
        self.send_header("Content-Length",str(len(raw)))
        self.send_header("Cache-Control","no-store")
        self.end_headers()
        self.wfile.write(raw)

    def do_GET(self):
        if self.path=="/state":
            files=sorted(self.server.exports.glob("seats-*.json"))
            latest = files[-1] if files else PUBLIC.parent/"审核结果.json"
            return self.reply(200,json.loads(latest.read_bytes()) if latest.exists() else None)
        super().do_GET()

    def do_POST(self):
        if self.path!="/export": return self.send_error(404)
        host=self.headers.get("Host","")
        origin=self.headers.get("Origin")
        if host!=f"127.0.0.1:{self.server.server_port}" or (origin and urlsplit(origin).netloc!=host):
            return self.send_error(403)
        try:
            n=int(self.headers.get("Content-Length","0"))
            if not 0<n<=4_000_000: return self.send_error(413)
            data=json.loads(self.rfile.read(n))
            validate(data,self.server.initial)
        except (ValueError,KeyError,TypeError):
            return self.send_error(400)
        stamp=datetime.now().strftime("%Y%m%d-%H%M%S-%f")
        file=self.server.exports/f"seats-{stamp}-{uuid4().hex[:6]}.json"
        try:
            tmp=file.with_suffix(".tmp")
            tmp.write_text(json.dumps(data,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
            tmp.replace(file)
        except OSError:
            return self.send_error(500)
        self.reply(201,{"file":file.name})

if __name__=="__main__":
    p=argparse.ArgumentParser()
    p.add_argument("--port",type=int,default=18769)
    p.add_argument("--exports",type=Path,default=Path(__file__).parent/"exports")
    args=p.parse_args()
    args.exports.mkdir(exist_ok=True,parents=True)
    data=(PUBLIC/"catalog.js").read_text(encoding="utf8").removeprefix("const catalog = ").strip().removesuffix(";")
    server=ThreadingHTTPServer(("127.0.0.1",args.port),partial(Handler,directory=str(PUBLIC)))
    server.initial={b["id"]:b["status"] for b in json.loads(data)}
    server.exports=args.exports
    server.serve_forever()

