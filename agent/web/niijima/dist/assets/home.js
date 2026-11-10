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
for (const display of document.querySelectorAll('.seven-segment')) {
  const number = display.dataset.value.replace(/^0+(?=\d)/, '');
  const value = number.padStart(6, ' ');
  display.setAttribute('viewBox', '0 0 ' + value.length * 56 + ' 80');
  display.setAttribute('aria-label', number);
  display.innerHTML = Array.from(value, (digit, i) =>
    '<g transform="translate(' + (i * 56 + 3) + ' 1)">' + segmentPoints.map((points, j) =>
      '<polygon class="' + (digit !== ' ' && digitSegments[Number(digit)].includes('abcdefg'[j]) ? 'lit' : 'unlit') + '" points="' + points + '"/>'
    ).join('') + '</g>'
  ).join('');
}

const map = document.getElementById('map');
const mapButtons = document.querySelectorAll('[data-map]');
map.addEventListener('load', () => {
  const current = Array.from(mapButtons).find(button => button.dataset.map === map.contentWindow.location.pathname);
  if (!current) return;
  for (const button of mapButtons) button.setAttribute('aria-pressed', button === current);
  map.title = current.textContent;
});
for (const button of mapButtons) {
  button.addEventListener('click', () => {
    if (button.getAttribute('aria-pressed') === 'true') return;
    for (const item of mapButtons) item.setAttribute('aria-pressed', item === button);
    map.title = button.textContent;
    map.src = button.dataset.map;
  });
}

async function loadEvents() {
  const indexUrl = new URL('/v3/events/index.json', location.href);
  const response = await fetch(indexUrl);
  if (!response.ok) throw new Error(`Events: HTTP ${response.status}`);
  const { events } = await response.json();
  const banners = document.getElementById('event-banners');
  banners.querySelectorAll(".blank-key, .activity-key").forEach(item => item.remove());
  for (const event of events) {
    const link = document.createElement('a');
    link.className = 'console-key activity-key';
    link.href = new URL(event.url, indexUrl);
    link.setAttribute('aria-label', event.alt);
    const screen = document.getElementById('screen-' + event.id);
    if (screen) {
      link.append(screen.content.cloneNode(true));
    } else {
      const image = document.createElement('img');
      image.src = new URL(event.image, indexUrl);
      image.alt = event.alt;
      link.append(image);
    }
    const glass = document.createElement('span');
    glass.className = 'screen-glass';
    glass.append(...link.childNodes);
    link.append(glass);
    banners.append(link);
  }
  for (let i = banners.querySelectorAll('.activity-key').length; i < 4; i++) {
    const blank = document.createElement('button');
    blank.className = 'console-key blank-key';
    blank.disabled = true;
    blank.setAttribute('aria-hidden', 'true');
    blank.tabIndex = -1;
    banners.append(blank);
  }
}
loadEvents().catch(console.error);


// Whole apertures only: resize changes the grid count, never clips a repeating tile.
const ventObserver = new ResizeObserver(entries => {
  for (const { target, contentRect: { width, height } } of entries) {
    if (!width || !height) continue;
    if (target.classList.contains('monitor-vent')) {
      const sections = Math.max(1, Math.round(width / 230));
      const pitch = height / 3, sectionWidth = width / sections;
      let blades = '';
      for (let row = 0; row < 3; row++) for (let col = 0; col < sections; col++) {
        const x = col * sectionWidth + 3, y = row * pitch + 1, w = sectionWidth - 6;
        blades += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + (pitch - 2) + '" rx="1" fill="#080e09"/>'
          + '<path d="M ' + x + ' ' + (y + pitch - 3) + ' h ' + w + '" stroke="url(#louver-lip)" stroke-width="2.2"/>'
          + '<path d="M ' + x + ' ' + (y + 1) + ' h ' + w + '" stroke="#030704" stroke-width="1.5"/>';
      }
      target.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + width + ' ' + height + '" aria-hidden="true"><defs><linearGradient id="louver-lip"><stop stop-color="#59604d"/><stop offset=".35" stop-color="#9a9f85"/><stop offset="1" stop-color="#414b39"/></linearGradient></defs>' + blades + '</svg>';
      continue;
    }
    const pitchX = 18, pitchY = 18;
    const cols = Math.floor(width / pitchX), rows = Math.floor(height / pitchY);
    target.classList.toggle('vent-empty', !cols || rows < 2);
    if (!cols || rows < 2) { target.replaceChildren(); continue; }
    const x0 = (width - (cols - 1) * pitchX) / 2;
    const y0 = (height - (rows - 1) * pitchY) / 2;
    let holes = '';
    for (let row = 0; row < rows; row++) for (let col = 0; col < cols; col++) {
      const seed = ((col + 1) * 73856093 ^ (row + 1) * 19349663) >>> 0;
      const defect = col % 10 === (row * 7 + 4) % 10;
      const x = x0 + col * pitchX + (seed % 3 - 1) * .12;
      const y = y0 + row * pitchY;
      const aperture = defect
        ? '<path d="M -3.7 -.7 Q -3.5 -3.5 -.6 -3.2 L 1 -4.5 2.1 -2.5 Q 4.5 -1.8 3.5 1.5 Q 2.1 4.2 -.8 3.1 Q -4 2.5 -3.7 -.7 Z"'
        : '<ellipse rx="3.2" ry="' + (seed % 5 === 0 ? 3 : 3.2) + '"';
      holes += '<g transform="translate(' + x + ' ' + y + ')">' + aperture + ' fill="#141b15" stroke="#777e694d" stroke-width=".7"/>'
        + '<path d="M -2.4 2.8 Q 0 3.8 2.4 2.8"' + ' fill="none" stroke="#f2edcf55" stroke-width=".7"/>'
        + (defect ? '<path d="M -.7 -3.8 L 1.1 -5.1 2.8 -2.9 M 3.8 1.6 l 1.4 1" fill="none" stroke="#c9c1a3" stroke-width="1.2"/>' : '') + '</g>';
    }
    const gradient = 'hole-metal';
    holes = holes.replaceAll('fill="#141b15"', 'fill="url(#' + gradient + ')"');
    target.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + width + ' ' + height + '" aria-hidden="true"><defs><linearGradient id="' + gradient + '" x2="0" y2="1"><stop stop-color="#050b08"/><stop offset=".65" stop-color="#1c261d"/><stop offset="1" stop-color="#535c49"/></linearGradient></defs>' + holes + '</svg>';
  }
});
document.querySelectorAll('.vent, .monitor-vent').forEach(vent => ventObserver.observe(vent));

const labelMeasure = document.createElement('canvas').getContext('2d');
function fitKeyLabel(button) {
  const label = button.querySelector('span:not(.pilot)');
  const lamp = button.querySelector('.pilot');
  label.style.left = (lamp.offsetLeft + lamp.offsetWidth + 8) + 'px';
  label.style.right = '10px';
  const style = getComputedStyle(button);
  labelMeasure.font = style.fontWeight + ' ' + style.fontSize + ' ' + style.fontFamily;
  const naturalWidth = labelMeasure.measureText(label.textContent).width;
  label.style.fontSize = Math.min(parseFloat(style.fontSize), parseFloat(style.fontSize) * label.clientWidth / naturalWidth) + 'px';
}
const keyLabelObserver = new ResizeObserver(entries => entries.forEach(({target}) => fitKeyLabel(target)));
document.querySelectorAll('.map-switcher .console-key').forEach(button => keyLabelObserver.observe(button));
document.fonts.ready.then(() => document.querySelectorAll('.map-switcher .console-key').forEach(fitKeyLabel));
