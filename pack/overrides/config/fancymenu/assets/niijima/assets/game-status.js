// The same client bridge is used by a direct in-game homepage and its offline host.
window.readNiijimaStatus = (() => {
  let pending;
  return () => {
    if (pending) return pending;
    if (typeof window.niijimaServerStatus !== 'function') return Promise.resolve(null);
    pending = new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('Status bridge did not respond')), 5000);
      window.niijimaServerStatus({request:'read', onSuccess:json=>{
        clearTimeout(timer);
        try { resolve(JSON.parse(json)); } catch(error) { reject(error); }
      }, onFailure:(code,message)=>{clearTimeout(timer); reject(new Error(message));}});
    }).finally(()=>{pending=null});
    return pending;
  };
})();
