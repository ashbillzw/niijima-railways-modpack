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
    const target = new URL(event.url, indexUrl);
    if (document.documentElement.classList.contains('in-game')) {
      if (target.origin !== location.origin) continue;
      target.searchParams.set('in_game', '1');
    }
    link.href = target.href;
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

// This frame has the same dimensions in every arrangement. Resizing never measures a layout it just switched.
const cabinet = document.querySelector('.cabinet-viewport');
const proportions = getComputedStyle(cabinet);
const bankRatio = Number(proportions.getPropertyValue('--keys-height-ratio')) + Number(proportions.getPropertyValue('--instrument-height-ratio'));
const holePitch = parseFloat(proportions.getPropertyValue('--hole-pitch'));
const maxHoleRows = 17;
new ResizeObserver(([{contentRect: {width, height}}]) => {
  const monitorHeight = height - 20;
  // At the 1920 × 1080 reference size the original cabinet was 1776 wide, with 15% side banks.
  const inset = Math.min(72, Math.max(16, 72 + (width - 1920) * .3));
  const cabinetWidth = width - 2 * inset;
  const bankWidth = Math.min((monitorHeight - 14) / bankRatio, Math.max(266.4, cabinetWidth * .15), (cabinetWidth - 36 - monitorHeight) / 2);
  // Subtract the panel gap, vent margins, strip and borders before counting complete rows.
  const holeArea = monitorHeight - bankRatio * bankWidth - 14 - 71;
  cabinet.style.setProperty('--cabinet-width', cabinetWidth + 'px');
  cabinet.style.setProperty('--bank-width', bankWidth + 'px');
  cabinet.classList.toggle('banked', width > 760 && bankWidth > 0 && holeArea < (maxHoleRows + 1) * holePitch);
}).observe(cabinet);

// Scale the entire instrument, including its mounting plate, from the 1080p reference.
const instrumentObserver = new ResizeObserver(entries => {
  for (const {target, contentRect} of entries) {
    target.style.setProperty('--instrument-scale', contentRect.width / 266.4);
  }
});
document.querySelectorAll('.instrument-slot').forEach(slot => instrumentObserver.observe(slot));

// Whole apertures only: resize changes the grid count, never clips a repeating tile.
const ventObserver = new ResizeObserver(entries => {
  for (const { target, contentRect: { width, height } } of entries) {
    if (target.classList.contains('monitor-vent')) {
      if (!width || !height) continue;
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
    if (!width || !height) { target.replaceChildren(); continue; }
    const pitch = parseFloat(getComputedStyle(target).getPropertyValue('--hole-pitch'));
    const cols = Math.floor(width / pitch), rows = Math.floor(height / pitch);
    target.classList.toggle('vent-empty', !cols || rows < 1);
    if (!cols || rows < 1) { target.replaceChildren(); continue; }
    const x0 = (width - (cols - 1) * pitch) / 2;
    const y0 = (height - (rows - 1) * pitch) / 2;
    let holes = '';
    for (let row = 0; row < rows; row++) for (let col = 0; col < cols; col++) {
      const seed = ((col + 1) * 73856093 ^ (row + 1) * 19349663) >>> 0;
      const defect = col % 10 === (row * 7 + 4) % 10;
      const x = x0 + col * pitch + (seed % 3 - 1) * .12;
      const y = y0 + row * pitch;
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
const mapKeys = [...document.querySelectorAll('.map-switcher .console-key')];
function fitMapKeyLabels() {
  let size = Infinity;
  for (const button of mapKeys) {
    const label = button.querySelector('span:not(.pilot)');
    const style = getComputedStyle(button);
    const base = parseFloat(style.fontSize);
    labelMeasure.font = style.fontWeight + ' ' + style.fontSize + ' ' + style.fontFamily;
    const naturalWidth = labelMeasure.measureText(label.textContent).width;
    if (!label.clientWidth || !naturalWidth) return;
    size = Math.min(size, base, button.clientHeight * .7, base * (label.clientWidth - 1) / naturalWidth);
  }
  document.querySelector('.map-switcher').style.setProperty('--key-label-size', size + 'px');
}
const keyLabelObserver = new ResizeObserver(fitMapKeyLabels);
mapKeys.forEach(button => keyLabelObserver.observe(button));
document.fonts.ready.then(fitMapKeyLabels);
