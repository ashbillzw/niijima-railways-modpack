import json,pathlib,time,urllib.request,urllib.error
s=json.loads(pathlib.Path('session-test.json').read_text())
def call(who,path,body):
    r=urllib.request.Request(s['url']+path,data=json.dumps(body).encode(),headers={'Authorization':'Bearer '+s[who+'_token'],'Content-Type':'application/json'})
    try:
        with urllib.request.urlopen(r,timeout=5) as response:return response.status,json.load(response)
    except urllib.error.HTTPError as exc:return exc.code,json.load(exc)
assert call('agent','/state',{})[1]['allow_all'] is False
assert call('agent','/input',{'text':'echo AUTO_DRAIN_TEST\r'})[0]==202
assert call('ui','/allow-all',{'enabled':True})[0]==200
assert call('agent','/state',{})[1]['pending'] is None
assert call('ui','/allow-all',{'enabled':False})[0]==200
assert call('ui','/input',{'text':'draft'})[0]==200
code,queued=call('agent','/input',{'text':'echo KEEP_COLLISION_TEST\r'})
assert code==202
assert call('ui','/allow-all',{'enabled':True})[0]==200
assert call('agent','/state',{})[1]['pending']['id']==queued['id']
assert call('ui','/reject',{'id':queued['id']})[0]==200
assert call('ui','/input',{'text':'\x03'})[0]==200
assert call('ui','/allow-all',{'enabled':False})[0]==200
code,result=call('agent','/input',{'text':'echo CONFIRM_TEST\r'})
assert code==202
assert call('ui','/confirm',{'id':result['id']})[0]==200
assert call('ui','/confirm',{'id':result['id']})[0]==409
code,result=call('agent','/input',{'text':'echo REJECT_TEST\r'})
assert code==202
assert call('ui','/reject',{'id':result['id']})[0]==200
assert call('agent','/allow-all',{'enabled':True})[0]==404
assert call('ui','/allow-all',{'enabled':True})[0]==200
assert call('agent','/input',{'text':'echo ALLOWED_TEST\r'})[0]==200
assert call('ui','/input',{'text':'draft'})[0]==200
code,result=call('agent','/input',{'text':'echo OVERWRITE_TEST\r'})
assert code==202
assert call('ui','/confirm',{'id':result['id']})[0]==409
assert call('ui','/allow-all',{'enabled':False})[0]==200
assert call('agent','/state',{})[1]['pending']['id']==result['id']
assert call('ui','/confirm',{'id':result['id'],'overwrite':True})[0]==200
time.sleep(.3)
assert call('agent','/state',{})[1]['pending'] is None
assert call('agent','/ui-disconnect',{})[0]==404
assert call('agent','/stop',{})[0]==404
assert call('ui','/allow-all',{'enabled':True})[0]==200
assert call('ui','/ui-disconnect',{})[0]==200
assert call('agent','/state',{})[1]['alive'] is True
assert call('ui','/state',{})[1]['allow_all'] is False
code,result=call('agent','/input',{'text':'echo OFFLINE_WAITING_TEST\r'})
assert code==202
assert call('ui','/reject',{'id':result['id']})[0]==200
assert call('ui','/allow-all',{'enabled':True})[0]==200
# Agent polling must never renew UI approval. No page heartbeat for 16 seconds.
for _ in range(16):
    time.sleep(1)
    state=call('agent','/state',{})[1]
assert state['alive'] is True and state['allow_all'] is False
assert call('ui','/state',{})[1]['allow_all'] is False
code,result=call('agent','/input',{'text':'echo TIMEOUT_WAITING_TEST\r'})
assert code==202
assert call('ui','/reject',{'id':result['id']})[0]==200
assert call('ui','/stop',{})[0]==200
print('PASS: input gates, UI-only controls, explicit disconnect, heartbeat expiry, reconnect stays unapproved, PTY survives offline, stop response')
