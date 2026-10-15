import { PrerenderFallback, RenderMode, type ServerRoute } from '@angular/ssr';
import { skillSummaries } from '../content/generated/catalog';

export const serverRoutes: ServerRoute[] = [
  // Content routes are prerendered at build time and served as static assets.
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'play', renderMode: RenderMode.Prerender },
  { path: 'mods', renderMode: RenderMode.Prerender },
  { path: 'dictator', renderMode: RenderMode.Prerender },
  { path: 'dictator/privacy', renderMode: RenderMode.Prerender },
  { path: 'school', renderMode: RenderMode.Prerender },
  { path: 'school/way', renderMode: RenderMode.Prerender },
  { path: 'school/skills', renderMode: RenderMode.Prerender },
  {
    path: 'school/skills/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => skillSummaries.map(({ slug }) => ({ slug })),
    // Unknown slugs are rendered by the Worker, which answers with the 404 page.
    fallback: PrerenderFallback.Server,
  },
  // Everything else is rendered on demand by the Worker (the 404 page, future dynamic pages).
  { path: '**', renderMode: RenderMode.Server },
];
