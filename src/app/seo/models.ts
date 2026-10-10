export interface Breadcrumb {
  readonly name: string;
  readonly path: string;
}

export interface PageMetadata {
  readonly title: string;
  readonly description: string;
  readonly path: string;
  readonly breadcrumbs?: readonly Breadcrumb[];
}
