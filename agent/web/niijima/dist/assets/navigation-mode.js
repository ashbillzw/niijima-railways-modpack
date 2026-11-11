(() => {
  const query = new URLSearchParams(location.search);
  const classes = document.documentElement.classList;
  classes.toggle('embedded', query.get('embed') === '1' || window.self !== window.top);
  classes.toggle('hide-nav', query.get('nav') === '0');
  classes.toggle('in-game', query.get('in_game') === '1');
})();
