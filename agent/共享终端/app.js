const token = location.hash.slice(1) || sessionStorage.getItem('terminal-token');
if(token) sessionStorage.setItem('terminal-token', token);
history.replaceState(null, '', '/');
const term = new Terminal({cols:110,rows:32,fontSize:14,cursorBlink:true,scrollback:8000,theme:{background:'#11151c'}});
const terminalContainer=document.getElementById('terminal');
term.open(terminalContainer);
terminalContainer.addEventListener('click',()=>{if(!window.getSelection()?.toString())term.focus();});
let cursor=0, stopped=false, stopping=false, leaving=false, pending=Promise.resolve(), requestId=null, inputBusy=0;
const box=document.createElement('section');
box.id='confirmation';box.hidden=true;
box.style.cssText='margin:12px 20px;padding:16px;background:#3d311c;border:1px solid #e1b668;border-radius:8px';
box.innerHTML='<b>待确认</b><pre id="command" style="white-space:pre-wrap;overflow-wrap:anywhere"></pre><p id="hint"></p><button id="confirm" title="先发送 Ctrl+C，再发送此命令">覆盖</button> <button id="reject">丢弃</button>';
document.querySelector('header').after(box);
async function api(path, body){const r=await fetch(path,{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},body:JSON.stringify(body)});if(!r.ok) throw Error('HTTP '+r.status);return r.json();}
term.onData(text=>{if(stopped||stopping||leaving)return;inputBusy++;document.getElementById('confirm').disabled=true;pending=pending.then(()=>api('/input',{text})).catch(e=>{document.getElementById('status').textContent=e.message;}).finally(()=>{inputBusy--;});});
document.getElementById('confirm').onclick=async()=>{const id=requestId;try{await pending;await api('/confirm',{id,overwrite:document.getElementById('confirm').dataset.overwrite==='true'});term.focus();}catch(e){document.getElementById('status').textContent=e.message;}};
document.getElementById('reject').onclick=async()=>{try{await api('/reject',{id:requestId});term.focus();}catch(e){document.getElementById('status').textContent=e.message;}};
function renderGate(s){
  box.hidden=!s.pending;requestId=s.pending?.id || null;
  document.getElementById('command').textContent=s.pending?.text || '';
  const confirm=document.getElementById('confirm');
  confirm.disabled=!!inputBusy;
  confirm.dataset.overwrite=String(!!s.user_input_active);
  confirm.textContent=s.user_input_active?'覆盖':'发送';
  confirm.title=s.user_input_active?'先取消当前输入，再发送命令':'发送此命令';
  document.getElementById('hint').textContent=s.user_input_active?'将取消当前输入或命令':'确认执行此命令';
}
document.getElementById('allow-all').onchange=async e=>{try{await api('/allow-all',{enabled:e.target.checked});term.focus();}catch(err){document.getElementById('status').textContent=err.message;}};
const stopButton=document.getElementById('stop');
stopButton.textContent='停止终端';
stopButton.title='关闭后台终端及其中的 SSH 连接';
function setDisabled(value){
  for(const id of ['stop','allow-all','confirm','reject']) document.getElementById(id).disabled=value;
  term.options.disableStdin=value;
}
stopButton.onclick=async()=>{
  if(stopped||stopping)return;
  stopping=true;setDisabled(true);
  document.getElementById('status').textContent='正在停止…';
  const controller=new AbortController();
  const timeout=setTimeout(()=>controller.abort(),10000);
  try{
    const r=await fetch('/stop',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},body:'{}',signal:controller.signal});
    if(!r.ok)throw Error('HTTP '+r.status);
    await r.json();stopped=true;box.hidden=true;
    document.getElementById('allow-all').checked=false;
    stopButton.textContent='已停止';
    document.getElementById('status').textContent='终端已停止';
  }catch(e){
    setDisabled(false);
    document.getElementById('status').textContent='停止未确认';
    window.alert('未确认终端已停止：'+(e.name==='AbortError'?'请求超时':e.message));
  }finally{clearTimeout(timeout);stopping=false;}
};
window.addEventListener('pagehide',()=>{
  leaving=true;
  fetch('/ui-disconnect',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},body:'{}',keepalive:true}).catch(()=>{});
});
window.addEventListener('pageshow',event=>{if(event.persisted){leaving=false;poll();}});
async function poll(){
  if(stopped||leaving)return;
  if(stopping){setTimeout(poll,250);return;}
  try{
    const s=await api('/state',{after:cursor});
    if(stopped||stopping||leaving)return;
    cursor=s.cursor;if(s.output)term.write(s.output);renderGate(s);
    document.getElementById('allow-all').checked=s.allow_all;
    document.getElementById('status').textContent=s.alive?(s.user_input_active?'输入中':s.allow_all?'共享中':'逐条确认'):'已退出';
  }catch(e){if(!stopped&&!stopping&&!leaving){document.getElementById('allow-all').checked=false;document.getElementById('status').textContent='已断开';}}
  finally{if(!stopped&&!leaving)setTimeout(poll,250);}
}
poll();
