import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiteFooter } from './site-footer/site-footer';
import { SiteHeader } from './site-header/site-header';

const seaPreloads = [
  { href: '/blackwater-sea-narrow.avif', media: '(max-width: 800px)' },
  { href: '/blackwater-sea.avif', media: '(min-width: 801px)' },
];

@Component({
  selector: 'cc-root',
  imports: [RouterOutlet, SiteHeader, SiteFooter],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  readonly #document = inject(DOCUMENT);

  constructor() {
    // A head preload is what lets the browser start this image before the body, which is what makes it the LCP request.
    const head = this.#document.head;
    if (head.querySelector('link[data-sea]')) return;
    for (const sea of seaPreloads) {
      const link = this.#document.createElement('link');
      link.setAttribute('rel', 'preload');
      link.setAttribute('as', 'image');
      link.setAttribute('href', sea.href);
      link.setAttribute('type', 'image/avif');
      link.setAttribute('media', sea.media);
      link.setAttribute('fetchpriority', 'high');
      link.setAttribute('data-sea', '');
      head.appendChild(link);
    }
  }
}
