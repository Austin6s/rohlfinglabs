import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import config from '../site.config.mjs';
import { output, locales, pages, route } from './build.mjs';

// Check the actual static artifact, including links between generated pages.
const base = new URL(config.url.endsWith('/') ? config.url : `${config.url}/`);
const docs = new Map();
for (const locale of Object.keys(locales)) {
  for (const page of pages) docs.set(`${route(page,locale)}index.html`, await readFile(path.join(output,route(page,locale),'index.html'),'utf8'));
}
docs.set('404.html', await readFile(path.join(output,'404.html'),'utf8'));
const decode = s => s.replaceAll('&amp;','&').replaceAll('&quot;','"').replaceAll('&#39;',"'");
const titles = new Set();
let links = 0;
for (const [file, html] of docs) {
  const is404 = file === '404.html';
  const pageUrl = new URL(file.replace(/index\.html$/,''),base);
  assert.equal([...html.matchAll(/<h1[ >]/g)].length,1,`${file}: exactly one h1`);
  assert.match(html, /<main id="main"/);
  assert.match(html, /class="skip-link" href="#main"/);
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  assert.ok(title && !titles.has(title),`${file}: unique nonempty title`);
  titles.add(title);
  assert.ok(html.match(/<meta name="description" content="([^"]+)"/)?.[1],`${file}: description`);
  assert.match(html, /<meta property="og:image" content="https?:\/\//);
  const structured = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)?.[1];
  assert.ok(JSON.parse(structured)['@graph'].length >= 4,`${file}: valid structured data`);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(new Set(ids).size,ids.length,`${file}: unique element IDs`);
  if (!is404) {
    const locale = file.startsWith('zh-tw/') ? 'zh-tw' : 'en';
    const page = pages.find(p=>`${route(p,locale)}index.html`===file);
    assert.match(html,new RegExp(`<html lang="${locales[locale].lang}">`));
    const canonical = decode(html.match(/<link rel="canonical" href="([^"]+)"/)?.[1] || '');
    assert.equal(canonical,pageUrl.href,`${file}: canonical matches route`);
    for (const [target,c] of Object.entries(locales)) {
      const expected = new URL(route(page,target),base).href;
      assert.ok(html.includes(`hreflang="${c.lang}" href="${expected}"`),`${file}: localized alternate ${target}`);
    }
    assert.ok(html.includes('hreflang="x-default"'),`${file}: default alternate`);
  } else assert.match(html,/<meta name="robots" content="noindex, follow">/);

  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const href = decode(match[1]);
    if (/^(mailto:|tel:|data:)/.test(href)) continue;
    const resolved = new URL(href,pageUrl);
    if (resolved.origin !== base.origin) continue;
    assert.ok(resolved.pathname.startsWith(base.pathname),`${file}: link escapes deployment base: ${href}`);
    let destination = decodeURIComponent(resolved.pathname.slice(base.pathname.length));
    if (destination.endsWith('/') || destination === '') destination += 'index.html';
    assert.ok(!destination.includes('..'),`${file}: unsafe path`);
    await stat(path.join(output,destination)).catch(()=>assert.fail(`${file}: missing link target ${href} → ${destination}`));
    if (resolved.hash && docs.has(destination)) {
      const anchor = decodeURIComponent(resolved.hash.slice(1));
      assert.ok(docs.get(destination).includes(`id="${anchor}"`),`${file}: missing anchor ${href}`);
    }
    links++;
  }
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    assert.match(m[0],/alt="[^"]*"/,`${file}: image has alt`);
    assert.match(m[0],/width="\d+"/,`${file}: image reserves width`);
    assert.match(m[0],/height="\d+"/,`${file}: image reserves height`);
  }
  assert.ok(!/<form\b/.test(html),`${file}: no unconnected contact form`);
}
const sitemap = await readFile(path.join(output,'sitemap.xml'),'utf8');
assert.equal([...sitemap.matchAll(/<loc>/g)].length,pages.length*Object.keys(locales).length);
for (const locale of Object.keys(locales)) for (const page of pages) assert.ok(sitemap.includes(`<loc>${new URL(route(page,locale),base).href}</loc>`));
assert.ok((await readFile(path.join(output,'robots.txt'),'utf8')).includes(new URL('sitemap.xml',base).href));
assert.ok((await stat(path.join(output,'assets/social-card.png'))).size>1000,'social sharing PNG exists');
assert.ok((await stat(path.join(output,'assets/site.js'))).size<5000,'client JavaScript stays small');
assert.ok((await stat(path.join(output,'assets/site.css'))).size<60000,'CSS stays small');
console.log(`Passed: ${docs.size} HTML documents, ${links} local links/assets, bilingual metadata, structured data, sitemap, and asset budgets.`);
