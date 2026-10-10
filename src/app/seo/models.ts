import type { Data } from '@angular/router';

export interface Breadcrumb {
  readonly name: string;
  readonly path: string;
}

/** Everything a page says about itself in the head, apart from the title (the route's `title`). */
export interface RouteMeta {
  readonly description: string;
  /** The canonical path; pages that shouldn't be indexed (404s) have none. */
  readonly path?: string;
  readonly breadcrumbs?: readonly Breadcrumb[];
  readonly noindex?: boolean;
}

export interface PageMetadata extends RouteMeta {
  readonly title: string;
}

/** Static meta, or meta built from the route's resolved data (e.g. a skill). */
export type RouteMetaSource = RouteMeta | ((data: Data) => RouteMeta);
