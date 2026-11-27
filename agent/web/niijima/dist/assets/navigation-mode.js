(() => {
  const query = new URLSearchParams(location.search);
  const root = document.documentElement;
  const classes = root.classList;
  const inGame = classes.contains('local-home') || query.get('in_game') === '1';
  const inFrame = window !== window.top;
  // The game shell gives its main page the full viewport. Maps and forms inherit its scale.
  const embedded = query.get('embed') === '1' || (inFrame && (!inGame || window.parent !== window.top));
  classes.toggle('embedded', embedded);
  classes.toggle('hide-nav', query.get('nav') === '0');
  if (inGame) {
    classes.add('in-game');
    if (classes.contains('home-page')) {
      let skipped = false;
      try { skipped = sessionStorage.getItem('niijima-opening-skipped') === '1'; } catch {}
      if ((inFrame && !embedded) || !skipped) {
        classes.add('opening-pending');
        const curtain = document.createElement('style');
        curtain.textContent = 'html.opening-pending::after{content:"";position:fixed;inset:0;background:#000;z-index:2147483647}';
        document.head.append(curtain);
      }
    }
    const policy = document.createElement('meta');
    policy.httpEquiv = 'Content-Security-Policy';
    policy.content = "frame-src 'self'; form-action 'self'";
    document.head.append(policy);
  }
})();
