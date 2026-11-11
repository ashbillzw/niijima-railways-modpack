const navigation = document.querySelector('.site-navigation');
if (document.documentElement.classList.contains('in-game'))
  document.querySelector('.home-brand')?.removeAttribute('href');
const moreMenu = navigation.querySelector('.more-menu');
const compactLinks = Array.from(navigation.querySelectorAll('.compact-nav-link'));
const compactNavigation = matchMedia('(max-width: 640px)');
function arrangeNavigation() {
  if (compactNavigation.matches) moreMenu.querySelector('.more-links').prepend(...compactLinks);
  else for (const link of compactLinks) navigation.insertBefore(link, moreMenu);
}
compactNavigation.addEventListener('change', arrangeNavigation);
arrangeNavigation();
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') moreMenu.open = false;
});
