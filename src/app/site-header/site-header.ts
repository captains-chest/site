import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SiteNav } from '../site-nav/site-nav';
import { isSectionRoot, sectionOf } from './functions';

@Component({
  selector: 'header[cc-site-header]',
  imports: [SiteNav],
  templateUrl: './site-header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'topnav' },
})
export class SiteHeader {
  // Every link is a full page load, so the route is fixed for the lifetime of the page.
  readonly #pathname = inject(DOCUMENT).location.pathname;
  protected readonly section = sectionOf(this.#pathname);
  protected readonly isSectionRoot = isSectionRoot(this.#pathname);
}
