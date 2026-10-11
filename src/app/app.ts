import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiteFooter } from './site-footer/site-footer';
import { SiteHeader } from './site-header/site-header';

const seaUrl = '/blackwater-sea.avif';

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
    if (head.querySelector(`link[rel="preload"][href="${seaUrl}"]`)) return;
    const link = this.#document.createElement('link');
    link.setAttribute('rel', 'preload');
    link.setAttribute('as', 'image');
    link.setAttribute('href', seaUrl);
    link.setAttribute('type', 'image/avif');
    link.setAttribute('fetchpriority', 'high');
    head.appendChild(link);
  }
}
