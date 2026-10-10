import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nav[cc-site-nav]',
  templateUrl: './site-nav.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'topnav', 'aria-label': "Captain's Chest" },
})
export class SiteNav {}
