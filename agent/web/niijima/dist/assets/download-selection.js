(() => {
  if (document.documentElement.classList.contains('embedded')) return;
  const contacts = document.querySelector('.footer-links');
  const footer = contacts?.closest('.shared-footer');
  if (!footer) return;

  // In the footer gutters there is no text under the pointer. Use the nearest
  // contact and let the browser locate the character within its text.
  function contactPosition(x, y) {
    let closest;
    let distance = Infinity;
    for (const link of contacts.querySelectorAll('a')) {
      const range = document.createRange();
      range.selectNodeContents(link.lastChild);
      const rect = range.getBoundingClientRect();
      const dx = Math.max(rect.left - x, 0, x - rect.right);
      const dy = Math.max(rect.top - y, 0, y - rect.bottom);
      const gap = Math.hypot(dx, dy);
      if (gap >= distance) continue;
      distance = gap;
      closest = { text: link.lastChild, rect };
    }
    const { text, rect } = closest;
    if (x <= rect.left) return [text, 0];
    if (x >= rect.right) return [text, text.length];
    const midY = (rect.top + rect.bottom) / 2;
    const caret = document.caretPositionFromPoint?.(x, midY);
    if (caret?.offsetNode === text) return [text, caret.offset];
    const range = document.caretRangeFromPoint?.(x, midY);
    return [text, range?.startContainer === text ? range.startOffset : 0];
  }

  let dragAnchor;
  footer.addEventListener('pointerdown', event => {
    if (event.pointerType !== 'mouse' || event.button !== 0 || event.target.closest('a')) return;
    event.preventDefault();
    dragAnchor = contactPosition(event.clientX, event.clientY);
  });
  document.addEventListener('pointermove', event => {
    if (!dragAnchor || event.pointerType !== 'mouse') return;
    if (!(event.buttons & 1)) {
      dragAnchor = null;
      return;
    }
    window.getSelection().setBaseAndExtent(...dragAnchor, ...contactPosition(event.clientX, event.clientY));
  });
  document.addEventListener('pointerup', () => { dragAnchor = null; });
  window.addEventListener('blur', () => { dragAnchor = null; });

  document.addEventListener('pointerdown', event => {
    if (event.button === 0 && contacts.contains(window.getSelection().anchorNode) && !event.target.closest('.footer-links a')) {
      window.getSelection().removeAllRanges();
    }
  });

  function selectContacts(event) {
    if (!(event.ctrlKey || event.metaKey) || event.altKey || event.shiftKey || event.key.toLowerCase() !== 'a') return;
    if (event.target.isContentEditable || event.target.closest?.('input, textarea, select')) return;
    if (!contacts.getClientRects().length) return;
    event.preventDefault();
    if (event.currentTarget !== document) {
      event.currentTarget.getSelection()?.removeAllRanges();
      contacts.focus({ preventScroll: true });
    }
    const links = contacts.querySelectorAll('a');
    const first = links[0].lastChild;
    const last = links[links.length - 1].lastChild;
    window.getSelection().setBaseAndExtent(first, 0, last, last.length);
  }
  document.addEventListener('keydown', selectContacts);

  // A focused map or embedded form receives keyboard events in its own document.
  for (const frame of document.querySelectorAll('iframe')) {
    const bindFrame = () => frame.contentDocument?.addEventListener('keydown', selectContacts, true);
    frame.addEventListener('load', bindFrame);
    bindFrame();
  }

  document.addEventListener('copy', event => {
    if (event.target.isContentEditable || event.target.closest?.('input, textarea, select')) return;
    const selection = window.getSelection();
    if (selection.isCollapsed || !contacts.contains(selection.anchorNode) || !contacts.contains(selection.focusNode)) return;
    const text = selection.toString()
      .replace('交流群：', 'QQ：')
      .replace('频道：', 'BiliBili：')
      .replace('个人页：', '萌百：');
    event.clipboardData.setData('text/plain', text);
    event.preventDefault();
  });
})();
