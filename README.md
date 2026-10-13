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
- Routes: `/`, `/play` (games), `/school` (intro), `/school/way` (tenets), `/school/skills` (catalog) and
  `/school/skills/<slug>`, all prerendered (skill slugs via `getPrerenderParams`). The Worker 301-redirects the
  old school.captains-chest.com subdomain to `/school`.
- `public/`: robots.txt, llms.txt, web manifest, favicons and the OG image (generated from `assets-src/`).

## School content (the skills fetch)

`pnpm build` first runs `scripts/generate-skills.mjs`, which:

1. shallow-clones `https://github.com/captains-chest/skills` (main) into `content/skills` (untracked; no token
   needed, the repo is public). Set `SKILLS_DIR=/path/to/skills` to use a local checkout instead;
2. reads every root folder that has a `SKILL.md` (front matter `name` = folder name, plus `description`) and its
   supporting `.md` files;
3. writes `src/content/generated/` (untracked): a catalog, one lazily loaded module per skill, the sitemap, and
   `/school/version.json` with the skills commit sha (also shown in the School credits line);
4. fails the build if `src/content/tenets.json` or `src/content/skill-notes.json` cites a skill that doesn't exist.

A new skill in captains-chest/skills appears on captains-chest.com/school after the next site build and deploy.
Tenets and curated principles are editorial content in this repo (`src/content/`).

## Develop, build and deploy (web upkeep)

Requires Node 22+ and pnpm.

    pnpm install --frozen-lockfile
    pnpm start                 # dev server
    pnpm run preview           # build, then run the Worker locally on http://localhost:8787
    pnpm run deploy            # build, then wrangler deploy (needs CLOUDFLARE_API_TOKEN + CLOUDFLARE_ACCOUNT_ID)

The old Cloudflare Pages project `captains-chest-site` is no longer attached to any domain; don't deploy to it.
CI (`.github/workflows/ci.yml`) builds, validates the HTML, runs axe and the Lighthouse budgets (`lighthouserc.*.json`) against a local Worker preview. Deploys stay manual (`pnpm run deploy`).
