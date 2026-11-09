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
  for (const event of events) {
    const link = document.createElement('a');
    link.href = new URL(event.url, indexUrl);
    link.setAttribute('aria-label', event.alt);
    const template = document.getElementById(`banner-${event.id}`);
    if (template) {
      link.className = 'campaign-link';
      link.append(template.content.cloneNode(true));
    } else {
      const image = document.createElement('img');
      image.src = new URL(event.image, indexUrl);
      image.alt = event.alt;
      link.append(image);
    }
    banners.append(link);
  }
  banners.hidden = events.length === 0;
}
loadEvents().catch(console.error);
