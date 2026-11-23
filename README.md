# Rohlfing Labs

The production site uses the concise bilingual design with gold branding, turquoise accents, and warm ivory surfaces. Work in this checkout on `main`.

A bilingual, founder-led software, data, and AI engineering website. English is served at `/`; Traditional Chinese at `/zh-tw/`. Each language has Home, Expertise, Work, About, and Contact pages.

## Production configuration

- Website: **https://rohlfinglabs.com/**
- Source: **https://github.com/Austin6s/rohlfinglabs**
- Hosting: **GitHub Pages**, published by GitHub Actions from `main`. HTTPS is enforced.
- Registrar and authoritative DNS: **Cloudflare**.
- Public contact: **rohlfinglabs@gmail.com**.
- Canonical hostname: **rohlfinglabs.com**; `www` points to GitHub Pages and redirects to the canonical hostname.

GitHub's repository variables `SITE_URL` and `CONTACT_EMAIL` are configured for the URL and address above. These values are also the defaults in `site.config.mjs`, so local and production builds agree. No API tokens or secrets are included in the website.

Cloudflare DNS uses the four official GitHub Pages IPv4 addresses (`185.199.108.153` through `185.199.111.153`), four IPv6 addresses (`2606:50c0:8000::153` through `2606:50c0:8003::153`), and a `www` CNAME to `austin6s.github.io`. All are **DNS only**, with a 300-second TTL. GitHub handles the website and TLS certificate directly. There is no Cloudflare Pages project or Worker for this site.

The custom domain is configured in GitHub Pages settings. `public/CNAME` also records the intended domain in the output; with an Actions publishing source, the repository's Pages setting is authoritative. Do not change the DNS records to proxied mode without reviewing certificate renewal and origin HTTPS behavior.

## Run locally

Use Node.js 22 or later. There are **no npm dependencies** and no install step.

```bash
npm run dev
```

Open **http://127.0.0.1:4321/**. Source and asset changes rebuild automatically; refresh the browser to see them. Restart the server after changing `site.config.mjs` or the build script. Set `PORT` to use another port.

```bash
npm test         # Build and validate the generated artifact
npm run build   # Generate dist/
npm run preview # Build, then serve without watching
```

`SITE_URL` is the public deployment URL, not the local preview URL. It controls canonicals, sitemap links, social image URLs, and the 404 page's asset paths. Ordinary navigation and assets use relative paths. For a different host or project subdirectory:

```bash
SITE_URL=https://example.com/project/ npm test
```

## Publish an update

1. Make changes, run `npm test`, and review both languages in a browser.
2. Commit and push `main` to the existing repository.
3. Watch **Build and deploy GitHub Pages** in the Actions tab. It builds, checks, and uploads `dist/`, then deploys the artifact to Pages. Pull requests build and validate without publishing.
4. Verify the production homepage, a Chinese interior page, the contact link, and an unknown URL. A failed workflow does not replace the last successful deployment.

The repository's publishing source is **GitHub Actions**, not branch-based publishing. `dist/` is generated and ignored by Git. The workflow uses the built-in `GITHUB_TOKEN`; no personal access token is needed in repository secrets.

To recreate the setup in another repository, enable Pages with a workflow publishing source, configure the custom domain in Pages settings, create the DNS records, and set `SITE_URL` and `CONTACT_EMAIL` under **Settings → Secrets and variables → Actions → Variables**. Enforce HTTPS after GitHub's certificate has been issued.

Reference: [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), [custom domain setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

## Architecture

La Varieta was inspected first and was left unchanged. It uses static HTML, CSS/JavaScript, `.nojekyll`, a custom domain, and GitHub Pages. This site preserves that hosting model and uses a small Node script to generate ten HTML documents from shared components and separate language dictionaries.

Visitors receive plain HTML, CSS, one locally hosted font, and about 3 KB of JavaScript for theme preferences and navigation. There is no server runtime, hydration framework, database, CMS, analytics, or external font request. Astro would be reasonable for a growing editorial site; five fixed pages in two languages do not require a framework toolchain.

```text
site.config.mjs          Public domain, email, and headshot configuration
src/content/en.mjs      English content
src/content/zh-tw.mjs    Traditional Chinese content
src/lib/components.mjs  Navigation, footer, icons, and shared components
src/lib/views.mjs       Page layouts
public/assets/          CSS, menu JS, local font, logo assets, and social images
brand/                  Logo and social-card sources; not deployed
public/CNAME            Intended custom domain
scripts/build.mjs       HTML, JSON-LD, sitemap, robots, and 404 generation
scripts/check.mjs       Generated-site checks
scripts/preview.mjs     Local server and rebuild watcher
.github/workflows/      Build, validation, and GitHub Pages deployment
dist/                  Generated hosting artifact, intentionally ignored
```

Edit the language dictionaries for copy changes. Add new page templates to `views.mjs`, register routes in `scripts/build.mjs`, and supply metadata in both dictionaries. To add a language, add its dictionary to `locales` and add a language-switch link; SEO and sitemap generation iterate the locale registry.

## Brand and assets

Use **Rohlfing Labs**, with both words capitalized and a space, in written copy. The header and footer use the supplied gold artwork. The light theme pairs warm ivory with turquoise headings and service icons, charcoal text, and brass-gold buttons and details. Small gold text uses a darker shade for readability. Brand exports are:

- `brand/rohlfing-labs-logo-gold.png` — original supplied gold logotype. The site uses a cropped WebP export, `public/assets/rohlfing-labs-wordmark.webp`. The shared brand component lightens charcoal lettering in dark mode while preserving the gold.
- `public/assets/rohlfing-labs-logo.png` — retained turquoise logotype for earlier brand exports.
- `brand/rohlfing-labs-mark.png` — supplied symbol, trimmed and resized from the owner's original turquoise logo.
- `brand/rohlfing-labs-logo.svg` and `brand/rohlfing-labs-mark.svg` wrap these raster images; they are not newly traced vector artwork.
- `public/assets/favicon.svg` and `favicon.png` — matching browser icon.
- `brand/social-card.svg` — editable social artwork.
- `public/assets/social-card.png` — 1200 × 630 raster export for social platforms.

Files in `brand/` are sources. They are not deployed; only `public/` is.

Re-export the social PNG after editing its SVG. The service icons are original graphics. The homepage shows one featured project at a time in a slideshow of the four published projects. It rotates every 6.5 seconds, with pause, previous/next, and direct project controls. Motion stops for keyboard focus, hover, an offscreen carousel, or a background tab; reduced-motion preferences disable autoplay on load. Without JavaScript the first project stays visible and linked. References and implementation notes are in [docs/hero-slideshow.md](docs/hero-slideshow.md). Portfolio images are actual screenshots of public project pages, captured with the owner's permission. Their sources and capture details are recorded in `public/assets/projects/README.md`. No private dashboards or generated headshots are used.

The typography combines self-hosted Manrope, an italic system serif, and platform-appropriate Traditional Chinese fonts. Body text, navigation, controls, headings, and captions have dedicated responsive sizes; phone body copy is generally 16–18 pixels. Manrope is distributed under the SIL Open Font License in `public/assets/Manrope-OFL.txt`; source: [Google Fonts' Manrope family](https://github.com/google/fonts/tree/main/ofl/manrope). Chinese uses system fonts to avoid a large CJK download.

The dark theme uses charcoal surfaces, light text, turquoise accents, and gold buttons and details. The navigation's moon/sun button toggles themes. On phones, the theme toggle is inside the menu and the language switch is alongside it in the header. The initial theme follows `prefers-color-scheme`. Explicit choices are saved in the `rohlfing-theme` localStorage key, shared across languages and synchronized between tabs. Removing that key restores system following. `theme.js` applies a saved choice before styles load. System colors remain available without JavaScript, and printing uses the light palette.

## Content configuration

- The **contact email** defaults to `rohlfinglabs@gmail.com` in `site.config.mjs`. `CONTACT_EMAIL` can override it. The contact page opens a localized draft in the visitor's mail application. Visitors can also copy the address on browsers that support the Clipboard API. If `email` is set to `null`, the page displays a contact placeholder.
- **Founder photograph:** `public/assets/austin-rohlfing.webp` is the optimized, metadata-free export of Austin's supplied photograph, configured in `site.config.mjs`. The original composition is preserved; the export is approximately 61 KB.
- **Mission and principles:** the site is positioned on first-principles engineering and durable foundations ("First principles. Durable systems."). The home page's mission section (`mission` in each language file) states four principles: first principles, foundations built to last, verified not assumed, and clear to the end. These mirror the owner's engineering rules, and the About page says AI assists but judgment and verification stay with a person. Keep new copy consistent with them; the same tagline appears in the footer, structured data, and `brand/social-card.svg` / `public/assets/social-card.png`.
- **Engineering background:** Home and About use concise founder copy grounded in Austin's supplied April 2026 résumé: Databricks platform architecture and governance at VPP, and lead ETL development at Nationwide. The homepage's Fortune 100 credential links to the About page, which names Nationwide, gives Austin's exact role, and cites its No. 69 position on Fortune's **2026** Fortune 500. The ranking is explicitly dated and sourced to [Nationwide's June 3, 2026 announcement](https://news.nationwide.com/from-mutual-roots-to-a-modern-leader-nationwide-rises-to-no-69-on-fortune-500-list/). It is a Fortune ranking; it is not attributed to Forbes. Refresh the year/rank only after verification. The portfolio leads the site; there is no employer-logo strip or résumé-style organization list. The résumé and personal contact details are not published. Company experience is attributed to Austin, with no client endorsement implied.
- **Project content** lives in `src/content/projects.mjs`, including shared URLs, screenshot dimensions, technologies, and both language versions of each case study. Set `featured: true` to include a project on the homepage. The owner authorized these projects for portfolio use. The Taipei Archdiocese prototype is shown as a screenshot and case description because its live preview requires sign-in.
- **Business details:** No phone number, registered company status, client counts, certifications, prices, or results have been invented. Add verified details when appropriate.

Cake on Stick is included as a published bilingual small-business website, with an actual screenshot of its English homepage and copy checked against the public site and source repository. Four published projects are featured on the homepage; the Work page also includes the separately labeled Taipei prototype.

## Validation

`npm test` validates all generated HTML documents: unique titles and H1s, localized metadata, canonicals, language alternates, JSON-LD, sitemap entries, internal links and anchors, image alt attributes and dimensions, and asset budgets. See `VALIDATION.md` for browser validation.

Review the live site after deployment. Automated checks complement human review and do not certify accessibility or assess translation nuance.
