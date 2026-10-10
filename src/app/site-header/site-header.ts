import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SiteNav } from '../site-nav/site-nav';

const homePath = '/';

@Component({
  selector: 'header[cc-site-header]',
  imports: [SiteNav],
  templateUrl: './site-header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'topnav' },
})
export class SiteHeader {
  // Every link is a full page load, so the route is fixed for the lifetime of the page.
  protected readonly isHome = inject(DOCUMENT).location.pathname === homePath;
}
