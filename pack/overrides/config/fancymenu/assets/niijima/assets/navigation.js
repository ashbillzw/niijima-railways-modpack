const navigation = document.querySelector('.site-navigation');
const inGame = document.documentElement.classList.contains('in-game');
if (inGame) {
  window.niijimaClick = () => {
    if (parent !== window) parent.postMessage({type:'niijima:click'}, '*');
  };
  document.addEventListener('click', event => {
    const control = event.target.closest('button, a[href], summary, [role="button"]');
    if (control && !control.matches(':disabled, [aria-disabled="true"]')) window.niijimaClick();
  }, true);

  for (const link of document.querySelectorAll('a[href], .downloads a.action')) {
    if (link.matches('.downloads a.action')) {
      link.href = '#';
      link.removeAttribute('aria-disabled');
      link.removeAttribute('target');
      link.dataset.browserDownload = '';
      continue;
    }
    const target = new URL(link.getAttribute('href'), document.baseURI);
    if (link.closest('.more-links, .footer-links') || target.origin !== location.origin) {
      link.removeAttribute('href');
      link.removeAttribute('target');
      link.setAttribute('aria-disabled', 'true');
    } else if (target.pathname.startsWith('/v3/')) {
      target.searchParams.set('in_game', '1');
      link.href = target.href;
      link.removeAttribute('target');
    }
  }

  let notice;
  let dismiss;
  function showDownloadNotice(event) {
    const control = event.target.closest('[data-browser-download]');
    if (!control || (event.type === 'auxclick' && event.button !== 1)) return;
    event.preventDefault();
    if (!notice) {
      notice = document.createElement('div');
      notice.className = 'game-download-notice';
      notice.setAttribute('role', 'status');
      document.body.append(notice);
    }
    notice.classList.remove('fading');
    notice.textContent = '下载需在浏览器中打开';
    const rect = control.getBoundingClientRect();
    const scale = Number(document.documentElement.style.getPropertyValue('--page-scale')) || 1;
    const x = (event.detail ? event.clientX : rect.left + rect.width / 2) / scale;
    const y = (event.detail ? event.clientY : rect.top) / scale;
    notice.style.left = Math.max(4, Math.min(x + 8, innerWidth / scale - notice.offsetWidth - 4)) + 'px';
    notice.style.top = (y >= notice.offsetHeight + 12 ? y - notice.offsetHeight - 8 : Math.min(y + 8, innerHeight / scale - notice.offsetHeight - 4)) + 'px';
    clearTimeout(dismiss);
    dismiss = setTimeout(() => notice.classList.add('fading'), 1800);
  }
  document.addEventListener('click', showDownloadNotice);
  document.addEventListener('auxclick', showDownloadNotice);
}
const moreMenu = navigation.querySelector('.more-menu');
const compactLinks = Array.from(navigation.querySelectorAll('.compact-nav-link'));
function arrangeNavigation() {
  const header = navigation.closest('.shared-header');
  if (!header.offsetWidth) {
    document.documentElement.classList.toggle('compact-navigation', document.body.clientWidth <= 760);
    return;
  }
  const shell = navigation.parentElement;
  const plaque = document.querySelector('.footer-links');
  // Measure at design size so pixel rounding while zoomed cannot move the breakpoint.
  document.documentElement.style.removeProperty('--bar-scale');
  const headerStyle = getComputedStyle(header);
  const headerWidth = [...shell.children].reduce((sum, item) => sum + item.offsetWidth, 0)
    + 2 * parseFloat(getComputedStyle(shell).columnGap)
    + parseFloat(headerStyle.paddingLeft) + parseFloat(headerStyle.paddingRight) + 2;
  const pageScale = Number(document.documentElement.style.getPropertyValue('--page-scale')) || 1;
  const available = header.getBoundingClientRect().width / pageScale;
  const folded = moreMenu.contains(compactLinks[0]);
  // Both modes use the four-switch breakpoint, even when More is hidden in game.
  const slotWidth = navigation.querySelector('.download-link').offsetWidth + parseFloat(getComputedStyle(navigation).columnGap);
  const extraWidth = compactLinks.length * slotWidth;
  const expandedWidth = headerWidth + (folded ? extraWidth : inGame && !document.documentElement.classList.contains("game-home") ? slotWidth : 0);
  const compact = available < expandedWidth;
  document.documentElement.classList.toggle('compact-navigation', compact);
  if (compact !== folded) {
    if (compact) {
      const links = moreMenu.querySelector('.more-links');
      const replay = links.querySelector('.opening-link');
      if (replay) replay.after(...compactLinks);
      else links.prepend(...compactLinks);
    }
    else {
      moreMenu.open = false;
      for (const link of compactLinks) navigation.insertBefore(link, moreMenu);
    }
  }
  const requiredWidth = compact ? expandedWidth - extraWidth : expandedWidth;
  const fit = Math.min(1, available / Math.max(requiredWidth, plaque.offsetWidth + 38));
  document.documentElement.style.setProperty('--bar-scale', fit);
}
window.addEventListener('resize', arrangeNavigation);
arrangeNavigation();
document.fonts.ready.then(arrangeNavigation);
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') moreMenu.open = false;
});
