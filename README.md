# captains-chest.com

The Captain's Chest landing page: Angular 22 (standalone, zoneless, signals, strict TypeScript) with SSR on
Cloudflare's edge. Content routes are prerendered at build time and served as static assets; everything else
(the 404 page, future dynamic pages) is rendered on demand by the Worker.

## How it works

- `src/app/app.routes.server.ts`: `''` is `RenderMode.Prerender`, `**` is `RenderMode.Server`.
- `src/server.ts` is the Worker: it redirects www to the apex (301), returns 404 for `*.md`, serves static assets,
  falls back to `AngularAppEngine` for SSR, and sets Cache-Control, security headers and a per-request CSP nonce
  (pages are built with `ngCspNonce="__CSP_NONCE__"`, and the Worker swaps in a fresh nonce).
- `wrangler.jsonc`: Worker `captains-chest-site` with static assets from `dist/site/browser`, custom domains
  captains-chest.com and www.captains-chest.com.
- Hydration: full hydration with incremental hydration and event replay; the project cards are a
  `@defer (on viewport; hydrate on viewport)` block.
- `public/`: robots.txt, sitemap.xml, llms.txt, web manifest, favicons and the OG image (generated from
  `assets-src/`).

## Develop, build and deploy (web upkeep)

Requires Node 22+ and pnpm.

    pnpm install --frozen-lockfile
    pnpm start                 # dev server
    pnpm run preview           # build, then run the Worker locally on http://localhost:8787
    pnpm run deploy            # build, then wrangler deploy (needs CLOUDFLARE_API_TOKEN + CLOUDFLARE_ACCOUNT_ID)

The old Cloudflare Pages project `captains-chest-site` is no longer attached to any domain; don't deploy to it.
Proposed CI (build, Lighthouse budget, deploy) lives in `docs/ci/` until workflows can be pushed.
