const menuToggle = document.querySelector('.menu-toggle');
menuToggle.addEventListener('click', () => {
  menuToggle.setAttribute('aria-expanded', menuToggle.getAttribute('aria-expanded') !== 'true');
});
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  document.querySelector('.more-menu').open = false;
  menuToggle.setAttribute('aria-expanded', 'false');
});
