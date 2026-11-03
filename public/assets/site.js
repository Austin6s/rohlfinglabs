// The page remains useful without JavaScript. Only the compact mobile menu
// needs enhancement; the CSS fallback keeps navigation visible without JS.
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
