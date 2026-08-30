import "./css/styles.css";
import { loadData, subscribeToLiveData } from "./data.js";
import { renderPublicSite, activateReveals } from "./render-public.js";
import { initAdmin } from "./render-admin.js";

function handleRoute() {
  window.__inAdmin = window.location.hash.replace('#', '') === 'admin';
  document.body.classList.toggle('admin-mode', window.__inAdmin);
}
window.addEventListener('hashchange', handleRoute);

const cursor = document.getElementById('cursor');
window.addEventListener('mousemove', e => { cursor.style.left = e.clientX + 'px'; cursor.style.top = e.clientY + 'px'; });
document.addEventListener('mouseover', e => {
  if (e.target.closest && e.target.closest('a,button,.work-card,video')) cursor.classList.add('hover');
  else cursor.classList.remove('hover');
});
document.getElementById('menu-btn').addEventListener('click', () => {
  const nav = document.getElementById('main-nav');
  nav.classList.toggle('open');
  document.getElementById('menu-label').textContent = nav.classList.contains('open') ? 'CLOSE' : 'MENU';
});

async function boot() {
  handleRoute();
  await loadData();
  renderPublicSite();
  // Keep the public site live-updated when the admin publishes changes,
  // without requiring visitors to refresh.
  subscribeToLiveData(() => { if (!window.__inAdmin) renderPublicSite(); });
  initAdmin();
  window.lucide && window.lucide.createIcons();

  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hide');
    // Only start the scroll-reveal animations once the loader has actually
    // faded out (it takes ~0.8s to fade after the 'hide' class is added),
    // otherwise elements already on-screen would reveal behind it, unseen.
    const done = () => activateReveals();
    loader.addEventListener('transitionend', done, { once: true });
    setTimeout(done, 900); // fallback in case transitionend doesn't fire
  }, 900);
}
boot();
