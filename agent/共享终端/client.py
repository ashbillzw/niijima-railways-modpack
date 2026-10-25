import argparse,json,pathlib,urllib.request
p=argparse.ArgumentParser()
p.add_argument('action',choices=['read','send'])
p.add_argument('text',nargs='?',default='')
p.add_argument('--after',type=int,default=0)
p.add_argument('--session-file',default='session.json')
p.add_argument('--command-file')
a=p.parse_args()
s=json.loads((pathlib.Path(__file__).parent/a.session_file).read_text())
command=pathlib.Path(a.command_file).read_text(encoding='utf-8').strip() if a.command_file else a.text
body={'after':a.after} if a.action=='read' else {'text':command+'\r'}
r=urllib.request.Request(s['url']+('/state' if a.action=='read' else '/input'),data=json.dumps(body).encode(),headers={'Content-Type':'application/json','Authorization':'Bearer '+s['agent_token']})
print(urllib.request.urlopen(r,timeout=10).read().decode())
