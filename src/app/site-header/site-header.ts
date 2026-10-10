import { ChangeDetectionStrategy, Component } from '@angular/core';
import { type IsActiveMatchOptions, RouterLink, RouterLinkActive } from '@angular/router';
import { SiteNav } from '../site-nav/site-nav';

const homeLinkActive: IsActiveMatchOptions = {
  paths: 'exact',
  queryParams: 'ignored',
  matrixParams: 'ignored',
  fragment: 'ignored',
};

@Component({
  selector: 'header[cc-site-header]',
  imports: [RouterLink, RouterLinkActive, SiteNav],
  templateUrl: './site-header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'topnav' },
})
export class SiteHeader {
  protected readonly _homeLinkActive = homeLinkActive;
}
