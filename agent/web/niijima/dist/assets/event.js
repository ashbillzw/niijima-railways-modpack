(() => {
  // Freeze the path's glyph placement before applying local vertical offsets.
  requestAnimationFrame(() => {
    const text = document.querySelector('.ribbon-label text');
    if (!text) return;
    const offsets = [0, 0, 0, 0, 0, 0, 3, 6, 9];
    const glyphs = Array.from(text.textContent, (character, i) => ({
      character, origin: text.getStartPositionOfChar(i), angle: text.getRotationOfChar(i), offset: offsets[i] || 0
    }));
    text.replaceChildren(...glyphs.map(({ character, origin, angle, offset }) => {
      const span = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
      const radians = angle * Math.PI / 180;
      span.setAttribute('x', origin.x - Math.sin(radians) * offset);
      span.setAttribute('y', origin.y + Math.cos(radians) * offset);
      span.setAttribute('rotate', angle);
      span.textContent = character;
      return span;
    }));
  });
  const frame = document.getElementById('feedback-frame');
  const slot = document.querySelector('.feedback-slot');
  const container = frame.closest('.feedback-container');
  let reservedWidth = 0, reservedHeight = 0;
  frame.addEventListener('load', () => frame.contentWindow.postMessage({ type: 'niijima-feedback-measure' }, location.origin));
  const inGame = new URLSearchParams(location.search).get('in_game') === '1';
  if (inGame) {
    const url = new URL(frame.src);
    url.searchParams.set('in_game', '1');
    frame.src = url.href;
  }
  window.addEventListener('message', event => {
    if (event.source !== frame.contentWindow || event.origin !== location.origin) return;
    if (event.data?.type !== 'niijima-feedback-height') return;
    const height = event.data.height;
    if (Number.isFinite(height) && height >= 0) {
      frame.style.height = `${Math.ceil(height) + 24}px`;
      const width = frame.clientWidth;
      if (width !== reservedWidth) reservedHeight = 0;
      reservedWidth = width;
      // Keep the page background stable when a shorter tab hides its attachment field.
      reservedHeight = Math.max(reservedHeight, container.getBoundingClientRect().bottom - slot.getBoundingClientRect().top);
      slot.style.minHeight = `${Math.ceil(reservedHeight)}px`;
    }
  });
})();
