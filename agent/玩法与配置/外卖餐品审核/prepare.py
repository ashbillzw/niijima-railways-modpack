"""Build the offline review catalogue from the two food workbooks and installed pack."""
import argparse
import base64
import hashlib
import json
import re
import tomllib
import zipfile
from collections import defaultdict
from pathlib import Path
from xml.etree import ElementTree as ET


def sheets(path):
    ns = "{http://schemas.openxmlformats.org/spreadsheetml/2006/main}"
    with zipfile.ZipFile(path) as z:
        xml = lambda n: ET.fromstring(z.read(n))
        strings = ["".join(t.itertext()) for t in xml("xl/sharedStrings.xml")] if "xl/sharedStrings.xml" in z.namelist() else []
        rel = {x.get("Id"): x.get("Target") for x in xml("xl/_rels/workbook.xml.rels")}
        for sheet in xml("xl/workbook.xml").find(ns + "sheets"):
            target = rel[next(v for k, v in sheet.attrib.items() if k.endswith("}id"))]
            table = xml(target.lstrip("/") if target.startswith("/") else "xl/" + target)
            rows = []
            for row in table.find(ns + "sheetData"):
                cells = {}
                for c in row.findall(ns + "c"):
                    val = c.findtext(ns + "v", "")
                    if c.get("t") == "s":
                        val = strings[int(val)]
                    elif c.get("t") == "inlineStr":
                        val = "".join(c.find(ns + "is").itertext())
                    cells[re.sub(r"\d", "", c.get("r"))] = val
                rows.append(cells)
            yield sheet.get("name"), rows


def catalogue(repo):
    docs = repo / "agent/玩法与配置"
    review = {(mod, r["B"]): r for mod, rows in sheets(docs / "美团食品审核表.xlsx") for r in rows if r.get("B") and r.get("C")}
    pool = json.loads((repo/"pack/overrides/config/trainresync/meituan.json").read_bytes())["foods"]
    foods = {}
    for mod, rows in sheets(docs/"美团配送成品食品价表.xlsx"):
        for r in rows:
            id = r.get("C", "")
            if id == "farmersdelight:melon_juice":  # Both recipes now supply the Tavern bottle.
                continue
            if id.startswith("yuushya:") or not re.fullmatch(r"[\w.]+:[\w./-]+", id):
                continue
            v = review[mod, r["B"]]
            cfg = pool.get(id, {})
            review_mark=v.get("A","")
            foods[id] = dict(name=r["B"], mod=mod, category=r["D"], note="" if review_mark=="待讨论" else review_mark,
                             reviewNote="", needsDiscussion=review_mark=="待讨论",sideDish=cfg.get("副餐品",False),preferred=cfg.get("好",False),
                             method=v["C"], enabled=id in pool, price=float(v["D"]) if v.get("D") else None,
                             qty=cfg.get("数量乘数",int(float(v.get("E") or 1))), bonuses=cfg.get("加成",{}), tags=[], recipes=[])
    for id, entry in json.loads(Path(__file__).with_name("prank-items.json").read_bytes()).items():
        cfg = pool.get(id, {})
        foods[id] = dict(name=entry["name"], mod=entry.get("mod", "机械动力" if id.startswith("create:") else "原版"),
                         category="搞怪（整蛊）", note="", reviewNote="", needsDiscussion=False,
                         preferred=cfg.get("好",False), sideDish=cfg.get("副餐品",False), method=entry.get("method", ""), enabled=id in pool,
                         price=entry["price"], qty=cfg.get("数量乘数",1), bonuses=cfg.get("加成",{}), tags=[], recipes=[])
    for group in json.loads(Path(__file__).with_name("addon-foods.json").read_bytes()):
        for path, name in group["items"].items():
            id = group["namespace"] + ":" + path
            cfg = pool.get(id, {})
            foods[id] = dict(name=name, mod=group["mod"], category=group["category"], note="", reviewNote="",
                             needsDiscussion=False, sideDish=cfg.get("副餐品", False), preferred=cfg.get("好", False),
                             method="", enabled=id in pool, price=None, qty=cfg.get("数量乘数", 1),
                             bonuses=cfg.get("加成", {}), tags=[], recipes=[])
    # The priced cocoa row in the original workbook now uses Confectionery's bottle.
    old_cocoa = foods.pop("farmersdelight:hot_cocoa")
    cocoa = foods["create_confectionery:hot_chocolate_bottle"]
    cocoa["price"] = old_cocoa["price"]
    cocoa["needsDiscussion"] = old_cocoa["needsDiscussion"]
    if pool.keys() - foods.keys():
        raise ValueError(f"订单池中有未收录餐品 {pool.keys()-foods.keys()}")
    return foods


def group_foods(catalog, groups):
    """Index every physical recipe first, then expose one review row per delivery group."""
    foods = catalog["foods"]
    for representative, variants in groups.items():
        row = foods[representative]
        row["variants"] = list(variants)
        for item in variants:
            variant = foods.pop(item)
            for field in ("recipes", "usages", "tags"):
                row[field].extend(value for value in variant[field] if value not in row[field])


def exchange_input(recipe):
    """Single commodity and amount consumed; empty serving vessels carry no food."""
    if "pattern" in recipe:
        slots=[recipe["key"][mark] for row in recipe["pattern"] for mark in row if mark!=" "]
    else:
        slots=recipe.get("ingredients",[recipe.get("ingredient")])
    counts=defaultdict(int)
    for slot in slots:
        if not isinstance(slot,dict) or "item" not in slot:return None
        if slot["item"] not in {"minecraft:glass_bottle","minecraft:bowl","minecraft:bucket"}:
            counts[slot["item"]]+=slot.get("count",1)
    return next(iter(counts.items())) if len(counts)==1 else None


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--repo", type=Path, required=True)
    parser.add_argument("--minecraft", type=Path, required=True, help="Minecraft 1.20.1 client JAR")
    parser.add_argument("--forge", type=Path, help="Forge universal JAR (defaults to the matching launcher library)")
    parser.add_argument("--mods", type=Path, help="Optional installed mods folder if the build cache is incomplete")
    parser.add_argument("--jei", type=Path, help="Optional in-game export from dump-jei.js")
    parser.add_argument("--request", type=Path, help="Generate candidate IDs for the optional client dump")
    parser.add_argument("--out", type=Path, default=Path(__file__).parent/"public/catalog.json")
    args = parser.parse_args()
    repo = args.repo
    foods = catalogue(repo)
    if args.request:
        args.request.write_text(json.dumps({"ids":list(foods)}),encoding="utf-8")
    overrides = repo/"pack/overrides"
    index=json.loads((repo/"pack/modrinth.index.json").read_bytes())
    version=index["dependencies"]["minecraft"]+"-"+index["dependencies"]["forge"]
    forge=args.forge or args.minecraft.parents[2]/"libraries/net/minecraftforge/forge"/version/f"forge-{version}-universal.jar"
    archives = [args.minecraft,forge]
    for f in index["files"]:
        if not (f["path"].startswith("mods/") and f["path"].endswith(".jar")):
            continue
        p = repo/"build/cache"/f["hashes"]["sha512"]
        if not p.exists() and args.mods:
            p = args.mods/Path(f["path"]).name
            if p.exists() and hashlib.sha1(p.read_bytes()).hexdigest() != f["hashes"]["sha1"]:
                raise ValueError(f"版本不符 {p}")
        if not p.is_file():
            raise FileNotFoundError(f["path"])
        archives.append(p)
    archives.extend(sorted((overrides/"mods").glob("*.jar")))
    zips = [zipfile.ZipFile(p) for p in archives]
    mods = {"minecraft","forge"}
    for z in zips:
        if "META-INF/mods.toml" in z.namelist():
            mods.update(x["modId"] for x in tomllib.loads(z.read("META-INF/mods.toml").decode("utf-8-sig"))["mods"])
    assets, recipes, tags, names, replacements = {}, {}, defaultdict(list), {}, {}
    fluid_tags=defaultdict(list)
    def resource(n, read):
        if n.startswith("assets/") and ("/textures/" in n or "/models/" in n):
            assets[n] = read
            return
        if re.fullmatch(r"assets/[^/]+/lang/zh_cn.json", n):
            try: names.update(json.loads(read(n)))
            except ValueError: pass
            return
        match = re.fullmatch(r"data/([^/]+)/(recipes|tags/items|tags/fluids|replacements)/(.+)\.json", n)
        if not match: return
        namespace, folder, path = match.groups()
        try: data = json.loads(read(n))
        except ValueError: return
        key = namespace + ":" + path
        if folder == "recipes":
            recipes[key] = data
        elif folder.startswith("tags/"):
            entries=(fluid_tags if folder=="tags/fluids" else tags)[key]
            if data.get("replace"): entries.clear()
            entries.extend(data.get("values", []))
            for v in data.get("remove", []):
                if v in entries: entries.remove(v)
        elif namespace == "oei":
            for rule in data:
                if isinstance(rule,dict) and isinstance(rule.get("resultItems"),str):
                    replacements.update((v,rule["resultItems"]) for v in rule.get("matchItems",[]))
    for z in zips:
        for n in z.namelist():
            if n.startswith(("data/","assets/")): resource(n,z.read)
            else:
                m = re.match(r"(datapacks/([^/]+)/|niijima_cauldron/)(data/.+)",n)
                if m and (m[2] is None or m[2] in mods):
                    resource(m[3],lambda path,z=z,base=m[1]:z.read(base+path))
    kjs = overrides/"kubejs"
    for p in sorted(kjs.rglob("*.json")):
        resource(p.relative_to(kjs).as_posix(),lambda n:(kjs/n).read_bytes())
    for p in (kjs/"assets").glob("*/lang/zh_cn.json"):
        namespace=p.parent.parent.name
        for key,name in json.loads(p.read_bytes()).items():
            prefix=f"item.{namespace}."
            if key.startswith(prefix):
                item=namespace+":"+key[len(prefix):]
                if item in foods:
                    foods[item]["name"]=name
    for p in (kjs/"server_scripts").glob("*.js"):
        src = p.read_text(encoding="utf-8-sig")
        for block in re.findall(r"event\.remove\((.*?)\);",src,re.S):
            for rid in re.findall(r"\bid:\s*['\"]([^'\"]+)",block): recipes.pop(rid,None)
        if "ServerEvents.tags('item'" in src:
            for tag,item in re.findall(r"event\.add\('([^']+)',\s*'([^']+)'\)",src):tags[tag].append(item)
    cache = {}
    def expand(tag, path=()):
        if tag in cache: return cache[tag]
        if tag in path: return set()
        out=set()
        for v in tags.get(tag,[]):
            v=v if isinstance(v,str) else v["id"]
            if v.startswith("#"):out.update(expand(v[1:],(*path,tag)))
            else:out.add(v if ":" in v else "minecraft:"+v)
        cache[tag]=out
        return out
    # Match the concrete tag memberships used by the game's fruit compatibility script.
    for left, right in json.loads((kjs/"config/fruit_tag_aliases.json").read_bytes()):
        left_items, right_items = expand(left), expand(right)
        tags[left].extend(sorted(right_items - left_items))
        tags[right].extend(sorted(left_items - right_items))
    cache.clear()
    for tag in sorted(tags):
        for item in expand(tag) & foods.keys(): foods[item]["tags"].append(tag)
    peculiars_config=tomllib.loads((overrides/"config/peculiars-common.toml").read_text(encoding="utf-8"))["atmospheric"]
    def present(c):
        if c.get("type")=="peculiars:config":
            if c["value"]=="disable_sorbet":return peculiars_config["DisableSorbet"]
            if c["value"]=="enable_atmospheric_food":return peculiars_config["EnableAtmosphericFood"]
        typ=c.get("type","").split(":")[-1]
        if typ=="mod_loaded":return c["modid"] in mods
        if typ=="not":return not present(c["value"])
        if typ in ("and","or"):return (all if typ=="and" else any)(map(present,c["values"]))
        if typ=="tag_empty":return not expand(c["tag"])
        if typ=="item_exists":return c["item"].split(":")[0] in mods and (model_path(c["item"]) in assets or c["item"] in foods)
        return typ!="false"
    def model_path(id):
        ns,_,path=id.partition(":")
        return f"assets/{ns}/models/item/{path}.json"
    used=set(foods)
    relevant={}
    yields=defaultdict(list)
    exchanges=defaultdict(list)
    food_routes=defaultdict(list)
    by_output=defaultdict(dict)
    available={}
    for rid,d in recipes.items():
        if not isinstance(d,dict) or not all(map(present,d.get("conditions",[]))): continue
        if d.get("type")=="forge:conditional":
            d=next((r["recipe"] for r in d.get("recipes",[]) if all(map(present,r["conditions"]))),{})
        # Mirror the pack's two Central Kitchen vessel substitutions when these recipes exist.
        if rid == "create_central_kitchen:filling/melon_juice":
            d["ingredients"][0]["item"] = "kaleidoscope_tavern:empty_bottle"
            d["results"][0]["item"] = "kaleidoscope_tavern:watermelon_juice"
        elif rid == "create_central_kitchen:emptying/melon_juice":
            d["ingredients"][0]["item"] = "kaleidoscope_tavern:watermelon_juice"
            d["results"][0]["item"] = "kaleidoscope_tavern:empty_bottle"
        elif rid == "create_central_kitchen:mixing/hot_cocoa":
            d["results"][0]["fluid"] = "create_confectionery:hot_chocolate"
        elif rid == "create_central_kitchen:filling/hot_cocoa":
            d["results"][0]["item"] = "create_confectionery:hot_chocolate_bottle"
        outputs=d.get("result",d.get("results",d.get("output",[])))
        if not outputs:continue
        output_list=outputs if isinstance(outputs,list) else [outputs]
        if d.get("type","").startswith("minecraft:crafting") and any(
            isinstance(x,dict) and x.get("item","").startswith(("neapolitan:","peculiars:"))
            and x["item"].endswith("_milkshake") for x in output_list
        ):continue
        available[rid]=d
        if d.get("type") == "kaleidoscope_cookery:teapot":
            d["result"]["count"] = 12
        for v in outputs if isinstance(outputs,list) else [outputs]:
            id=v if isinstance(v,str) else v.get("item") if isinstance(v,dict) else None
            id=replacements.get(id,id)
            if not id:continue
            if not id.startswith("minecraft:"):
                by_output[id][rid]=d
            source=exchange_input(d)
            amount=d.get("count",1) if isinstance(v,str) else v.get("count",1)
            if source and (isinstance(v,str) or v.get("chance",1)==1):
                exchanges[(source[0],id)].append((source[1],amount,rid))
            if id not in foods:continue
            if rid=="neapolitan:chocolate/chocolate_bar":d["result"]["count"]=1
            if rid=="farmersdelight:integration/create/filling/chocolate_pie":
                for ingredient in d["ingredients"]:
                    if ingredient.get("fluidTag")=="forge:chocolate":ingredient["amount"]=250
            if rid not in foods[id]["recipes"]:foods[id]["recipes"].append(rid)
            relevant[rid]=d
            if isinstance(v,str) or v.get("chance",1)==1:
                food_routes[id].append((rid,d.get("count",1) if isinstance(v,str) else v.get("count",1)))
            used.update(re.findall(r'"(?:item|fluid)":\s*"([\w./:-]+)"',json.dumps(d)))
    reversible=set()
    for (ingredient,product),routes in exchanges.items():
        for taken,given,rid in routes:
            # Portioning a finished dish is a production method for its slices.
            if (relevant.get(rid,{}).get("type") in {"farmersdelight:cutting","kaleidoscope_cookery:chopping_board"}
                    or (product.endswith("_slice") and given>taken)):
                continue
            if any(taken*back_in==given*back_out for back_in,back_out,_ in exchanges.get((product,ingredient),())):
                reversible.add(rid)
    for id,routes in food_routes.items():
        yields[id].extend(count for rid,count in routes if rid not in reversible)
    # TrainResync registers these JEI entries from enabled soft-fluid flavors in Java.
    soft_names={n.rsplit("/",1)[-1][:-5] for z in zips for n in z.namelist()
                if n.startswith("niijima_cauldron/data/shader_switch_debug/moonlight/soft_fluids/") and n.endswith("_milkshake.json")}
    # One placed feast supplies a full batch of identical portions.
    for whole, serving in [
        *((f"farmersdelight:{name}_block", f"farmersdelight:{name}") for name in
          ("roast_chicken","stuffed_pumpkin","honey_glazed_ham","shepherds_pie","gleaming_salad")),
        ("fruitsdelight:pineapple_fried_rice","fruitsdelight:bowl_of_pineapple_fried_rice"),
    ]:
        key = "trainresync:portion/" + serving.replace(":","/")
        relevant[key] = dict(type="trainresync:portion",station="分餐",ingredients=[{"item":whole},{"item":"minecraft:bowl","count":4}],
                             result={"item":serving,"count":4})
        foods[serving]["recipes"].append(key)
        yields[serving].append(4)
        used.update([whole,"minecraft:bowl"])
    for id in foods:
        ns,flavor=id.split(":")
        if ns not in {"neapolitan","peculiars"} or flavor not in soft_names:continue
        ice=id.removesuffix("_milkshake")+"_ice_cream"
        key="trainresync:cauldron/"+flavor
        relevant[key]=dict(type="fruitsdelight:cauldron",station="炼药锅",ingredients=[{"item":"minecraft:milk_bucket"},{"item":ice},{"item":"minecraft:glass_bottle","count":4}],results=[{"item":id,"count":4},{"item":"minecraft:bowl"}])
        foods[id]["recipes"].append(key)
        yields[id].append(4)
        used.update([ice,"minecraft:glass_bottle","minecraft:milk_bucket","minecraft:bowl"])
    for id, food in foods.items():
        if not id.startswith("fruitsdelight:") or not id.endswith(("_jelly","_jello")):continue
        pot=id+"_cauldron"
        if model_path(pot) not in assets:continue
        jar=id.endswith("_jelly")
        source=id.rsplit("_",1)[0]+("_cauldron" if jar else "_jelly_cauldron")
        addition="minecraft:sugar" if jar else "minecraft:slime_ball"
        vessel="minecraft:glass_bottle" if jar else "minecraft:bowl"
        key="fruitsdelight:world/"+id.split(":")[1]
        relevant[key]=dict(type="fruitsdelight:cauldron",station="加热炼药锅",
                           ingredients=[{"item":source,"name":"满"+names.get("block."+source.replace(":","."),source)},
                                        {"item":addition},{"item":vessel,"count":3}],
                           result={"item":id,"count":3})
        food["recipes"].append(key)
        yields[id].append(3)
        used.update([source,addition,vessel])
    tag_icons={}
    def texture(id):
        ns,path=id.split(":",1)
        model=model_path(id)
        textures={}
        seen=set()
        while model in assets and model not in seen:
            seen.add(model)
            try:d=json.loads(assets[model](model))
            except ValueError:break
            textures={**d.get("textures",{}),**textures}
            parent=d.get("parent","")
            if not parent:break
            a,b=parent.split(":",1) if ":" in parent else ("minecraft",parent)
            model=f"assets/{a}/models/{b}.json"
        for key in ("layer0","particle","top","side","all",*textures):
            tex=textures.get(key,"")
            if tex.startswith("#"):tex=textures.get(tex[1:],"")
            if tex:
                a,b=tex.split(":",1) if ":" in tex else ("minecraft",tex)
                n=f"assets/{a}/textures/{b}.png"
                if n in assets:return n
        for folder in ("item","block"):
            n=f"assets/{ns}/textures/{folder}/{path}.png"
            if n in assets:return n
    def collect_tag_icons(recipe,items):
        for tag in re.findall(r'"tag":\s*"([\w./:-]+)"',json.dumps(recipe)):
            if tag in tag_icons:continue
            leaf=tag.split(":")[-1].split("/")[-1]
            def priority(item):
                namespace,path=item.split(":",1)
                return (namespace!="minecraft",path not in (leaf,leaf.removesuffix("s")),len(path),item)
            for item in sorted(expand(tag),key=priority):
                if texture(item):
                    tag_icons[tag]=item
                    items.add(item)
                    break
    for recipe in relevant.values():
        collect_tag_icons(recipe,used)
    icons={}; labels={}
    for id in sorted(used):
        n=texture(id)
        if n:icons[id]="data:image/png;base64,"+base64.b64encode(assets[n](n)).decode()
        suffix=id.replace(":",".",1)
        labels[id]=foods[id]["name"] if id in foods else names.get("item."+suffix,names.get("block."+suffix,id))
    if args.jei:
        production_types={r["type"] for r in relevant.values()} | {"minecraft:crafting"}
        live=json.loads(args.jei.read_bytes())
        if live["schema"]!=1 or set(live["foods"])!=set(foods):
            raise ValueError("JEI 快照与候选清单不一致")
        for id, entry in live["foods"].items():
            # Keep crafting patterns for the same recipe; use real JEI slots for dynamic recipes.
            live_ids=[]
            for i, route in enumerate(entry["routes"]):
                rid=route.get("id")
                # Additional JEI crafting routes also count. Loot and trade pages do not.
                if route["type"] in production_types and rid not in reversible and rid not in recipes:
                    for slot in route["slots"]:
                        if slot["role"]=="OUTPUT":
                            yields[id].extend(v.get("count",1) for v in slot["values"] if v.get("item")==id)
                if rid in foods[id]["recipes"] and (relevant[rid].get("pattern") or relevant[rid]["type"].endswith("crafting_shapeless")):
                    key=rid
                else:
                    key=f"jei/{id}/{i}"
                    relevant[key]=route
                live_ids.append(key)
            foods[id]["recipes"]=list(dict.fromkeys(live_ids))
            foods[id]["tags"]=sorted(entry["tags"])
    result=dict(foods=foods,recipes=relevant,icons=icons,labels=labels,tagIcons=tag_icons)
    for id,food in foods.items():
        if food["category"] != "搞怪（整蛊）":
            food["qty"]=min(yields[id], default=1)
    # Only index shared mod ingredients one step below a food. A result is not an input.
    def input_items(value):
        if isinstance(value,list):
            for child in value:yield from input_items(child)
        elif isinstance(value,dict):
            if isinstance(value.get("item"),str):yield value["item"]
            if isinstance(value.get("tag"),str):yield from expand(value["tag"])
            if "children" in value:yield from input_items(value["children"])
        elif isinstance(value,str) and ":" in value:
            yield value
    def recipe_inputs(recipe):
        inputs=[recipe.get(k) for k in ("ingredients","ingredient","container","carrier","tool","base","addition","template")]
        inputs.extend(recipe.get("key",{}).values())
        inputs.extend(s["values"] for s in recipe.get("slots",[]) if s["role"]=="INPUT")
        yield from input_items(inputs)
        for step in recipe.get("sequence",[]):yield from recipe_inputs(step)
    uses=defaultdict(set)
    for food in foods.values():
        for rid in food["recipes"]:
            recipe=relevant[rid]
            for item in recipe_inputs(recipe):
                if item in by_output:uses[item].add(rid)
    subroutes={item:sorted(by_output[item],key=lambda rid:not by_output[item][rid]["type"].startswith("minecraft:crafting"))
               for item,parents in uses.items() if len(parents)>=2}
    result["ingredientRoutes"]=subroutes
    subitems=set(subroutes)
    for food in foods.values():food["usages"]=[]
    for rid,recipe in (available|relevant).items():
        matching=set(recipe_inputs(recipe)) & foods.keys()
        if not matching:continue
        for item in matching:foods[item]["usages"].append(rid)
        relevant[rid]=recipe
        subitems.update(re.findall(r'"item":\s*"([\w./:-]+)"',json.dumps(recipe)))
        output=recipe.get("result")
        if isinstance(output,str) and ":" in output:subitems.add(output)
        altar_item=recipe.get("output",{})
        if isinstance(altar_item,dict) and altar_item.get("type")=="minecraft:item":
            subitems.add(altar_item["nbt"]["Item"]["id"])
        collect_tag_icons(recipe,subitems)
    for item in subroutes:
        for rid,recipe in by_output[item].items():
            relevant.setdefault(rid,recipe)
            subitems.update(re.findall(r'"item":\s*"([\w./:-]+)"',json.dumps(recipe)))
            collect_tag_icons(recipe,subitems)
    for item in sorted(subitems-labels.keys()):
        suffix=item.replace(":",".",1)
        labels[item]=names.get("item."+suffix,names.get("block."+suffix,item))
        n=texture(item)
        if n:icons[item]="data:image/png;base64,"+base64.b64encode(assets[n](n)).decode()
    result["ingredientTags"]={tag:sorted(expand(tag)&subroutes.keys()) for tag in tag_icons if expand(tag)&subroutes.keys()}
    fluid_icons={}
    def fluid_texture(fluid):
        ns,path=fluid.split(":",1)
        for domain in ([ns,"forge"] if ns=="minecraft" else [ns]):
            for folder in ("fluid","block"):
                name=f"assets/{domain}/textures/{folder}/{path}_still.png"
                if name in assets:return name
    def fluid_members(tag,seen=()):
        if tag in seen:return
        for member in fluid_tags.get(tag,[]):
            member=member if isinstance(member,str) else member["id"]
            if member.startswith("#"):yield from fluid_members(member[1:],(*seen,tag))
            else:yield member
    fluid_uses={"fluid":set(),"fluidTag":set()}
    for recipe in relevant.values():
        for key,value in re.findall(r'"(fluid|fluidTag)":\s*"([\w./:-]+)"',json.dumps(recipe)):
            fluid_uses[key].add(value)
    for key,values in fluid_uses.items():
        for value in sorted(values):
            candidates=[value] if key=="fluid" else sorted(fluid_members(value),key=lambda s:("flowing_" in s,s))
            for fluid in candidates:
                tex=fluid_texture(fluid)
                if tex:
                    token="fluid/"+fluid
                    icons[token]="data:image/png;base64,"+base64.b64encode(assets[tex](tex)).decode()
                    fluid_icons[("#" if key=="fluidTag" else "")+value]=token
                    break
    result["fluidIcons"]=fluid_icons
    config = json.loads((overrides/"config/trainresync/meituan.json").read_bytes())
    group_foods(result, config.get("foodGroups", {}))
    def review_key(rows):
        fields={id:[f[k] for k in ("enabled","qty","price","bonuses")] for id,f in rows.items()}
        return hashlib.sha256(json.dumps(fields,sort_keys=True).encode()).hexdigest()
    result["draftKey"]=review_key(foods)
    if args.out.exists():
        raw=args.out.read_bytes()
        old=json.loads(raw)
        # The browser stores field-level edits. Keep them across price-only recalibrations.
        if all(
            all(old["foods"][id][k]==foods[id][k] for k in ("enabled","bonuses")) for id in old["foods"].keys() & foods.keys()
        ):
            if "draftKey" in old:
                keys=[old["draftKey"],*old.get("legacyDraftKeys",[])]
                result["legacyDraftKeys"]=list(dict.fromkeys(k for k in keys if k!=result["draftKey"]))
            else:
                keys=['"'+hashlib.sha256(raw).hexdigest()+'"',old.get("previousDraftETag")]
                result["legacyDraftKeys"]=[k for k in keys if k]
    args.out.parent.mkdir(parents=True,exist_ok=True)
    args.out.write_text(json.dumps(result,ensure_ascii=False,separators=(",",":")),encoding="utf-8")
    print("foods, active, recipes, food icons, with static recipes",len(foods),sum(x["enabled"] for x in foods.values()),len(relevant),len(foods.keys() & icons.keys()),sum(bool(x["recipes"]) for x in foods.values()))
    for z in zips:z.close()


if __name__=="__main__": main()
