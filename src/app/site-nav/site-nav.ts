import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nav[cc-site-nav]',
  templateUrl: './site-nav.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-label': 'Main' },
})
export class SiteNav {}
