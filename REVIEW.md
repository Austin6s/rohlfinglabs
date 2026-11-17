# Concise design — adopted for production

The concise design and the subsequent gold/turquoise experiment were consolidated into `rohlfinglabs` on `main` on November 17, 2026. The separate `rohlfinglabs-concise` worktree is no longer needed. Its commits remain in this repository's history.

Run from `/home/austin/projects/repos/rohlfinglabs`:

```bash
npm run dev
```

Open <http://127.0.0.1:4321/> or <http://127.0.0.1:4321/zh-tw/>. Set `PORT=4322` to use the previous review URL. Production is <https://rohlfinglabs.com/> after the `main` deployment completes.

The concise homepage concentrates on services, selected work, and the founder. Interior pages are shorter too. The adopted hybrid palette combines gold header/footer logos, brass buttons and details, warm ivory surfaces, and the existing turquoise headings and illustrations. Dark mode retains the gold and lightens the logo's charcoal lettering. Both languages, project screenshots, founder photograph, and Fortune 100 credential are retained.

Approximate English word counts within the main content, excluding navigation and footer:

| Page | Current site | Concise design |
| --- | ---: | ---: |
| Home | 463 | 181 |
| Services | 577 | 196 |
| Work | 351 | 215 |
| About | 355 | 154 |
| Contact | 127 | 61 |
| Total | 1,873 | 807 |

The Chinese homepage decreased from 936 to 416 Han characters using the same content boundary. These are comparison measures, not reading-time estimates.

Original concise review validation (before the gold experiment): `npm test` passes for 11 documents and 334 local links/assets. Chromium checked all 10 localized routes at 320, 390, 768, 1024, and 1440 pixels in both themes: 100 combinations, no horizontal overflow, no JavaScript errors, and no detected axe-core WCAG/best-practice violations at the audited desktop and phone sizes. Theme persistence, system preference changes, storage restrictions, keyboard switching, cross-tab updates, no-JavaScript navigation, and print colors passed.

Original review screenshots are preserved in the ignored `artifacts/concise-review/` directory. The adoption uses the existing GitHub Pages deployment without new dependencies or hosting services.
