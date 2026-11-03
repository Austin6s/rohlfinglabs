// System colors and navigation remain available without JavaScript.
const root = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');
const systemTheme = matchMedia('(prefers-color-scheme: dark)');
const applyTheme = preference => {
  const theme = preference === 'system' ? (systemTheme.matches ? 'dark' : 'light') : preference;
  root.dataset.themePreference = preference;
  root.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#0f1c21' : '#f7faf9';
  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
    themeToggle.title = theme === 'dark' ? themeToggle.dataset.lightLabel : themeToggle.dataset.darkLabel;
    themeToggle.hidden = false;
  }
};
applyTheme(root.dataset.themePreference || 'system');
themeToggle?.addEventListener('click', () => {
  const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(theme);
  try { localStorage.setItem('rohlfing-theme', theme); } catch { /* Keep the current page usable. */ }
});
systemTheme.addEventListener('change', () => {
  if (root.dataset.themePreference === 'system') applyTheme('system');
});
window.addEventListener('storage', event => {
  if (event.key === 'rohlfing-theme' || event.key === null) {
    applyTheme(event.newValue === 'light' || event.newValue === 'dark' ? event.newValue : 'system');
  }
});

const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-navigation');
if (menu && navigation) {
  const setOpen = open => {
    menu.setAttribute('aria-expanded', String(open));
    menu.querySelector('span').textContent = open ? menu.dataset.closeLabel : menu.dataset.openLabel;
    navigation.classList.toggle('is-open', open);
  };
  menu.addEventListener('click', () => setOpen(menu.getAttribute('aria-expanded') !== 'true'));
  navigation.addEventListener('click', event => { if (event.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      menu.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.site-header')) setOpen(false);
  });
  matchMedia('(min-width: 1051px)').addEventListener('change', () => setOpen(false));
}
