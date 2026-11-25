(function(){
if (!document.documentElement.classList.contains('in-game')) return;
document.documentElement.classList.add('game-home');
const screen = document.querySelector('.screen');
const container = document.createElement('div');
container.className = 'in-screen';
container.innerHTML = '<div id="screen-slot"></div>';
screen.append(container);
const endpoints = [
  {id:'mc1',carrier:'电信节点',server:'主服'}, {id:'mc5',carrier:'联通节点',server:'主服'},
  {id:'mc2',carrier:'电信节点',server:'测试服'}, {id:'mc6',carrier:'联通节点',server:'测试服'}
];
const panel = container.querySelector('#screen-slot');
const mapImage = new URL('game-entry-map.jpg', document.currentScript.src).href;
let choices = {}, readings = {}, portrait;

function cardArtwork(server, position) {
  const test = server === '测试服';
  const rows = endpoints.filter(e => e.server === server).map((e, i) => `
    <g class="route" data-node="${e.id}" role="button" aria-label="${e.id} ${e.carrier}" tabindex="0" transform="translate(0 ${155 + i * 38})">
      <rect width="350" height="38" fill="transparent"/>
      <path d="M0 0h350" stroke="currentColor" opacity=".45"/>
      <circle cx="9" cy="19" r="4.2" stroke="currentColor" fill="none"/>
      <text x="30" y="26" font-size="20" font-weight="650">${e.id}</text>
      <text x="86" y="25" font-size="14">${e.carrier}</text>
      <text class="reading" x="350" y="26" font-size="20" text-anchor="end"></text>
    </g>`).join('');
  return `<g class="server-half" data-server="${server}" transform="translate(${position}) scale(${portrait ? .88 : 1})">
    <g transform="translate(12 0) skewX(-9)" font-size="84" font-weight="900" letter-spacing="-3">
      <text x="4" y="96" fill="#fff6dc" aria-hidden="true">${server}</text>
      <text y="91" stroke="currentColor" stroke-width="1.1" paint-order="stroke fill">${server}</text>
    </g>
    <svg y="113" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
      <circle cx="9" cy="8" r="3"/><path d="M2 20v-2a7 7 0 0 1 14 0v2M15 5a3 3 0 0 1 0 6m3 3a6 6 0 0 1 4 6"/>
    </svg>
    <svg x="30" y="108" width="320" height="30"><text class="players" y="22" font-size="14"></text></svg>
    ${rows}
    <g class="automatic" role="button" tabindex="0" transform="translate(0 248)" fill="${test ? '#fff6dc' : '#102f27'}">
      <path d="M24 0H350L326 70H0z" fill="${test ? '#102f27' : '#fff6dc'}"/>
      <path d="M31 8h298" stroke="currentColor" opacity=".4" color="${test ? '#fff6dc' : '#102f27'}"/>
      <text x="30" y="46" font-size="30" font-weight="750"></text>
      <path d="M290 35h24m-7-7 7 7-7 7" fill="none" stroke="${test ? '#fff6dc' : '#102f27'}" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  </g>`;
}

function layout() {
  // Fit whichever approved canvas occupies more of the actual monitor.
  if (!panel.clientWidth || !panel.clientHeight) return;
  const ratio = panel.clientWidth / panel.clientHeight;
  // At 1920 × 1080 the cabinet's inner screen measures 1145 × 814.
  const wideWidth = 1013;
  const nearSquare = ratio < Math.sqrt((740 / 860) * (wideWidth / 720));
  const [w, h] = nearSquare ? [740, 860] : [wideWidth, 720];
  panel.classList.toggle('side-gutters', ratio > w / h);
  if (portrait === nearSquare) return;
  portrait = nearSquare;
  panel.innerHTML = `<svg class="entry-art" viewBox="0 0 ${w} ${h}" fill="currentColor" role="group" aria-label="进入游戏">
    <defs><linearGradient id="entry-tint" x1="0" y1="0" x2="1" y2="1">
      <stop stop-color="#123f2c" stop-opacity=".95"/><stop offset=".5" stop-color="#163d32" stop-opacity=".56"/><stop offset="1" stop-color="#0b2b21" stop-opacity=".98"/>
    </linearGradient></defs>
    <rect width="${w}" height="${h}" rx="12" fill="#3a4537"/><rect x="8" y="8" width="${w-16}" height="${h-16}" rx="6" fill="#18251d"/>
    <image x="15" y="15" width="${w-30}" height="${h-30}" preserveAspectRatio="xMidYMid slice" href="${mapImage}"/>
    <rect x="15" y="15" width="${w-30}" height="${h-30}" fill="url(#entry-tint)"/>
    <svg x="15" y="15" width="${w-30}" height="${h-30}" viewBox="0 0 746 718" preserveAspectRatio="none">
      <path fill="#ffac23" d="M0 0H244C222 23 224 48 251 54C302 65 366 25 410 0H542C475 57 440 89 411 149C386 189 394 219 367 257C349 295 326 328 280 351C236 372 194 379 151 378C85 377 38 400 0 444Z"/>
      <path fill="#05281e" d="M0 600C73 554 172 578 270 650L220 718H0Z"/>
      <path fill="#ddf385" d="M746 290C704 326 660 332 595 335C460 335 416 365 378 448C347 512 355 555 317 602C286 642 226 681 170 718H216C273 691 318 695 361 718H746Z"/>
    </svg>
    <g class="native-single" transform="translate(${w-133} 36)" role="button" tabindex="0">
      <rect width="96" height="30" rx="15" fill="#163a31b0" stroke="#c6d4bb" stroke-opacity=".55"/>
      <text x="48" y="20" text-anchor="middle" font-size="14" fill="#fff6dc">单人游戏</text>
    </g>
    ${cardArtwork('主服', portrait ? '40 80' : '54 86')}
    ${cardArtwork('测试服', portrait ? '405 460' : `${w - 350 - 54} 353`)}
  </svg>`;
  render();
}

function showReading(field, value, pending) {
  if (value == null && pending) {
    if (!field.firstElementChild) field.innerHTML = '连接中.<tspan class="connecting-dot second">.</tspan><tspan class="connecting-dot third">.</tspan>';
  } else {
    field.textContent = value ?? '—';
  }
}

function render() {
  for (const card of panel.querySelectorAll('.server-half')) {
    const server = card.dataset.server;
    const samples = endpoints.filter(e => e.server === server).map(e => readings?.[e.id]);
    const sample = samples.find(s => Number.isFinite(s?.players));
    const names = (sample?.names || []).slice(0, Math.min(3, sample?.players || 0));
    const players = names.length ? names.join(', ') + (sample.players > names.length ? ' +' + (sample.players - names.length) : '') : sample?.players;
    showReading(card.querySelector('.players'), players, readings != null && samples.some(s => !s?.sampledAt));
    card.querySelector('.automatic text').textContent = choices[server] ? '进入 ' + choices[server] : '自动选择节点';
    for (const row of card.querySelectorAll('.route')) {
      const id = row.dataset.node, ms = readings?.[id]?.ms;
      row.setAttribute('aria-pressed', String(choices[server] === id));
      showReading(row.querySelector('.reading'), Number.isFinite(ms) ? ms + ' ms' : null, readings != null && !readings[id]?.sampledAt);
    }
  }
}
layout();
new ResizeObserver(layout).observe(panel);
panel.addEventListener('keydown', event => {
  if ((event.key === 'Enter' || event.key === ' ') && event.target.matches('[role=button]')) {
    event.preventDefault();
    if (!event.repeat) event.target.dispatchEvent(new MouseEvent('click', {bubbles:true}));
  }
});
panel.addEventListener('click', event => {
  const button = event.target.closest('[role=button]');
  if (!button) return;
  if (button.matches('.native-single')) { execute('single'); return; }
  const server = button.closest('[data-server]').dataset.server;
  if (button.matches('.route')) {
    const node = button.dataset.node;
    choices[server] = choices[server] === node ? null : node;
    render(); changed();
  } else {
    const routes = endpoints.filter(e => e.server === server);
    const best = routes.filter(e => Number.isFinite(readings[e.id]?.ms)).sort((a,b) => readings[a.id].ms - readings[b.id].ms)[0];
    execute(choices[server] || (best || routes[0]).id);
  }
});
const inGameFrame = parent !== window && !document.documentElement.classList.contains('embedded');
const local = document.documentElement.classList.contains('local-home');
const more = document.querySelector('.more-menu');
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
const post = message => {
  if (parent !== window) parent.postMessage(message, '*');
};
function selectTab(game) {
  if (game && !gameTab) document.querySelector('#map').dispatchEvent(new Event('leave-map'));
  gameTab = game;
  container.hidden = !game;
  document.querySelector('#map').hidden = game;
  screen.classList.toggle('game-active',game);
  power.setAttribute('aria-pressed',String(game));
  if(game)document.querySelectorAll('.map-switcher .console-key').forEach(b=>b.setAttribute('aria-pressed','false'));
}
power.onclick = () => selectTab(true);
document.querySelectorAll('.map-switcher .console-key').forEach(b=>b.addEventListener('click',()=>selectTab(false)));
selectTab(true);
function execute(name) {
  post({type:'niijima:action',name});
}
multi.onclick = () => execute('multi');
document.addEventListener('enter-node',e=>execute(e.detail));
function changed() {
  if(inGameFrame && !applying)post({type:'niijima:selection',choices,more:more.open});
}
more.addEventListener('toggle',()=>{if(more.open!==syncedMore){syncedMore=more.open;changed()}});
function syncOpeningSound() {
  if (!videoFrame) return;
  videoFrame.dataset.silent = String(!active);
  const media = videoFrame.contentDocument?.querySelector('video');
  if (media) media.muted = !active;
}
function skip() {
  const media = videoFrame?.contentDocument?.querySelector('video');
  if (media) {
    media.muted = true;
    media.pause();
  }
  skipped = true;
  document.documentElement.classList.remove('opening-pending');
  cover?.remove();
  cover = null;
  videoFrame = null;
  try { sessionStorage.setItem('niijima-opening-skipped','1'); } catch {}
}
let nativeOpeningActions = false;
function enterHome() {
  skip();
  if (inGameFrame) post({type:'niijima:skip'});
}
function opening() {
  if(skipped || cover) return;
  cover=document.createElement('div');
  cover.id='game-opening';
  const start = document.createElement('button');
  start.type = 'button';
  start.setAttribute('aria-label','单击任意位置开始');
  start.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:0;padding:0;background:transparent;cursor:pointer';
  start.onclick = enterHome;
  cover.append(start);
  if(!local){
    videoFrame=document.createElement('iframe');
    videoFrame.dataset.silent=String(!active);
    videoFrame.src='/v3/opening.html';
    videoFrame.dataset.openingControls = inGameFrame ? (nativeOpeningActions ? 'native' : 'legacy') : 'web';
    videoFrame.tabIndex=-1;
    cover.append(videoFrame);
  }
  const label=document.createElement('img');
  label.src='assets/press-anywhere-label.png';
  label.alt='';
  cover.append(label);
  document.body.append(cover);
  document.documentElement.classList.remove('opening-pending');
}
window.addEventListener('message',e=>{
  if(e.source===document.querySelector('#map').contentWindow && e.origin===location.origin && e.data?.type==='niijima:click'){
    window.niijimaClick?.();
    return;
  }
  if (videoFrame && e.source === videoFrame.contentWindow && e.origin === location.origin && e.data?.type === 'niijima:opening-control') {
    const action = e.data.action;
    if (action === 'ready') {
      videoFrame.style.pointerEvents = 'auto';
      videoFrame.tabIndex = 0;
    } else if (active && action === 'skip') {
      enterHome();
    } else if (active && nativeOpeningActions && (action === 'settings' || action === 'quit')) {
      execute(action);
    }
    return;
  }
  if(videoFrame && e.source===videoFrame.contentWindow && e.origin===location.origin && e.data==='niijima:opening-ready'){
    if(inGameFrame)post({type:'niijima:playing'});
    return;
  }
  if(!inGameFrame || e.source!==parent || !['null','file://'].includes(e.origin))return;
  const m=e.data;
  if(m?.type!=='niijima:state')return;
  applying=true;
  choices=m.choices;
  syncedMore=Boolean(m.more);
  more.open=syncedMore;
  nativeOpeningActions = m.openingActions === true;
  active=m.active;
  if(m.skipped)skip();else {opening();syncOpeningSound()}
  if('readings' in m)readings=m.readings;
  if(m.gameMenu)cadence=Math.max(50,Math.min(m.gameMenu.probeIntervalMs,m.gameMenu.inactiveTimeoutMs/2));
  render();
  applying=false;
  if(m.skipped)post({type:'niijima:home-ready'});
  if(!ready){
    ready=true;
    // Chromium can suspend animation frames until the host reveals this iframe.
    document.fonts.ready.then(()=>post({type:'niijima:ready'}));
  }
});
async function read() {
  if(!active || !skipped || !gameTab || document.hidden || busy)return;
  if(inGameFrame){post({type:'niijima:read'});return}
  if(typeof window.niijimaServerStatus!=='function')return;
  busy=true;
  try{
    const result=await window.readNiijimaStatus();
    if(!result)return;
    readings=result.nodes;
    cadence=Math.max(50,Math.min(result.gameMenu.probeIntervalMs,result.gameMenu.inactiveTimeoutMs/2));
    render();
  }catch(error){readings=null;render();console.debug('Game server status',error)}
  finally{busy=false}
}
async function poll(){await read();setTimeout(poll,cadence)}
poll();
if(inGameFrame)post({type:'niijima:hello'});
else {
  try{skipped=sessionStorage.getItem('niijima-opening-skipped')==='1'}catch{}
  if(!skipped)opening();
  read();
}

})();
