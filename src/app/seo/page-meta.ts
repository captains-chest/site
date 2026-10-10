import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { breadcrumbsScriptId, ogImage, siteName } from './constants';
import { absoluteUrl, breadcrumbJsonLd } from './functions';
import type { PageMetadata } from './models';

/** Writes the per-page title, description, canonical, Open Graph/Twitter tags and breadcrumb JSON-LD. */
@Injectable({ providedIn: 'root' })
export class PageMeta {
  readonly #document = inject(DOCUMENT);
  readonly #meta = inject(Meta);
  readonly #title = inject(Title);

  set(page: PageMetadata): void {
    const url = absoluteUrl(page.path);
    this.#title.setTitle(page.title);
    this.#meta.updateTag({ name: 'description', content: page.description });
    this.#meta.updateTag({ property: 'og:title', content: page.title });
    this.#meta.updateTag({ property: 'og:description', content: page.description });
    this.#meta.updateTag({ property: 'og:url', content: url });
    this.#meta.updateTag({ property: 'og:image', content: ogImage });
    this.#meta.updateTag({ property: 'og:site_name', content: siteName });
    this.#meta.updateTag({ name: 'twitter:title', content: page.title });
    this.#meta.updateTag({ name: 'twitter:description', content: page.description });
    this.#setCanonical(url);
    this.#setBreadcrumbs(page.breadcrumbs);
  }

  #setCanonical(url: string): void {
    const head = this.#document.head;
    const link = head.querySelector<HTMLLinkElement>('link[rel="canonical"]') ?? head.appendChild(this.#document.createElement('link'));
    link.rel = 'canonical';
    link.href = url;
  }

  #setBreadcrumbs(breadcrumbs: PageMetadata['breadcrumbs']): void {
    this.#document.getElementById(breadcrumbsScriptId)?.remove();
    if (!breadcrumbs?.length) return;
    const script = this.#document.createElement('script');
    script.id = breadcrumbsScriptId;
    script.type = 'application/ld+json';
    script.textContent = breadcrumbJsonLd(breadcrumbs);
    this.#document.head.appendChild(script);
  }
}
