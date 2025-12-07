document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('.nav-list-overlay a').forEach(a => {
    a.addEventListener('click', () => {
      const cb = document.querySelector('.nav-toggle');
      if (cb) cb.checked = false;
    });
  });


  const overlay = document.querySelector('.nav-overlay');
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        const cb = document.querySelector('.nav-toggle');
        if (cb) {
          cb.checked = false;
        }
      }
    });
  }

  document.querySelectorAll('.close-panel').forEach(btn => btn.addEventListener('click', () => {
    const cb = document.querySelector('.nav-toggle'); if (cb) cb.checked = false;
  }));
});
