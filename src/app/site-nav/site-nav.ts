import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'nav[cc-site-nav]',
  imports: [RouterLink],
  templateUrl: './site-nav.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-label': 'Main' },
})
export class SiteNav {}
