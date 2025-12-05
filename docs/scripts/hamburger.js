document.addEventListener('DOMContentLoaded', () => {
  // close overlay when clicking a link inside it
  document.querySelectorAll('.nav-list-overlay a').forEach(a => {
    a.addEventListener('click', () => {
      const cb = document.querySelector('.nav-toggle');
      if (cb) cb.checked = false;
    });
  });

  // close when clicking the overlay background
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
  // close button
  document.querySelectorAll('.close-panel').forEach(btn => btn.addEventListener('click', () => {
    const cb = document.querySelector('.nav-toggle'); if (cb) cb.checked = false;
  }));
});
