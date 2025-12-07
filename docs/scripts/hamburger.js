document.addEventListener('DOMContentLoaded', () => {
  const MAX_MOBILE_LINKS = 9;

  const desktopList = document.querySelector('.nav-list');
  const overlay = document.querySelector('.nav-overlay');
  const overlayPanel = document.querySelector('.nav-panel');
  let overlayList = document.querySelector('.nav-list-overlay');

  function closeOverlay() {
    const cb = document.querySelector('.nav-toggle');
    if (cb) cb.checked = false;
  }

  function buildOverlayFromDesktop() {
    if (!desktopList || !overlayPanel) return;
    if (!overlayList) {
      overlayList = document.createElement('ul');
      overlayList.className = 'nav-list-overlay';
      overlayPanel.appendChild(overlayList);
    }

    const desktopItems = Array.from(desktopList.querySelectorAll('li'));
    const mobileItems = [];
    const currentPath = (function(){ try { return new URL(location.href).pathname; } catch(e){ return location.pathname || ''; } })();
    const isHome = currentPath === '/' || currentPath.endsWith('/index.html') || currentPath.endsWith('/index.htm');
    for (const li of desktopItems) {
      const a = li.querySelector('a');
      if (!a) continue;
      if (a.dataset && a.dataset.hideMobile === 'true') continue;
      let linkPath = '';
      try {
        linkPath = new URL(a.href, location.href).pathname;
      } catch (e) {
        linkPath = a.getAttribute('href') || '';
      }
      if (linkPath === currentPath) {
        const linkIsHome = linkPath === '/' || linkPath.endsWith('/index.html') || linkPath.endsWith('/index.htm');
        if (! (isHome && linkIsHome) ) {
          continue;
        }
      }
      mobileItems.push(li);
      if (mobileItems.length >= MAX_MOBILE_LINKS) break;
    }

    overlayList.innerHTML = '';
    mobileItems.forEach(li => overlayList.appendChild(li.cloneNode(true)));
    attachOverlayLinkHandlers();
  }

  function buildDesktopFromOverlay() {
    if (!overlayList) overlayList = document.querySelector('.nav-list-overlay');
    if (!overlayList || document.querySelector('.nav-list')) return;
    const nav = document.querySelector('.main-nav');
    if (!nav) return;
    const ul = document.createElement('ul');
    ul.className = 'nav-list';
    ul.innerHTML = overlayList.innerHTML;
    nav.appendChild(ul);
  }

  function attachOverlayLinkHandlers() {
    if (!overlayList) overlayList = document.querySelector('.nav-list-overlay');
    if (!overlayList) return;
    overlayList.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => closeOverlay());
    });
  }

  if (desktopList) {
    buildOverlayFromDesktop();
  } else if (overlayList) {
    buildDesktopFromOverlay();
  }

  attachOverlayLinkHandlers();

  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeOverlay();
    });
  }

  document.querySelectorAll('.close-panel').forEach(btn => btn.addEventListener('click', closeOverlay));
});
