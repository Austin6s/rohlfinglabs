# Website validation

## Bilingual usability and performance audit — November 18, 2026

- Checked all 10 localized pages at 320, 390, 768, 1024, and 1440 pixels in light and dark mode. Chromium found no horizontal overflow, broken visible images, or JavaScript errors. axe-core detected no violations under the audited WCAG and best-practice tags across 40 checks.
- Verified keyboard and short-screen menu navigation, equivalent-page language switching, slideshow focus and rotation, reduced motion, case-study deep links, the clipboard action and its fallback, and navigation with JavaScript disabled.
- Verified the four live portfolio destinations and the Nationwide ranking source. The Taipei Archdiocese preview redirects to sign-in, so both Work pages show it as a restricted prototype with a screenshot and description.
- Reduced the wordmark from 359 KB to 47 KB and the stylesheet from 48 KB to 23 KB. Project images use responsive WebP exports with the original JPEG fallback.
- `npm test` passes for 11 documents and 425 local links and assets, including the default domain and a test build under a site subdirectory.

Earlier entries are in git history: `git log -p VALIDATION.md`.
