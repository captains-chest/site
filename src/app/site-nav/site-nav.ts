import { ChangeDetectionStrategy, Component } from '@angular/core';
import { type IsActiveMatchOptions, RouterLink, RouterLinkActive } from '@angular/router';
import {
  MsrMenuBookIconComponent,
  MsrSportsEsportsIconComponent,
} from '@captains-chest/material-symbols-rounded-icons';

/** A section link stays active on every page below it, e.g. School on /school/skills/<slug>. */
const sectionActive: IsActiveMatchOptions = {
  paths: 'subset',
  queryParams: 'ignored',
  matrixParams: 'ignored',
  fragment: 'ignored',
};

@Component({
  selector: 'nav[cc-site-nav]',
  imports: [RouterLink, RouterLinkActive, MsrSportsEsportsIconComponent, MsrMenuBookIconComponent],
  templateUrl: './site-nav.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-label': 'Main' },
})
export class SiteNav {
  protected readonly _sectionActive = sectionActive;
}
