export const esc = (value = '') => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const lines = text => esc(text).replaceAll('\n', '<br>');
export const arrow = (diagonal = false) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="${diagonal ? 'M5 19 19 5M5 5h14v14' : 'M4 12h15m-6-6 6 6-6 6'}"/></svg>`;
// Use the cropped wordmark and lighten its charcoal lettering in dark mode.
const brand = (url, placement = 'header') => `<svg class="brand-logotype" viewBox="0 0 810 135" width="810" height="135" role="img" aria-labelledby="gold-brand-title-${placement}">
  <title id="gold-brand-title-${placement}">Rohlfing Labs</title>
  <defs><filter id="gold-brand-night-${placement}" color-interpolation-filters="sRGB">
    <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -2.126 -7.152 -0.722 0 3" result="charcoal"/>
    <feComposite in="charcoal" in2="SourceAlpha" operator="in" result="mask"/>
    <feFlood flood-color="#e3eeed" result="light"/>
    <feComposite in="light" in2="mask" operator="in" result="light-text"/>
    <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="light-text"/></feMerge>
  </filter></defs>
  <image class="gold-brand-day" href="${url.asset('assets/rohlfing-labs-wordmark.webp')}" width="810" height="135"/>
  <image class="gold-brand-night" href="${url.asset('assets/rohlfing-labs-wordmark.webp')}" width="810" height="135" filter="url(#gold-brand-night-${placement})"/>
</svg>`;
export const link = (href, text, className = 'text-link', diagonal = false) => `<a class="${className}" href="${esc(href)}">${esc(text)}${arrow(diagonal)}</a>`;
export const label = text => `<p class="eyebrow">${esc(text)}</p>`;
export function header(c, page, url) {
  const alternate = c.lang === 'en' ? { key: 'zh-tw', lang: 'zh-Hant', name: '繁體中文' } : { key: 'en', lang: 'en', name: 'English' };
  const current = target => page === target ? ' aria-current="page"' : '';
  return `<header class="site-header"><div class="container header-inner">
    <a class="brand" href="${url('home')}" aria-label="Rohlfing Labs — ${esc(c.nav.home)}"${current('home')}>${brand(url)}</a>
    <button class="menu-toggle" type="button" aria-controls="primary-navigation" aria-expanded="false" data-open-label="${esc(c.menu)}" data-close-label="${esc(c.menuClose)}" hidden><span class="visually-hidden">${esc(c.menu)}</span><i aria-hidden="true"></i></button>
    <nav id="primary-navigation" class="primary-navigation" aria-label="${c.lang === 'en' ? 'Main navigation' : '主要導覽'}">
      ${['services','work','about'].map(p => `<a href="${url(p)}"${current(p)}>${esc(c.nav[p])}</a>`).join('')}
      <a class="language-switch" lang="${alternate.lang}" hreflang="${alternate.lang}" href="${url(page || 'home', alternate.key)}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 2.4 4 5.6 4 9s-1.4 6.6-4 9c-2.6-2.4-4-5.6-4-9s1.4-6.6 4-9Z"/></svg><span>${alternate.name}</span></a>
      <button class="theme-toggle" type="button" aria-pressed="false" data-light-label="${c.lang === 'en' ? 'Switch to light mode' : '切換淺色模式'}" data-dark-label="${c.lang === 'en' ? 'Switch to dark mode' : '切換深色模式'}" hidden><svg class="theme-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M20.5 13A8.7 8.7 0 0 1 11 3.5 8.8 8.8 0 1 0 20.5 13Z"/></svg><svg class="theme-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg><span>${c.lang === 'en' ? 'Dark mode' : '深色模式'}</span></button>
      <a class="nav-cta" href="${url('contact')}"${current('contact')}>${esc(c.nav.contact)}${arrow()}</a>
    </nav></div></header>`;
}
export function footer(c, url) {
  return `<footer class="site-footer"><div class="container"><div class="footer-top">
    <div><a class="brand" href="${url('home')}">${brand(url, 'footer')}</a><p>${esc(c.footer.tagline)}</p></div>
    <nav class="footer-nav" aria-label="${c.lang === 'en' ? 'Footer navigation' : '頁尾導覽'}">${['services','work','about','contact'].map(p => `<a href="${url(p)}">${esc(c.nav[p])}</a>`).join('')}</nav>
  </div><div class="footer-bottom"><span>© ${new Date().getUTCFullYear()} ${esc(c.footer.copyright)}</span><span>${esc(c.footer.location)}</span><a href="#top">${esc(c.footer.back)} ↑</a></div></div></footer>`;
}
export function cta(c, url) {
  return `<section class="cta-section"><div class="container cta-inner"><h2>${lines(c.cta.title)}</h2>${link(url('contact'), c.cta.link, 'button button-light')}</div></section>`;
}
export function portrait(c, asset) {
  return `<figure class="portrait"><img src="${esc(asset)}" alt="Austin Rohlfing" width="707" height="942" loading="lazy" decoding="async"><figcaption><strong>Austin Rohlfing</strong><span>${esc(c.founder.role)}</span></figcaption></figure>`;
}
export function miniIcon(kind) {
  return `<svg class="service-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true">${kind === 'software' ? '<rect x="5" y="8" width="38" height="31" rx="2"/><path d="M5 16h38M10 12h2m3 0h2m3 0h2m-3 9-6 6 6 6m10-12 6 6-6 6m-5-13-3 14"/>' : kind === 'data' ? '<ellipse cx="24" cy="11" rx="16" ry="6"/><path d="M8 11v25c0 8 32 8 32 0V11M8 23c0 8 32 8 32 0"/>' : '<path d="m24 4 5 15 15 5-15 5-5 15-5-15-15-5 15-5zM37 5v8m-4-4h8"/>'}</svg>`;
}
