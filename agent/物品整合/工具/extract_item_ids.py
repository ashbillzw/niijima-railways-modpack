from pathlib import Path
import gzip, struct, json, hashlib, collections
import argparse
parser=argparse.ArgumentParser(description='Read-only extraction of a Forge level.dat item registry; standard library only.')
parser.add_argument('--source',type=Path,required=True)
parser.add_argument('--instance',type=Path,required=True)
parser.add_argument('--repo',type=Path,required=True)
parser.add_argument('--out',type=Path,required=True)
args=parser.parse_args()
BASE=args.out
BASE.mkdir(parents=True,exist_ok=True)
INSTANCE=args.instance
REPO=args.repo
source=args.source
raw=source.read_bytes()
b=gzip.decompress(raw); pos=0
def read(n):
 global pos
 v=b[pos:pos+n]; pos+=n
 return v
def num(fmt): return struct.unpack('>'+fmt,read(struct.calcsize('>'+fmt)))[0]
def string(): return read(num('H')).decode('utf-8')
def payload(t):
 if t in range(1,7): return num({1:'b',2:'h',3:'i',4:'q',5:'f',6:'d'}[t])
 if t==7: return read(num('i'))
 if t==8: return string()
 if t==9:
  child=num('B'); n=num('i'); return [payload(child) for _ in range(n)]
 if t==10:
  out={}
  while True:
   child=num('B')
   if child==0: return out
   name=string(); out[name]=payload(child)
 if t in (11,12):
  n=num('i'); return [num('i' if t==11 else 'q') for _ in range(n)]
 raise ValueError(t)
t=num('B'); name=string(); root=payload(t)
assert pos==len(b)
fml=root['fml']; regs=fml['Registries']
print('registries',list(regs)[:12])
items=regs['minecraft:item']; print('item structure',str(items)[:600])
ids=sorted(x['K'] for x in items['ids'])
(BASE/'items.txt').write_text('\n'.join(ids)+'\n',encoding='utf-8')
mods=fml['LoadingModList']
(BASE/'world-mods.json').write_text(json.dumps(mods,ensure_ascii=False,indent=2),encoding='utf-8')
index=json.loads((REPO/'pack/modrinth.index.json').read_text('utf-8'))
coverage=[]
for e in index['files']:
 if not e['path'].startswith('mods/'): continue
 p=INSTANCE/e['path']
 status='missing'
 if p.is_file(): status='sha1_match' if hashlib.sha1(p.read_bytes()).hexdigest()==e['hashes']['sha1'] else 'sha1_mismatch'
 coverage.append({'path':e['path'],'status':status})
summary={'source':str(source),'sha256':hashlib.sha256(raw).hexdigest(),'world_last_played':root['Data'].get('LastPlayed'),'world_version':root['Data'].get('Version'),'item_count':len(ids),'namespace_counts':dict(collections.Counter(x.split(':')[0] for x in ids)),'loading_mod_count':len(mods),'index_coverage':coverage}
(BASE/'summary.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({k:v for k,v in summary.items() if k!='index_coverage'},ensure_ascii=False))
print('index coverage',dict(collections.Counter(x['status'] for x in coverage)))
print('exceptions',[x for x in coverage if x['status']!='sha1_match'])
groups=collections.defaultdict(list)
for i in ids: groups[i.split(':',1)[1]].append(i)
same={k:v for k,v in groups.items() if len({x.split(':')[0] for x in v})>1}
(BASE/'same-path.json').write_text(json.dumps(same,ensure_ascii=False,indent=2),encoding='utf-8')
print('same path groups',len(same))
print('override hashes', [(p.name, (INSTANCE/'mods'/p.name).exists() and hashlib.sha1(p.read_bytes()).hexdigest()==hashlib.sha1((INSTANCE/'mods'/p.name).read_bytes()).hexdigest()) for p in (REPO/'pack/overrides/mods').glob('*.jar')])

aliases={'seeds':'seed','dumplings':'dumpling','strawberries':'strawberry','noodles':'noodle','golden':'gold','grey':'gray'}
groups=collections.defaultdict(list)
for i in ids:
 p=i.split(':')[1]
 key=tuple(sorted(aliases.get(t,t) for t in p.split('_')))
 groups[key].append(i)
near={ '_'.join(k):v for k,v in groups.items() if len({i.split(':')[0] for i in v})>1 and len({i.split(':')[1] for i in v})>1}
(BASE/'near-path.json').write_text(json.dumps(near,ensure_ascii=False,indent=2),encoding='utf-8')
print('near path groups',len(near))
