const contacts = document.querySelector('.footer-links');
const footer = contacts?.closest('.chrome-footer');

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
footer?.addEventListener('pointerdown', event => {
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
  if (event.button === 0 && !event.target.closest('.footer-links a')) {
    window.getSelection().removeAllRanges();
  }
});

document.addEventListener('keydown', event => {
  if (!(event.ctrlKey || event.metaKey) || event.altKey || event.shiftKey || event.key.toLowerCase() !== 'a') return;
  event.preventDefault();
  const selection = window.getSelection();
  selection.removeAllRanges();
  if (contacts?.getClientRects().length) selection.selectAllChildren(contacts);
});

document.addEventListener('copy', event => {
  const selection = window.getSelection();
  if (selection.isCollapsed || !contacts || !selection.containsNode(contacts, true)) return;
  const text = selection.toString()
    .replace('交流群：', 'QQ：')
    .replace('频道：', 'BiliBili：')
    .replace('个人页：', '萌百：');
  event.clipboardData.setData('text/plain', text);
  event.preventDefault();
});
