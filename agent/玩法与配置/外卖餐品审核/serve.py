"""Serve the food review UI on loopback and export reviewed changes to a fixed directory."""
import argparse
from datetime import datetime
from hashlib import sha256
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
import json
import math
from pathlib import Path
from uuid import uuid4

STATIC = {"index.html":"text/html; charset=utf-8","style.css":"text/css; charset=utf-8",
          "review-progress.json":"application/json; charset=utf-8",
          "app.js":"text/javascript; charset=utf-8","catalog.json":"application/json; charset=utf-8"}

def export_record(data, foods, revision):
    if data.get("revision") != revision:
        raise ValueError("餐品数据已更新，请刷新后重新核对。")
    changes = []
    for id, patch in data["edits"].items():
        food = {"tasteMultiplier":1, "preferred":False, **foods[id]}
        if not isinstance(patch,dict) or patch.keys()-{"enabled","price","tasteMultiplier","qty","bonuses","reviewNote","needsDiscussion","sideDish","preferred"}:
            raise ValueError("餐品字段无效")
        new = food | patch
        if type(new["preferred"]) is not bool:
            raise ValueError(food["name"]+"：好标记无效")
        if type(new["sideDish"]) is not bool:
            raise ValueError(food["name"]+"：副餐品标记无效")
        if (new["preferred"] or new["sideDish"]) and not new["enabled"]:
            raise ValueError(food["name"]+"：标为好或副餐品时须启用")
        if not isinstance(patch.get("reviewNote",""),str) or type(patch.get("needsDiscussion",False)) is not bool:
            raise ValueError(food["name"]+"：备注或待讨论标记无效")
        def number(v):
            return type(v) in (int,float) and math.isfinite(v) and 0<v<=1000000
        if not number(new["tasteMultiplier"]):
            raise ValueError("个人口味乘数")
        if type(new["enabled"]) is not bool or type(new["qty"]) is not int or not 1<=new["qty"]<=64:
            raise ValueError(food["name"]+"：数量乘数必须是 1–64 的整数")
        if not number(new["price"]) and (new["enabled"] or new["price"] not in (0,None)):
            raise ValueError(food["name"]+"：轮换中的餐品需要大于 0 且不超过 1000000 的单价")
        if not isinstance(new["bonuses"],dict) or any(not k.strip() or not number(v) for k,v in new["bonuses"].items()):
            raise ValueError(food["name"]+"：加成名称和倍率无效")
        diff={k:{"before":food[k],"after":v} for k,v in patch.items() if food[k]!=v}
        if diff:
            entry=dict(id=id,name=food["name"],mod=food["mod"],category=food["category"],tags=food["tags"],changes=diff)
            if "tasteMultiplier" in diff or ("price" in diff and new["tasteMultiplier"] != 1):
                entry["adjustedUnitPrice"]=None if new["price"] is None else new["price"] * new["tasteMultiplier"]
            changes.append(entry)
    return {"schema":1,"baseline":revision.strip('"'),"exportedAt":datetime.now().astimezone().isoformat(),"changes":changes}

def main():
    ap=argparse.ArgumentParser()
    ap.add_argument("--port",type=int,default=18429)
    ap.add_argument("--exports",type=Path,required=True)
    ap.add_argument("--catalog",type=Path,help="Generated catalog.json if stored outside the tool directory")
    args=ap.parse_args()
    root=Path(__file__).resolve().parent/"public"
    raw=(args.catalog or root/"catalog.json").read_bytes()
    revision='"'+sha256(raw).hexdigest()+'"'
    foods=json.loads(raw)["foods"]
    args.exports.mkdir(parents=True,exist_ok=True)
    class Handler(BaseHTTPRequestHandler):
        def send(self,status,body,mime):
            self.send_response(status)
            self.send_header("Content-Type",mime)
            self.send_header("Cache-Control","no-cache")
            self.send_header("X-Content-Type-Options","nosniff")
            if self.path=="/catalog.json":self.send_header("ETag",revision)
            self.send_header("Content-Length",str(len(body)));self.end_headers();self.wfile.write(body)

        def do_GET(self):
            filename=self.path.partition("?")[0].lstrip("/") or "index.html"
            if filename not in STATIC:return self.send_error(404)
            self.send(200,raw if filename=="catalog.json" else (root/filename).read_bytes(),STATIC[filename])

        def do_POST(self):
            port=self.server.server_port
            host=self.headers.get("Host")
            if self.path!="/export":return self.send_error(404)
            if host not in {f"127.0.0.1:{port}",f"localhost:{port}"} or self.headers.get("Origin")!="http://"+host:
                return self.send_error(403)
            try:
                size=int(self.headers.get("Content-Length","0"))
                if not 0<size<=2_000_000 or self.headers.get_content_type()!="application/json":
                    raise ValueError("导出数据格式或大小无效")
                record=export_record(json.loads(self.rfile.read(size)),foods,revision)
                filename=datetime.now().strftime("餐品修改-%Y%m%d-%H%M%S-")+uuid4().hex[:8]+".json"
                text=json.dumps(record,ensure_ascii=False,indent=2)
                path=args.exports/filename
                temp=path.with_suffix(".tmp")
                temp.write_text(text,encoding="utf-8");temp.replace(path)
                response={"file":filename};status=201
            except (ValueError,TypeError,AttributeError,KeyError,OSError) as exc:
                response={"error":str(exc)};status=400
            self.send(status,json.dumps(response,ensure_ascii=False).encode(),"application/json; charset=utf-8")
    with ThreadingHTTPServer(("127.0.0.1",args.port),Handler) as server:
        print(f"http://127.0.0.1:{server.server_port}/",flush=True)
        server.serve_forever()

if __name__=="__main__": main()
