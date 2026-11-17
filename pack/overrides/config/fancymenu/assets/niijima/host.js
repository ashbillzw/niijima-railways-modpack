(() => {
  const local = document.querySelector('#local'), live = document.querySelector('#live');
  const online = 'https://mc1.ashbill.com:25572';
  const state = {type:'niijima:state',skipped:false,choices:{},more:false,readings:{}};
  try {state.skipped=sessionStorage.getItem('niijima-opening-skipped')==='1'} catch {}
  const frames = new Set();
  const addresses = {mc1:'mc1.ashbill.com:25591',mc5:'mc5.ashbill.com:25591',mc2:'mc2.ashbill.com:25590',mc6:'mc6.ashbill.com:25590'};
  let foreground=local, ready=false, homeReady=false, playing=false;
  function broadcast() {
    for (const f of frames) f.contentWindow.postMessage({...state,active:f===foreground},f===live?online:'*');
  }
  function reveal() {
    if (foreground===live || !ready || !(state.skipped?homeReady:playing))return;
    foreground=live;
    live.inert=false; live.removeAttribute('aria-hidden');
    local.inert=true; local.setAttribute('aria-hidden','true');
    broadcast();
  }
  async function read() {
    try {
      const result=await window.readNiijimaStatus();
      if(!result)return;
      state.readings=result.nodes;state.gameMenu=result.gameMenu;
    } catch(error){state.readings={};console.debug('Game server status',error)}
    broadcast();
  }
  window.addEventListener('message',event=>{
    const f=[local,live].find(f=>f.contentWindow===event.source);
    if(!f || (f===live?event.origin!==online:!['null','file://'].includes(event.origin)))return;
    const m=event.data;
    if(!m || typeof m!=='object')return;
    if(m.type==='niijima:hello'){frames.add(f);broadcast();return}
    if(f===live){
      if(m.type==='niijima:ready'){ready=true;reveal();return}
      if(m.type==='niijima:home-ready'){homeReady=true;reveal();return}
      if(m.type==='niijima:playing'){playing=true;reveal();return}
    }
    if(f!==foreground)return;
    if(m.type==='niijima:skip'){
      state.skipped=true;
      try{sessionStorage.setItem('niijima-opening-skipped','1')}catch{}
      broadcast();reveal();
    }
    if(m.type==='niijima:selection'){
      for(const server of ['主服','测试服']) {
        const value=m.choices?.[server];
        state.choices[server]=(server==='主服'?['mc1','mc5']:['mc2','mc6']).includes(value)?value:null;
      }
      state.more=Boolean(m.more);broadcast();
    }
    if(m.type==='niijima:read' && !document.hidden)read();
    if(m.type==='niijima:action'){
      const api=window.fancymenu?.actions || window.fancymenu;
      if(m.name==='single'||m.name==='multi')api?.execute('opengui',m.name==='single'?'select_world_screen':'join_multiplayer_screen');
      else if(Object.hasOwn(addresses,m.name))api?.execute('joinserver',addresses[m.name]);
    }
  });
  local.src='local.html?in_game=1&hosted=1';
  live.src=online+'/v3/?in_game=1&hosted=1';
})();
