import { mkdir, rm, cp, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import config from '../site.config.mjs';
import en from '../src/content/en.mjs';
import zh from '../src/content/zh-tw.mjs';
import { esc, header, footer } from '../src/lib/components.mjs';
import * as views from '../src/lib/views.mjs';

export const root = fileURLToPath(new URL('../', import.meta.url));
export const output = path.join(root, 'dist');
export const locales = { en, 'zh-tw': zh };
export const pages = ['home', 'services', 'work', 'about', 'contact'];
export const route = (page, locale) => `${locale === 'en' ? '' : `${locale}/`}${page === 'home' ? '' : `${page}/`}`;

export async function build() {
  const site = new URL(config.url.endsWith('/') ? config.url : `${config.url}/`);
  if (!['http:', 'https:'].includes(site.protocol) || site.search || site.hash || site.username || site.password) throw new Error('SITE_URL must be a public http(s) website URL without query, hash, or credentials.');
  if (config.email && !/^[^\s@<>"'&?]+@[^\s@<>"'&?]+\.[^\s@<>"'&?]+$/.test(config.email)) throw new Error('CONTACT_EMAIL must be a valid email address.');
  if (config.headshot && (!config.headshot.startsWith('assets/') || config.headshot.includes('..'))) throw new Error('headshot must be an assets/ path inside public/.');
  await rm(output, { recursive: true, force: true });
  await mkdir(output, { recursive: true });
  await cp(path.join(root, 'public'), output, { recursive: true });
  const absolute = (page, locale) => new URL(route(page, locale), site).href;

  function render(page, locale, is404 = false) {
    const c = locales[locale];
    const currentRoute = is404 ? '' : route(page, locale);
    const depth = currentRoute.split('/').filter(Boolean).length;
    const prefix = depth ? '../'.repeat(depth) : './';
    const url = (target, targetLocale = locale) => prefix + route(target, targetLocale);
    url.asset = asset => prefix + asset;
    const [title, description] = is404 ? ['Page not found', 'This page could not be found.'] : c.meta[page];
    const fullTitle = `${title} | Rohlfing Labs`;
    const canonical = is404 ? new URL('404.html', site).href : absolute(page, locale);
    const json = {
      '@context': 'https://schema.org', '@graph': [
        { '@type': 'Organization', '@id': `${site.href}#organization`, name: config.name, url: site.href,
          description: c.meta.home[1], slogan: 'Complex problems. Thoughtful technology.',
          logo: new URL('assets/favicon.svg', site).href,
          ...(config.email ? {email: config.email} : {}),
          founder: {'@id': `${site.href}#austin`}, location: {'@type':'Place', name:'Taiwan'} },
        { '@type':'Person', '@id':`${site.href}#austin`, name:'Austin Rohlfing', jobTitle:'Founder',
          worksFor:{'@id':`${site.href}#organization`}, description:c.founder.text },
        { '@type':'WebSite', '@id':`${site.href}#website`, url:site.href, name:config.name, inLanguage:['en','zh-Hant'], publisher:{'@id':`${site.href}#organization`} },
        { '@type':'WebPage', '@id':canonical, url:canonical, name:fullTitle, description, inLanguage:c.lang, isPartOf:{'@id':`${site.href}#website`} },
        ...(page === 'services' ? c.services.map(s=>({'@type':'Service',name:s.name,description:s.text,url:`${canonical}#${s.id}`,provider:{'@id':`${site.href}#organization`}})) : []),
      ]
    };
    return `<!doctype html>
<html lang="${c.lang}"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light"><meta name="theme-color" content="#294d36">
<title>${esc(fullTitle)}</title><meta name="description" content="${esc(description)}">
${is404 ? '<meta name="robots" content="noindex, follow">' : `<link rel="canonical" href="${esc(canonical)}">${Object.entries(locales).map(([key,value])=>`<link rel="alternate" hreflang="${value.lang}" href="${esc(absolute(page,key))}">`).join('')}<link rel="alternate" hreflang="x-default" href="${esc(absolute(page,'en'))}">`}
<meta property="og:type" content="website"><meta property="og:site_name" content="Rohlfing Labs"><meta property="og:title" content="${esc(fullTitle)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${esc(canonical)}"><meta property="og:locale" content="${c.locale}"><meta property="og:locale:alternate" content="${locale === 'en' ? zh.locale : en.locale}">
<meta property="og:image" content="${esc(new URL('assets/social-card.png',site).href)}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="Rohlfing Labs — Complex problems. Thoughtful technology.">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(fullTitle)}"><meta name="twitter:description" content="${esc(description)}"><meta name="twitter:image" content="${esc(new URL('assets/social-card.png',site).href)}">
<link rel="icon" href="${url.asset('assets/favicon.svg')}" type="image/svg+xml">
<link rel="preload" href="${url.asset('assets/manrope-latin.woff2')}" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${url.asset('assets/site.css')}">
<noscript><style>@media(max-width:1050px){.primary-navigation{display:flex;flex-wrap:wrap;flex-direction:row;gap:15px}.primary-navigation .language-switch{margin:0}.menu-toggle{display:none}}</style></noscript>
<script type="application/ld+json">${JSON.stringify(json).replaceAll('<','\\u003c')}</script>
<script src="${url.asset('assets/site.js')}" defer></script>
</head><body class="page-${page}"><a class="skip-link" href="#main">${esc(c.skip)}</a>${header(c,page,url)}<main id="main" tabindex="-1">${views[is404?'notFound':page](c,url,config)}</main>${footer(c,url)}</body></html>`;
  }
  for (const locale of Object.keys(locales)) {
    for (const page of pages) {
      const folder = path.join(output, route(page,locale));
      await mkdir(folder, { recursive:true });
      await writeFile(path.join(folder,'index.html'),render(page,locale));
    }
  }
  // Root-relative paths make this page work for nested missing URLs too.
  let missing = render('home','en',true);
  missing = missing.replace(/(href|src)="\.\//g,`$1="${site.pathname}`);
  await writeFile(path.join(output,'404.html'),missing);
  await writeFile(path.join(output,'.nojekyll'),'');
  const allUrls = Object.keys(locales).flatMap(locale=>pages.map(page=>`<url><loc>${esc(absolute(page,locale))}</loc>${Object.entries(locales).map(([key,value])=>`<xhtml:link rel="alternate" hreflang="${value.lang}" href="${esc(absolute(page,key))}"/>`).join('')}<xhtml:link rel="alternate" hreflang="x-default" href="${esc(absolute(page,'en'))}"/></url>`));
  await writeFile(path.join(output,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${allUrls.join('')}</urlset>`);
  await writeFile(path.join(output,'robots.txt'),`User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap.xml',site).href}\n`);
  console.log(`Built ${pages.length * Object.keys(locales).length} localized pages + 404 → dist/\nCanonical base: ${site.href}`);
  if (!config.email) console.log('Launch reminder: CONTACT_EMAIL is unset; the contact page shows an explicit placeholder.');
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await build();
