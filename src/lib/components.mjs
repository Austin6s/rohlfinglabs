export const esc = (value = '') => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const lines = text => esc(text).replaceAll('\n', '<br>');
export const arrow = (diagonal = false) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="${diagonal ? 'M5 19 19 5M5 5h14v14' : 'M4 12h15m-6-6 6 6-6 6'}"/></svg>`;
export const mark = `<svg class="brand-mark" viewBox="0 0 48 48" fill="none" aria-hidden="true"><rect x="1" y="1" width="46" height="46" rx="9" fill="#294d36"/><g stroke="#f8f8f3" stroke-width="2.4" stroke-linejoin="round"><path d="M10.5 35V13h8a6.5 6.5 0 0 1 0 13h-8m8 0L26 35"/><path d="M31 13v22h9"/></g><rect x="36" y="12" width="4" height="4" fill="#d6ec9f"/></svg>`;
export const link = (href, text, className = 'text-link', diagonal = false) => `<a class="${className}" href="${esc(href)}">${esc(text)}${arrow(diagonal)}</a>`;
export const label = text => `<p class="eyebrow">${esc(text)}</p>`;
export function header(c, page, url) {
  return `<header class="site-header" id="top"><div class="container header-inner">
    <a class="brand" href="${url('home')}" aria-label="Rohlfing Labs — ${esc(c.nav.home)}">${mark}<span>Rohlfing<span class="brand-labs"> Labs</span></span></a>
    <button class="menu-toggle" type="button" aria-controls="primary-navigation" aria-expanded="false" data-open-label="${esc(c.menu)}" data-close-label="${esc(c.menuClose)}"><span>${esc(c.menu)}</span><i aria-hidden="true"></i></button>
    <nav id="primary-navigation" class="primary-navigation" aria-label="${c.lang === 'en' ? 'Main navigation' : '主要導覽'}">
      ${['services','work','about'].map(p => `<a href="${url(p)}"${p === page ? ' aria-current="page"' : ''}>${esc(c.nav[p])}</a>`).join('')}
      <div class="language-switch" role="group" aria-label="${esc(c.languageLabel)}"><a lang="en" hreflang="en" href="${url(page, 'en')}"${c.lang === 'en' ? ' aria-current="true"' : ''}>EN</a><span aria-hidden="true">/</span><a lang="zh-Hant" hreflang="zh-Hant" href="${url(page, 'zh-tw')}"${c.lang !== 'en' ? ' aria-current="true"' : ''}>繁中</a></div>
      ${link(url('contact'), c.nav.contact, 'nav-cta')}
    </nav></div></header>`;
}
export function footer(c, url) {
  return `<footer class="site-footer"><div class="container"><div class="footer-top"><div><a class="brand" href="${url('home')}">${mark}<span>Rohlfing<span class="brand-labs"> Labs</span></span></a><p>${esc(c.footer.tagline)}</p></div><div class="footer-nav">${['services','work','about','contact'].map(p => `<a href="${url(p)}">${esc(c.nav[p])}</a>`).join('')}</div></div><div class="footer-bottom"><span>© ${new Date().getUTCFullYear()} ${esc(c.footer.copyright)}</span><span>${esc(c.footer.location)}</span><a href="#top">${esc(c.footer.back)} ↑</a></div></div></footer>`;
}
export function cta(c, url) {
  return `<section class="cta-section"><div class="container cta-inner"><div>${label(c.cta.label)}<h2>${lines(c.cta.title)}</h2></div>${link(url('contact'), c.cta.link, 'button button-light', true)}</div></section>`;
}
export function portrait(c, asset) {
  return `<figure class="portrait">${asset ? `<img src="${esc(asset)}" alt="Austin Rohlfing" width="600" height="720" loading="lazy">` : `<div class="portrait-placeholder" role="img" aria-label="${esc(c.founder.photo)}"><div class="portrait-lines" aria-hidden="true"></div><span class="portrait-mono" aria-hidden="true">${esc(c.founder.monogram)}<span>↗</span></span><span class="portrait-note">${esc(c.founder.photoNote)}</span></div>`}<figcaption><strong>Austin Rohlfing</strong><span>${esc(c.founder.role)}</span></figcaption></figure>`;
}
export function systemsArt(c) {
  const zh = c.lang !== 'en';
  const t = zh ? ['業務需求', '理解與釐清', '軟體', '資料', 'AI', '實際可用的解決方案'] : ['BUSINESS NEED', 'UNDERSTAND & DEFINE', 'SOFTWARE', 'DATA', 'AI', 'WORKING SOLUTION'];
  return `<figure class="systems-figure"><div class="figure-heading"><span>${esc(c.hero.figureLabel)}</span><span aria-hidden="true">FIG. 01</span></div><svg class="systems-art" viewBox="0 0 560 430" role="img" aria-labelledby="systems-title"><title id="systems-title">${esc(c.hero.figure)}</title><defs><pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#cdd3c6"/></pattern><marker id="arrowhead" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 10 5 0 10" fill="none" stroke="#446749" stroke-width="1.5"/></marker></defs><rect width="560" height="430" fill="url(#dots)"/>
  <g class="incoming-lines" fill="none" stroke="#a6b0a0" stroke-width="1.2"><path d="M-30 75h95q30 0 30 30v77q0 28 30 28h72"/><path d="M-10 137h44q30 0 30 30v33q0 28 30 28h103"/><path d="M-20 214h217"/><path d="M-10 295h60q30 0 30-30v-9q0-28 30-28h87"/><path d="M-30 359h117q30 0 30-30v-60q0-29 30-29h50"/></g>
  <g fill="#f1f3e9" stroke="#a6b0a0"><circle cx="34" cy="137" r="4"/><circle cx="52" cy="214" r="4"/><circle cx="70" cy="359" r="4"/></g>
  <g fill="none" stroke="#446749" stroke-width="1.3"><path d="M281 211h34q20 0 20-20v-68q0-20 20-20h23" marker-end="url(#arrowhead)"/><path d="M281 220h97" marker-end="url(#arrowhead)"/><path d="M281 229h34q20 0 20 20v68q0 20 20 20h23" marker-end="url(#arrowhead)"/><path d="M451 103h23q16 0 16 16v85q0 16 16 16h34"/><path d="M451 220h89"/><path d="M451 337h23q16 0 16-16v-85q0-16 16-16h34"/></g>
  <path d="m239 170 48 48-48 48-48-48z" fill="#254d36"/><path d="M220 218h38m-19-19v38" stroke="#d7ed9d" stroke-width="1.5"/>
  <g fill="#f7f8f1" stroke="#91a18c"><rect x="378" y="72" width="73" height="62" rx="3"/><rect x="378" y="189" width="73" height="62" rx="3"/><rect x="378" y="306" width="73" height="62" rx="3"/></g>
  <g fill="none" stroke="#446749" stroke-width="1.4"><path d="m407 92-10 11 10 11m16-22 10 11-10 11m-14 5 10-32"/><ellipse cx="414" cy="209" rx="15" ry="6"/><path d="M399 209v22c0 8 30 8 30 0v-22m-30 11c0 8 30 8 30 0"/><path d="m414 321 4 12 12 4-12 4-4 12-4-12-12-4 12-4z"/></g>
  <g class="diagram-text" fill="#47604a" font-size="13" letter-spacing="1"><text x="25" y="46">${t[0]}</text><text x="239" y="294" text-anchor="middle" font-size="12">${t[1]}</text><text x="414" y="155" text-anchor="middle">${t[2]}</text><text x="414" y="272" text-anchor="middle">${t[3]}</text><text x="414" y="389" text-anchor="middle">${t[4]}</text></g><circle cx="540" cy="220" r="7" fill="#254d36"/><circle cx="540" cy="220" r="3" fill="#d7ed9d"/>
  </svg><figcaption><span class="status-dot" aria-hidden="true"></span>${esc(c.hero.figureNote)}<span class="figure-cross" aria-hidden="true">+</span></figcaption></figure>`;
}
export function miniIcon(kind) {
  return `<svg class="service-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true">${kind === 'software' ? '<rect x="5" y="8" width="38" height="31" rx="2"/><path d="M5 16h38M10 12h2m3 0h2m3 0h2m-3 9-6 6 6 6m10-12 6 6-6 6m-5-13-3 14"/>' : kind === 'data' ? '<ellipse cx="24" cy="11" rx="16" ry="6"/><path d="M8 11v25c0 8 32 8 32 0V11M8 23c0 8 32 8 32 0"/>' : '<path d="m24 4 5 15 15 5-15 5-5 15-5-15-15-5 15-5zM37 5v8m-4-4h8"/>'}</svg>`;
}
