# Rohlfing Labs (rohlfinglabs.com): project rules

A static bilingual site (English at `/`, Traditional Chinese at `/zh-tw/`) built to `dist/` and published by GitHub Pages (`.github/workflows/deploy.yml`). DNS is on Cloudflare, DNS-only. `README.md` has the configuration and how to run it.

- There is no dev branch: a push to `main` builds and publishes the live site, so it needs the owner's yes.
- Before a push, run `npm run build && npm run check`.

## No Chinese technology

The owner's highest-priority rule; his shared rules hold the full text. Nothing of this project may be stored on, processed by or sent through a server in mainland China, Hong Kong or Macau, and no AI model, service, library or tool made, controlled or started by a company based there may be used, wherever it is hosted. Before adding a host, region, CDN, font, dependency, AI provider or data store, find out who makes it and where it runs, and say so.

The site has no data store, so there is no deploy guard. The audit is in `docs/no-chinese-servers.md`.
