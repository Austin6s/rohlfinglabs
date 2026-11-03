// Run before styles load so saved preferences apply on the first paint.
(() => {
  let preference = 'system';
  try {
    const saved = localStorage.getItem('rohlfing-theme');
    if (saved === 'light' || saved === 'dark') preference = saved;
  } catch { /* System preference still works when storage is unavailable. */ }
  const theme = preference === 'system'
    ? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : preference;
  document.documentElement.dataset.themePreference = preference;
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#0f1c21' : '#f7faf9';
})();
