import { inject, Injectable } from '@angular/core';
import {
  type ActivatedRouteSnapshot,
  type RouterStateSnapshot,
  TitleStrategy,
} from '@angular/router';
import { notFoundMeta, routeMetaKey, siteName } from './constants';
import type { RouteMeta, RouteMetaSource } from './models';
import { PageMeta } from './page-meta';

const deepest = (route: ActivatedRouteSnapshot): ActivatedRouteSnapshot =>
  route.firstChild ? deepest(route.firstChild) : route;

const metaOf = (route: ActivatedRouteSnapshot): RouteMeta => {
  const source = route.data[routeMetaKey] as RouteMetaSource | undefined;
  if (source === undefined) return notFoundMeta;
  return typeof source === 'function' ? source(route.data) : source;
};

/** Writes the route's `title` and its `data.meta` on every navigation, so no page has to set or reset them. */
@Injectable()
export class PageTitleStrategy extends TitleStrategy {
  readonly #pageMeta = inject(PageMeta);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    this.#pageMeta.set({
      title: this.buildTitle(snapshot) ?? siteName,
      ...metaOf(deepest(snapshot.root)),
    });
  }
}
