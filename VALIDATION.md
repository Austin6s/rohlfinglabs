# Initial implementation validation

Validated locally on November 3, 2026. The initial checks were repeated after the branding, typography, contact, and production-domain update. Live deployment verification is recorded separately below.

- `npm test`: passed for the default GitHub Pages project URL and for a custom-domain root URL with a configured contact address. The generated-artifact check covers 11 HTML documents and 273 internal links/assets.
- Chromium browser: all 10 localized pages loaded successfully at viewport widths of 320, 390, 768, 1024, and 1440 pixels. No horizontal overflow in the 50 page/width combinations.
- axe-core 4.11.0: no detected violations across all 10 pages at 390 and 1440 pixels, using WCAG 2 A/AA, WCAG 2.1 AA, and best-practice rule tags after contrast and landmark fixes.
- No JavaScript page errors were detected during the browser pass.
- Mobile navigation opens and closes, Escape returns focus to the menu control, and language switching retains the equivalent interior page. Navigation remains available with JavaScript disabled.
- The keyboard skip link focuses the main content.
- Configured email links in both languages include properly encoded subjects and multiline prompts, fit at 320 pixels, and do not require a backend. No email was sent during verification.
- The Cloudflare Content Security Policy was applied during a browser check: local assets and menu behavior worked without console or page errors.
- Unknown nested URLs return a real 404 response in the preview server. The 404 document uses deployment-base-aware links and assets.
- Homepage screenshots were inspected in English and Traditional Chinese at desktop and phone sizes. Temporary screenshots and audit output are in ignored `artifacts/` in the working checkout.

The automated local checks complement human review; they do not certify accessibility or assess translation nuance. Production deployment and HTTPS were verified separately as recorded below. The founder photograph remains an explicitly labeled placeholder.

## Branding and domain update

- Capitalized Rohlfing Labs wordmark, redesigned RL badge, matching favicon, standalone SVG logo assets, and refreshed social image.
- Larger body copy, navigation, headings, controls, and captions; tablet navigation switches to the accessible compact menu.
- Public contact configured as rohlfinglabs@gmail.com.
- Production canonical URL configured as https://rohlfinglabs.com/.
- Repeated browser checks: 50 page/viewport combinations, no overflow or JavaScript errors, and no detected accessibility violations at the audited desktop and phone sizes.
- Cloudflare DNS and GitHub Pages custom-domain configuration were read back after setup.

## Verified production deployment

Verified November 3, 2026:

- Source commit: `ae59d7f568112820059e3be4e2991f1ca952ee6e`.
- [GitHub Actions build and deployment](https://github.com/Austin6s/rohlfinglabs/actions/runs/41583077573) completed successfully.
- Production site: **https://rohlfinglabs.com/**.
- GitHub's certificate is approved for both `rohlfinglabs.com` and `www.rohlfinglabs.com`; HTTPS enforcement is enabled.
- All 10 localized production pages returned HTTP 200 over verified HTTPS. Their canonical URLs, capitalized wordmarks, language attributes, and public contact links matched the intended configuration.
- CSS, JavaScript, local font, favicon, social image, sitemap, and robots all returned HTTP 200.
- An unknown nested URL returned the custom HTTP 404 page.
- HTTP redirects to HTTPS, and `www` redirects to the apex hostname while preserving the requested path.
- A live Chromium check passed for the desktop homepage and the mobile Chinese contact page, including the real email address, equivalent-page language switching, no horizontal overflow, and no JavaScript errors.
- No TLS verification was disabled during the successful HTTPS checks.
