(function(){
if (!document.documentElement.classList.contains('in-game')) return;
document.documentElement.classList.add('game-home');
const screen = document.querySelector('.screen');
const container = document.createElement('div');
container.className = 'in-screen';
container.innerHTML = '<div id="screen-slot"></div>';
screen.append(container);
const endpoints = [
  {id:'mc1',server:'主服',port:25591}, {id:'mc5',server:'主服',port:25591},
  {id:'mc2',server:'测试服',port:25590}, {id:'mc6',server:'测试服',port:25590}
];
const panel = container.querySelector('#screen-slot');
panel.innerHTML = `<svg class="entry-art" viewBox="0 0 746 718" preserveAspectRatio="none" aria-hidden="true">
<path fill="#ffac23" d="M0 0H244C222 23 224 48 251 54C302 65 366 25 410 0H542C475 57 440 89 411 149C386 189 394 219 367 257C349 295 326 328 280 351C236 372 194 379 151 378C85 377 38 400 0 444Z"/>
<path fill="#05281e" d="M0 600C73 554 172 578 270 650L220 718H0Z"/>
<path fill="#ddf385" d="M746 290C704 326 660 332 595 335C460 335 416 365 378 448C347 512 355 555 317 602C286 642 226 681 170 718H216C273 691 318 695 361 718H746Z"/></svg><div class="halves"></div>
<button class="native-single">单人游戏</button>`;
let choices = {}, readings = {};
for (const server of ['主服','测试服']) {
  const card = document.createElement('section');
  card.className = 'server-half';
  card.dataset.server = server;
  card.innerHTML = `<h2>${server}</h2><button class="automatic"><span></span><svg viewBox="0 0 30 20" aria-hidden="true"><path d="M1 10h26m-8-8 8 8-8 8"/></svg></button><div class="routes"></div><div class="players"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3"/><path d="M2 20v-2a7 7 0 0 1 14 0v2M15 5a3 3 0 0 1 0 6m3 3a6 6 0 0 1 4 6"/></svg><span>—</span></div>`;
  for (const endpoint of endpoints.filter(e=>e.server===server)) {
    const row = document.createElement('button');
    row.className = 'route';
    row.dataset.node = endpoint.id;
    row.innerHTML = `<i></i><b>${endpoint.id}</b><span class="reading">—</span>`;
    row.onclick = () => { choices[server] = choices[server] === endpoint.id ? null : endpoint.id; render(); changed(); };
    card.querySelector('.routes').append(row);
  }
  card.querySelector('.automatic').onclick = () => {
    const routes = endpoints.filter(e=>e.server===server);
    const best = routes.filter(e=>Number.isFinite(readings[e.id]?.ms)).sort((a,b)=>readings[a.id].ms-readings[b.id].ms)[0];
    execute(choices[server] || (best || routes[0]).id);
  };
  panel.querySelector('.halves').append(card);
}
function render() {
  for (const card of panel.querySelectorAll('.server-half')) {
    const server = card.dataset.server;
    const sample = endpoints.filter(e=>e.server===server).map(e=>readings[e.id]).find(s=>Number.isFinite(s?.players));
    const names = (sample?.names || []).slice(0,Math.min(3,sample?.players || 0));
    card.querySelector('.players span').textContent = !sample ? '—' : names.length ? names.join(', ') + (sample.players>names.length?' +'+(sample.players-names.length):'') : String(sample.players);
    card.querySelector('.automatic span').textContent = choices[server] ? '进入 '+choices[server] : '自动选择节点';
  }
  panel.querySelectorAll('.route').forEach(row=>{
    const endpoint = endpoints.find(e=>e.id===row.dataset.node), ms = readings[endpoint.id]?.ms;
    row.setAttribute('aria-pressed',String(choices[endpoint.server]===endpoint.id));
    row.querySelector('.reading').textContent = Number.isFinite(ms) ? ms+' ms' : '—';
  });
}
render();
const query = new URLSearchParams(location.search);
const hosted = query.get('hosted') === '1' && parent !== window;
const local = document.documentElement.classList.contains('local-home');
const more = document.querySelector('.more-menu');
const single = panel.querySelector('.native-single');
const multi = document.createElement('button');
multi.className = 'native-multi';
multi.textContent = '多人游戏';
more.querySelector('.more-links').prepend(multi);
const foot = document.createElement('div');
foot.className = 'monitor-foot';
const vent = document.querySelector('.monitor-vent');
vent.before(foot);
foot.append(vent);
const power = document.createElement('button');
power.className = 'game-power';
power.setAttribute('aria-label','进入游戏');
power.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M12 2.8v8.6M7.4 6.3a8 8 0 1 0 9.2 0"/></svg>';
foot.append(power);
let gameTab = true, skipped = false, cover, videoFrame, applying = false;
let active = true, ready = false, busy = false, cadence = 1000;
let syncedMore = false;
const post = message => parent.postMessage(message, '*');
const addresses = Object.fromEntries(endpoints.map(e=>[e.id,e.id+'.ashbill.com:'+e.port]));
function selectTab(game) {
  gameTab = game;
  container.hidden = !game;
  document.querySelector('#map').hidden = game;
  screen.classList.toggle('game-active',game);
  power.setAttribute('aria-pressed',String(game));
  if(game)document.querySelectorAll('[data-map]').forEach(b=>b.setAttribute('aria-pressed','false'));
}
power.onclick = () => selectTab(true);
document.querySelectorAll('[data-map]').forEach(b=>b.addEventListener('click',()=>selectTab(false)));
selectTab(true);
function execute(name) {
  if(hosted) { post({type:'niijima:action',name});return; }
  const api = window.fancymenu?.actions || window.fancymenu;
  if(!api?.execute) return;
  if(name === 'single' || name === 'multi') api.execute('opengui',name === 'single'?'select_world_screen':'join_multiplayer_screen');
  else if(addresses[name]) api.execute('joinserver',addresses[name]);
}
single.onclick = () => execute('single');
multi.onclick = () => execute('multi');
document.addEventListener('enter-node',e=>execute(e.detail));
function changed() {
  if(hosted && !applying)post({type:'niijima:selection',choices,more:more.open});
}
more.addEventListener('toggle',()=>{if(more.open!==syncedMore){syncedMore=more.open;changed()}});
function skip() {
  skipped = true;
  cover?.remove();
  cover = null;
  videoFrame = null;
  try { sessionStorage.setItem('niijima-opening-skipped','1'); } catch {}
}
function opening() {
  if(skipped || cover) return;
  cover=document.createElement('button');
  cover.id='game-opening';
  cover.setAttribute('aria-label','单击任意位置开始');
  if(!local){
    videoFrame=document.createElement('iframe');
    videoFrame.src='/v3/opening.html';
    videoFrame.tabIndex=-1;
    cover.append(videoFrame);
  }
  const label=document.createElement('img');
  label.src='/v3/assets/press-anywhere-label.png';
  label.alt='';
  cover.append(label);
  cover.onclick=()=>{skip();if(hosted)post({type:'niijima:skip'})};
  document.body.append(cover);
}
window.addEventListener('message',e=>{
  if(videoFrame && e.source===videoFrame.contentWindow && e.origin===location.origin && e.data==='niijima:opening-ready'){
    if(hosted)post({type:'niijima:playing'});
    return;
  }
  if(!hosted || e.source!==parent || !['null','file://'].includes(e.origin))return;
  const m=e.data;
  if(m?.type!=='niijima:state')return;
  applying=true;
  choices=m.choices;
  syncedMore=Boolean(m.more);
  more.open=syncedMore;
  active=m.active;
  if(m.skipped)skip();else opening();
  if(m.readings)readings=m.readings;
  if(m.gameMenu)cadence=Math.max(50,Math.min(m.gameMenu.probeIntervalMs,m.gameMenu.inactiveTimeoutMs/2));
  render();
  applying=false;
  if(m.skipped)post({type:'niijima:home-ready'});
  if(!ready){
    ready=true;
    document.fonts.ready.then(()=>requestAnimationFrame(()=>requestAnimationFrame(()=>post({type:'niijima:ready'}))));
  }
});
async function read() {
  if(!active || !skipped || !gameTab || document.hidden || busy)return;
  if(hosted){post({type:'niijima:read'});return}
  if(typeof window.niijimaServerStatus!=='function')return;
  busy=true;
  try{
    const result=await window.readNiijimaStatus();
    if(!result)return;
    readings=result.nodes;
    cadence=Math.max(50,Math.min(result.gameMenu.probeIntervalMs,result.gameMenu.inactiveTimeoutMs/2));
    render();
  }catch(error){readings={};render();console.debug('Game server status',error)}
  finally{busy=false}
}
async function poll(){await read();setTimeout(poll,cadence)}
poll();
if(hosted){post({type:'niijima:hello'})}
else {
  try{skipped=sessionStorage.getItem('niijima-opening-skipped')==='1'}catch{}
  if(!skipped)opening();
  read();
}

})();
