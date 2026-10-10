import { siteOrigin } from './constants';
import type { Breadcrumb } from './models';

export const absoluteUrl = (path: string): string => `${siteOrigin}${path}`;

export const breadcrumbJsonLd = (breadcrumbs: readonly Breadcrumb[]): string =>
  JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  });
