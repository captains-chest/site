import { RenderMode, type ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Content routes are prerendered at build time and served as static assets.
  { path: '', renderMode: RenderMode.Prerender },
  // Everything else is rendered on demand by the Worker (the 404 page, future dynamic pages).
  { path: '**', renderMode: RenderMode.Server },
];
