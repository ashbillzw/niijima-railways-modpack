const segmentPoints = [
  '7,2 41,2 45,6 41,10 7,10 3,6',
  '42,12 47,7 47,33 42,38 38,34 38,16',
  '42,42 47,38 47,65 42,70 38,65 38,46',
  '7,68 41,68 45,72 41,76 7,76 3,72',
  '6,42 10,46 10,65 6,70 1,65 1,38',
  '6,12 10,16 10,34 6,38 1,33 1,7',
  '7,35 41,35 45,39 41,43 7,43 3,39'
];
const digitSegments = ['abcdef', 'bc', 'abdeg', 'abcdg', 'bcfg', 'acdfg', 'acdefg', 'abc', 'abcdefg', 'abcdfg'];
const freshness = 15_000;
const stopThreshold = 15 * 60_000;
const servers = new Map((document.getElementById('map') ? ['create-cn', 'train-cn'] : ['create-cn']).map(id => [id, { data: null, missingSince: null }]));
const mapButtons = [...document.querySelectorAll('[data-map]')];
const frame = document.getElementById('map');
const message = document.querySelector('.map-outage');
const sign = document.querySelector('.room-signals');
const needle = document.querySelector('#needle path');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const needleTravelMs = 6000;
const needleSteps = [];
let needleTarget = null;
let needleFrame = 0;
const pilot = document.getElementById('mspt-pilot');
const mapErrors = new Map();
const frameErrors = new Map();
let navigatedAt = 0;
let selected = mapButtons.find(button => button.getAttribute('aria-pressed') === 'true');

function updateFrame(now) {
  const live = !!selected.dataset.server;
  const url = selected.dataset.map;
  const canLoad = !live || (mapErrors.get(selected) === null && interrupted(servers.get(selected.dataset.server), now) === null);
  const src = canLoad ? url : 'about:blank';
  if (frame.getAttribute('src') !== src || (canLoad && frameErrors.has(selected) && now - navigatedAt >= 15_000)) {
    navigatedAt = now;
    frame.classList.remove('ready');
    frame.src = src;
    return;
  }
  if (!canLoad) return;
  const doc = frame.contentDocument;
  const here = doc?.location.pathname === url;
  const blue = url.startsWith('/bluemap/');
  const failed = here && (doc.getElementById('bm-app-err') || /502 Bad Gateway/i.test(doc.title));
  const ready = here && !failed && (!live || (blue ? doc.querySelector('#map-container canvas') :
    doc.querySelector('script[src*="create-track-map.js"]')));
  frame.classList.toggle('ready', !!ready);
  if (ready) frameErrors.delete(selected);
  else if (live && (failed || now - navigatedAt >= 15_000) && !frameErrors.has(selected)) frameErrors.set(selected, now);
}

function interrupted(server, now) {
  if (!server) return null;
  const { data, missingSince } = server;
  if (!data) return missingSince;
  return !data.running || now - data.sampledAt > freshness ? data.sampledAt : null;
}

function digits(id, number) {
  const svg = document.getElementById(id);
  const text = number === null ? '' : String(number);
  if (svg.dataset.value === text) return;
  svg.dataset.value = text;
  const value = text.padStart(6);
  svg.setAttribute('viewBox', '0 0 ' + value.length * 56 + ' 80');
  svg.setAttribute('aria-label', text);
  svg.innerHTML = Array.from(value, (digit, i) =>
    '<g transform="translate(' + (i * 56 + 3) + ' 1)">' + segmentPoints.map((points, j) =>
      '<polygon class="' + (digit !== ' ' && digitSegments[Number(digit)].includes('abcdefg'[j]) ? 'lit' : 'unlit') + '" points="' + points + '"/>'
    ).join('') + '</g>'
  ).join('');
}

function drawNeedle() {
  const now = performance.now();
  let value = needleTarget;
  while (needleSteps.length && now - needleSteps[0].start >= needleTravelMs) needleSteps.shift();
  // Overlap step responses. Each starts and ends at zero velocity.
  for (const { start, change } of needleSteps) {
    const t = (now - start) / needleTravelMs;
    value -= change * (1 - t) ** 4 * (1 + 4 * t);
  }
  needle.setAttribute('transform', 'rotate(' + (value - 50) + ' 158 218)');
  pilot.classList.toggle('lit', value > 50);
  needleFrame = needleSteps.length ? requestAnimationFrame(drawNeedle) : 0;
}

function updateNeedle(mspt) {
  const target = mspt === null ? null : Math.min(100, mspt);
  needle.style.visibility = target === null ? 'hidden' : '';
  if (target === needleTarget && !(reducedMotion.matches && needleFrame)) return;
  if (target === null || reducedMotion.matches) {
    cancelAnimationFrame(needleFrame);
    needleSteps.length = 0;
    needleFrame = 0;
  } else if (needleTarget !== null) {
    needleSteps.push({ start: performance.now(), change: target - needleTarget });
  }
  needleTarget = target;
  if (target === null) pilot.classList.remove('lit');
  else if (!needleFrame) drawNeedle();
}

function renderStatus() {
  const now = Date.now();
  const main = servers.get('create-cn');
  const since = interrupted(main, now);
  sign.dataset.active = since !== null ? (now - since > stopThreshold ? 'down' : 'restart') : main.data ? 'up' : '';
  if (!frame) return;
  const mspt = main.data && since === null ? main.data.mspt : null;
  updateNeedle(mspt);

  const both = [...servers.values()];
  digits('online-players', both.every(s => s.data || s.missingSince !== null)
    ? both.reduce((sum, s) => sum + (interrupted(s, now) === null ? s.data.onlinePlayers : 0), 0) : null);
  digits('total-logins', both.every(s => s.data) ? both.reduce((sum, s) => sum + s.data.totalLogins, 0) : null);

  updateFrame(now);
  let selectedSince = null;
  for (const button of mapButtons) {
    const serverSince = interrupted(servers.get(button.dataset.server), now);
    const times = [serverSince, mapErrors.get(button), frameErrors.get(button)].filter(t => t != null);
    const start = times.length ? Math.min(...times) : null;
    button.classList.toggle('unavailable', start != null);
    if (button === selected) selectedSince = start;
  }
  message.hidden = selectedSince == null;
  if (!message.hidden) {
    const elapsed = Math.max(0, now - selectedSince);
    const long = elapsed > stopThreshold;
    message.children[0].textContent = long ? '服务器已停服' : '服务器重启中';
    message.children[1].textContent = '已停止 ' + (long ? Math.floor(elapsed / 60_000) + ' 分钟' : Math.floor(elapsed / 1000) + ' 秒');
  }
}

function selectMap(button) {
  selected = button;
  for (const item of mapButtons) item.setAttribute('aria-pressed', String(item === button));
  frame.title = button.textContent.trim();
  renderStatus();
}
for (const button of mapButtons) button.addEventListener('click', () => selectMap(button));
const mapBodyObserver = new MutationObserver(() => renderStatus());
frame?.addEventListener('load', () => {
  // Browsing back can restore the iframe's previous map independently of its src attribute.
  let path;
  mapBodyObserver.disconnect();
  try { path = frame.contentWindow.location.pathname; } catch { renderStatus(); return; }
  const button = mapButtons.find(item => item.dataset.map === path);
  if (button && button !== selected && frame.classList.contains('ready')) selectMap(button);
  if (button && path.startsWith('/bluemap/') && frame.contentDocument?.body)
    mapBodyObserver.observe(frame.contentDocument.body, { childList: true });
  renderStatus();
});

const request = url => fetch(url, { cache: 'no-store', signal: AbortSignal.timeout(4000) });
async function readSnapshot(id, server) {
  try {
    const response = await request('/v3/status/' + id + '.json');
    if (!response.ok) throw Error();
    const data = await response.json();
    if (!(Number.isSafeInteger(data.sampledAt) && data.sampledAt > 0 && typeof data.running === 'boolean'
      && Number.isFinite(data.mspt) && data.mspt >= 0 && [data.onlinePlayers, data.totalLogins].every(n => Number.isSafeInteger(n) && n >= 0))) throw Error();
    server.data = data;
    server.missingSince = null;
  } catch {
    server.missingSince ??= Date.now();
  }
}

async function probeMap(button) {
  if (interrupted(servers.get(button.dataset.server), Date.now()) !== null) return;
  try {
    const response = await request(button.dataset.map);
    const marker = button.dataset.map.startsWith('/bluemap/') ? '<title>BlueMap</title>' : 'create-track-map.js';
    if (!response.ok || !(await response.text()).includes(marker)) throw Error();
    mapErrors.set(button, null);
  } catch {
    if (mapErrors.get(button) == null) mapErrors.set(button, Date.now());
  }
}

async function poll() {
  const start = performance.now();
  await Promise.all([...servers].map(([id, server]) => readSnapshot(id, server)));
  renderStatus();
  await Promise.all(mapButtons.filter(button => button.dataset.server).map(probeMap));
  renderStatus();
  setTimeout(poll, Math.max(0, 5000 - (performance.now() - start)));
}
if (frame || (sign && sign.getClientRects().length)) {
  renderStatus();
  poll();
  setInterval(renderStatus, 1000);
}
