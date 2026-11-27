"""Build the seat-review catalog from an installed Minecraft 1.20.1 instance."""
import argparse
from collections import Counter, defaultdict
from functools import lru_cache
from io import BytesIO
import json
from pathlib import Path
import re
from zipfile import ZipFile
from models import Renderer, resource
from beds import vanilla_bed, bedrock

def write(path, obj):
    path.write_text(json.dumps(obj,ensure_ascii=False,indent=2)+"\n",encoding="utf8")

class Assets:
    def __init__(self):
        self.files={}
        self.archives=[]
        self.tags=defaultdict(list)
        self.lang=defaultdict(dict)
        self.log=[]
        self.inventory=[]
        self.classes=[]
        self.riding=[]
        self.states=set()
    def add(self, source, names, read):
        for n in names:
            if n.endswith(".class") and ("block" in n.lower() or "registry" in n.lower()):
                code=read(n)
                markers=[s for s in ("/actors/seat/SeatBlock","/actors/seat/SeatEntity","m_20329_","m_7998_","ChairEntityUtils","SITTABLE") if s.encode() in code]
                if markers: self.riding.append({"archive":source,"class":n,"refs":markers})
            if n.endswith(".class") and re.search(r'(?:Seat|Chair|Bench|Stool|Sittable|Sofa|Cushion).*Block\.class$',n):
                self.classes.append(f"{source} / {n}")
            if not n.startswith(("data/","assets/")) or n.endswith("/"): continue
            self.files[n]=(read,n)
            m=re.fullmatch(r"assets/([^/]+)/blockstates/(.+)\.json",n)
            if m: self.states.add(":".join(m.groups()))
            m=re.fullmatch(r"data/([^/]+)/tags/blocks/(.+)\.json",n)
            if m:
                j=self.json(n)
                vals=self.tags[":".join(m.groups())]
                if j.get("replace"): vals.clear()
                vals.extend(v if isinstance(v,str) else v["id"] for v in j.get("values",[]))
                for v in j.get("remove",[]):
                    k=v if isinstance(v,str) else v["id"]
                    vals[:]=[x for x in vals if x!=k]
            m=re.fullmatch(r"assets/[^/]+/lang/(en_us|zh_cn)\.json",n)
            if m:
                values=self.json(n)
                if isinstance(values,dict):
                    self.lang[m[1]].update({k:v for k,v in values.items() if isinstance(v,str)})
    def archive(self, file, name=None):
        z=ZipFile(file)
        self.archives.append(z)
        name=name or file.name
        self.inventory.append(name)
        self.add(name,z.namelist(),z.read)
        if "META-INF/jarjar/metadata.json" in z.namelist():
            for dep in json.loads(z.read("META-INF/jarjar/metadata.json")).get("jars",[]):
                self.archive(BytesIO(z.read(dep["path"])),name+"!"+dep["path"].split("/")[-1])
    def read(self,n):
        read,key=self.files[n]
        return read(key)
    def json(self,n):
        raw=self.read(n).decode("utf-8-sig")
        try: return json.loads(raw,strict=False)
        except ValueError:
            # Some language files contain whole-line comments or trailing commas.
            raw=re.sub(r'(?m)^\s*//[^\n]*','',raw)
            try: return json.loads(re.sub(r',(\s*[}\]])',r'\1',raw),strict=False)
            except ValueError:
                self.log.append(n)
                return {}
    def translate(self,id):
        ns,path=id.split(":")
        for lang in ["zh_cn","en_us"]:
            for kind in ["block","item"]:
                v=self.lang[lang].get(f"{kind}.{ns}.{path}")
                if v: return v
        return path

seat_id=re.compile(r"(?:^|_)(?:chair|armchair|bench|stool|seat|sofa|couch|toilet|throne|ottoman|pew|cushion|pouf|zabuton|recliner|loveseat|bleacher|hammock|chaise|beanbag|tatami|bed)(?:_|$)")
seat_name=re.compile(r"椅|坐凳|板凳|长凳|矮凳|脚凳|坐垫|座垫|坐席|蒲团|沙发|马桶|宝座|吊床|榻榻米|\b(?:armchair|loveseat|chair|sofa|bench|stool|settee|toilet|ottoman|hammock|throne)\b",re.I)
seat_tag=re.compile(r"(?:^|[:/_])(?:seats?|chairs?|floor_chairs?|sittable|sofas?|(?:bar_|cook_)?stools?|benches|cushions?|fake_seats)$")
def variants(data):
    def score(pair):
        key,_=pair
        return sum(v in key for v in ("facing=north","pos=none","shape=straight","position=0","facing=up","waterlogged=false","open=false","has_carpet=false"))
    if "variants" in data:
        v=max(data["variants"].items(),key=score)[1]
        return [v[0] if isinstance(v,list) else v]
    parts=[p["apply"] for p in data.get("multipart",[]) if not p.get("when")]
    return [p[0] if isinstance(p,list) else p for p in parts]

def run(game, vanilla, out):
    assets=Assets()
    assets.archive(vanilla)
    jars=sorted((game/"mods").glob("*.jar"))
    for jar in jars: assets.archive(jar)
    kjs=game/"kubejs"
    assets.add("KubeJS",[p.relative_to(kjs).as_posix() for sub in ("assets","data") for p in (kjs/sub).rglob("*") if p.is_file()],lambda n:(kjs/n).read_bytes())
    # Vanilla Chinese text is distributed in the launcher's asset index.
    root=vanilla
    for parent in vanilla.parents:
        if (parent/"assets/indexes/5.json").is_file():
            root=parent/"assets"
            break
    if root.is_dir():
        objects=json.loads((root/"indexes/5.json").read_text())["objects"]
        h=objects["minecraft/lang/zh_cn.json"]["hash"]
        cn=json.loads((root/"objects"/h[:2]/h).read_bytes())
        assets.lang["zh_cn"]={**cn,**assets.lang["zh_cn"]}
    tag="trainresync:fake_seats"
    js=(kjs/"server_scripts/fake_seats_and_mec_tags.js").read_text(encoding="utf8")
    for name,values in re.findall(r"event\.add\('([^']+)',\s*\[([^]]*)\]",js):
        assets.tags[name].extend(re.findall(r"'([^']+)'",values))
    @lru_cache(None)
    def members(name,parents=()):
        if name in parents: return set()
        ids=set()
        for v in assets.tags.get(name,[]):
            if v.startswith("#"): ids.update(members(v[1:],parents+(name,)))
            else: ids.add(v if ":" in v else "minecraft:"+v)
        return ids
    reverse=defaultdict(set)
    for t in assets.tags:
        for id in members(t): reverse[id].add(t)
    sit={}
    for n in sorted(assets.files):
        if n.startswith("data/yuushya/register/") and n.endswith(".json"):
            for block in assets.json(n).get("block",[]):
                pos=block.get("usage",{}).get("sit_pos")
                if pos: sit[block["name"]]=(pos,block.get("class_type")=="template",n)
    images=out/"models"
    images.mkdir(parents=True,exist_ok=True)
    renderer=Renderer(assets)
    rows=[]
    for id in sorted(assets.states|members(tag)):
        ns,path=id.split(":")
        tags=sorted(reverse[id])
        st=[t for t in tags if seat_tag.search(t)]
        base=next((s for s in sorted(sit,key=len,reverse=True) if ns=="yuushya" and (path==s or (sit[s][1] and path.startswith(s+"_")))),None)
        name=assets.translate(id)
        if base and base!=path:
            mat=path[len(base)+1:]
            mat_name=assets.translate("yuushya:"+mat)
            if mat_name==mat: mat_name=assets.translate("minecraft:"+mat)
            if mat_name==mat and mat.startswith("decorative_"):
                mat_name="装饰"+assets.translate("minecraft:"+mat.removeprefix("decorative_"))
            template=assets.translate("yuushya:"+base).replace(" 模板","")
            name=mat_name+" · "+template
        english=assets.lang["en_us"].get("block."+id.replace(":","."),"")
        joy=ns=="touhou_little_maid" and path in {"computer","bookshelf","keyboard","gomoku","cchess","wchess","picnic_mat"}
        if not (st or base or joy or seat_id.search(path) or seat_name.search(name+" "+english) or "minecraft:beds" in tags): continue
        if re.search(r"workbench|seatwood|seat_belt|bedrock|flower_bed|flowerbed|public_toilet_sign|toilet_water_tank",path): continue
        native=(ns=="create" and id in members("create:seats")) or (ns=="interiors" and (path.endswith("_chair") or path=="kelp_seat"))
        evidence=[]
        if id in members(tag): evidence.append("已列入 #"+tag)
        if native: evidence.append("Create SeatBlock 或其子类，装配时已识别。")
        if joy:
            if path in {"computer","bookshelf","keyboard"}:
                evidence.append("继承 BlockJoy 的玩家就坐交互。模型包含整套家具，要复核列车上的坐点。")
            else:
                evidence.append("含女仆乘坐实体的专用交互；能否作为乘客座位需人工判断。")
        if base: evidence.append("方块小镇注册数据 "+sit[base][2].split("/")[-1]+" · "+base+" · sit_pos "+str(sit[base][0]))
        if any(t!=tag for t in st): evidence.append("方块标签 "+"、".join("#"+t for t in st if t!=tag))
        if "minecraft:beds" in tags: evidence.append("床的同类变体，当前只配置了白色床和红色床。")
        if not evidence: evidence.append("名称或模型类别命中；需人工判断是否适合作为座位。")
        status="native" if native else "on" if id in members(tag) else "pending"
        # Inventory geometry usually represents a single unconnected chair with complete parts.
        choices=[[{"model":ns+":item/"+path}]]
        state=resource(id,"blockstates",".json")
        if state in assets.files: choices.append(variants(assets.json(state)))
        pic=images/(id.replace(":","--").replace("/","_")+".png")
        success=False
        for choice in choices:
            try:
                if ns=="minecraft" and path.endswith("_bed"):
                    parts=[vanilla_bed(path[:-4])]
                    choice=[{"model":"BedRenderer · minecraft:entity/bed/"+path[:-4]}]
                elif joy or id=="touhou_little_maid:maid_bed":
                    geo="maid_bed/white" if path=="maid_bed" else path
                    parts=[bedrock(assets,geo)]
                    choice=[{"model":"touhou_little_maid:bedrock/block/"+geo}]
                else:
                    parts=[(*renderer.model(spec["model"]),dict(spec,y=spec.get("y",0)+(180 if ns=="yuushya" else 0))) for spec in choice]
                renderer.render(parts,pic)
                success=True
                break
            except (KeyError,ValueError,FileNotFoundError,ZeroDivisionError): continue
        rows.append(dict(id=id,name=name,mod=ns,tags=tags,status=status,reasons=evidence,
                         image="models/"+pic.name if success else None,
                         model=[s["model"] for s in choice] if success else []))
    out.mkdir(exist_ok=True)
    (out/"catalog.js").write_text("const catalog = "+json.dumps(rows,ensure_ascii=False)+";\n",encoding="utf8")
    write(out/"scan.json",{"mods":len(jars),"archives":assets.inventory,"blockstateCount":len(assets.states),
        "namespaces":dict(sorted(Counter(i.split(':')[0] for i in assets.states).items())),
        "tags":{t:sorted(members(t)) for t in sorted(assets.tags) if seat_tag.search(t) or t=="minecraft:beds"},
        "classes":assets.classes,"ridingReferences":assets.riding,"parseWarnings":sorted(set(assets.log)),
        "missingModels":[r["id"] for r in rows if not r["image"]]})
    print("candidates:",len(rows),Counter(r["mod"] for r in rows),"missing:",sum(not r["image"] for r in rows),flush=True)

if __name__=="__main__":
    p=argparse.ArgumentParser()
    p.add_argument("game",type=Path)
    p.add_argument("vanilla",type=Path)
    p.add_argument("out",type=Path)
    a=p.parse_args()
    run(a.game,a.vanilla,a.out)

