# No Chinese servers: Rohlfing Labs (audit of 2026-11-07)

**Verdict:** nothing of this site is stored or processed in China. There is no backend, form,
analytics, third-party script or web font: the code references no outside host but links.

| Part | Where it runs | Evidence | Status |
|---|---|---|---|
| Hosting | GitHub Pages (Fastly CDN) | `server: GitHub.com`; from HiNet in Keelung, `x-served-by: cache-sin-…` (Singapore) | Fine. Fastly also has a Hong Kong location, and GitHub's routing can't be measured from this account |
| DNS | Cloudflare, records DNS-only | Zone rohlfinglabs.com: four A and four AAAA records to GitHub, `www` CNAME `austin6s.github.io`, none proxied | Fine; Cloudflare doesn't serve the site |
| Data stores, AI, analytics | None | Code search | Fine |

**Deploy guard:** none needed; the site has no data store. The rule is in `CLAUDE.md`.
**Decision (optional):** none required. If you ever want the edge ruled out rather than just
unmeasured, GitHub Pages can't be pinned to a region.
