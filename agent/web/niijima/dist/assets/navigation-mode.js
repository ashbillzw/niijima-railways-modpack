(() => {
  const query = new URLSearchParams(location.search);
  const root = document.documentElement;
  const classes = root.classList;
  // Nested maps and forms already inherit their parent's visual scale.
  if (window === window.top || query.get('hosted') === '1') {
    function sizePage() {
      const designWidth = innerWidth >= innerHeight ? 1440 : 420;
      const scale = classes.contains('home-page')
        ? Math.min(innerHeight / 1080, innerWidth / 420)
        : innerWidth / designWidth;
      root.style.setProperty('--page-scale', scale);
    }
    sizePage();
    window.addEventListener('resize', sizePage);
  }
  classes.toggle('embedded', query.get('embed') === '1' || (window.self !== window.top && query.get('hosted') !== '1'));
  classes.toggle('hide-nav', query.get('nav') === '0');
  if (classes.contains('local-home') || query.get('in_game') === '1') {
    classes.add('in-game');
    const policy = document.createElement('meta');
    policy.httpEquiv = 'Content-Security-Policy';
    policy.content = "frame-src 'self'; form-action 'self'";
    document.head.append(policy);
  }
})();
