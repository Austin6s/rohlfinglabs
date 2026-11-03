# Website validation

## Supplied identity, founder photograph, and professional background — November 3, 2026

- Integrated Austin's supplied turquoise logotype and symbol, including matching favicon and social artwork. Updated the light theme to turquoise, charcoal, and pale teal throughout the interface and engineering diagram.
- Added the supplied headshot to both localized Home and About pages. WebP export preserves the original composition, removes source metadata, and is approximately 61 KB. The photo placeholder is no longer displayed.
- Added six former employers as Austin's personal professional background, separate from project work. Four official-source logos are locally hosted with provenance recorded in `public/assets/organizations/README.md`; TernBooking and Rumble Roundnet use text. No job titles, dates, endorsements, or employer-specific contributions were invented.
- `npm test` passes for 11 documents and 337 local links/assets, including bilingual metadata, structured data, canonicals, sitemap, image attributes, and asset budgets. No dependencies or deployment infrastructure changed.
- Chromium checks pass for all 10 routes at 320, 390, 768, 1024, and 1440 pixels. All images decode successfully, with no horizontal overflow or JavaScript page errors. axe-core detected no violations at 390 and 1440 pixels under the existing WCAG/best-practice rule set.
- Verified mobile menu, keyboard skip link, equivalent-page language switching, no-JavaScript navigation, contact links, and the optional Cloudflare CSP. Visually reviewed the supplied assets, social card, homepage, and employer-logo section on desktop and phone.
- CakeonStick remains excluded because its local repository is empty and no public project materials are available. The Taipei Archdiocese entry retains its prototype status. These notes supersede the earlier founder-photograph placeholder notes below.

## Positioning and portfolio refinement — November 3, 2026

- Production build and `npm test` pass: 11 HTML documents, 295 local links/assets, localized metadata, structured data, sitemap, image dimensions/alt text, and asset budgets.
- All 10 English and Traditional Chinese routes checked in Chromium at 320, 390, 768, 1024, and 1440 pixels. No horizontal overflow or JavaScript page errors after correcting the narrow-screen project heading.
- All project images loaded and decoded successfully. Reviewed actual project captures and the rendered homepage/Work layouts on desktop and phone.
- axe-core 4.11.0 reports no detected violations for all 10 pages at 390 and 1440 pixels under WCAG 2 A/AA, WCAG 2.1 AA, and best-practice tags.
- Verified mobile navigation, Escape behavior, equivalent-page language switching, navigation without JavaScript, keyboard skip link, and nested 404 handling.
- Verified both localized contact links point to `rohlfinglabs@gmail.com` with encoded subjects and multiline prompts, including at 320 pixels. No messages were sent.
- All four portfolio destinations returned HTTP 200. BudgetAnywhere uses its public welcome page screenshot; private financial data and CMS accounts were not accessed. The Taipei Archdiocese project is explicitly a public prototype in both languages.
- Cloudflare MCP confirms the existing DNS-only GitHub Pages A/AAAA records and `www` CNAME. GitHub confirms the Actions publishing source, `rohlfinglabs.com` custom domain, and HTTPS enforcement. Deployment configuration is unchanged.
- No application dependencies or backend services were added. Portfolio captures total approximately 500 KB and load lazily with reserved dimensions.
- Remaining asset: Austin's photograph. Its existing monogram is explicitly labeled as a placeholder. A future BudgetAnywhere dashboard capture should use shareable demonstration data; the current image is its real public welcome screen.
- Published commit `273ddc7` through [GitHub Actions run 41590623840](https://github.com/Austin6s/rohlfinglabs/actions/runs/41590623840), with successful build and deployment. Live HTTPS checks passed for all 10 localized routes, 11 assets including all four project captures, the real 404 response, and the `www` 301 redirect preserving the path. The production browser also verified all three featured projects, four Chinese case studies, image decoding, localized prototype status, and bilingual contact navigation.

## Initial implementation validation

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
