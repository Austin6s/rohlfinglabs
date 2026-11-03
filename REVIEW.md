# Concise design — local review

This checkout is the `design/concise` branch in a separate local worktree. The original checkout at `../rohlfinglabs` remains on `main` at `2b6fca2`; the production website is unchanged. This branch has not been pushed or deployed.

Open <http://localhost:4322/> or <http://localhost:4322/zh-tw/> while the local preview is running. To restart it:

```bash
cd /home/austin/projects/repos/rohlfinglabs-concise
PORT=4322 npm run dev
```

Compare with <https://rohlfinglabs.com/>. This is an alternative for review; adopting it is a separate decision.

The palette, typography, logo, diagram, real screenshots, founder photograph, Fortune 100 credential, bilingual routes, and saved dark-mode behavior are retained. The homepage now concentrates on services, selected work, and the founder. Repeated process explanations and lengthy illustrative scenarios are removed, and interior pages are shorter too.

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

Validation: `npm test` passes for 11 documents and 334 local links/assets. Chromium checked all 10 localized routes at 320, 390, 768, 1024, and 1440 pixels in both themes: 100 combinations, no horizontal overflow, no JavaScript errors, and no detected axe-core WCAG/best-practice violations at the audited desktop and phone sizes. Theme persistence, system preference changes, storage restrictions, keyboard switching, cross-tab updates, no-JavaScript navigation, and print colors passed.

Screenshots are in the ignored `artifacts/` directory. No dependencies, domain records, hosting configuration, or production source files were changed.
