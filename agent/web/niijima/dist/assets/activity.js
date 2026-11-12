(() => {
  const entry = new URL(location.href);
  const configURL = new URL('../config/activity.json', entry);
  const fallback = new URL('feedback-v1.6/', entry);
  function destination(value) {
    const target = value ? new URL(value, configURL) : fallback;
    if (!['https:', 'http:'].includes(target.protocol) || target.username || target.password)
      throw new Error('Invalid activity destination');
    if (target.origin === entry.origin && target.pathname.replace(/index\.html$/, '') === entry.pathname.replace(/index\.html$/, ''))
      throw new Error('Activity redirect loop');
    if (entry.searchParams.get('in_game') === '1') target.searchParams.set('in_game', '1');
    return target;
  }
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4000);
  fetch(configURL, { cache: 'no-store', signal: controller.signal })
    .then(response => { if (!response.ok) throw new Error(`Activity config HTTP ${response.status}`); return response.json(); })
    .then(config => location.replace(destination(config.target).href))
    .catch(() => { if (entry.searchParams.get('in_game') === '1') fallback.searchParams.set('in_game', '1'); location.replace(fallback.href); })
    .finally(() => clearTimeout(timeout));
})();
