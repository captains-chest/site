import { ChangeDetectionStrategy, Component, ElementRef, inject } from '@angular/core';
import { type IsActiveMatchOptions, RouterLink, RouterLinkActive } from '@angular/router';
import { MsrAnchorIconComponent } from '@captains-chest/material-symbols-rounded-icons/anchor';
import { MsrCloseIconComponent } from '@captains-chest/material-symbols-rounded-icons/close';
import { MsrExtensionIconComponent } from '@captains-chest/material-symbols-rounded-icons/extension';
import { MsrMenuBookIconComponent } from '@captains-chest/material-symbols-rounded-icons/menu-book';
import { MsrSportsEsportsIconComponent } from '@captains-chest/material-symbols-rounded-icons/sports-esports';

/** A section link stays active on every page below it, e.g. School on /school/skills/<slug>. */
const sectionActive: IsActiveMatchOptions = {
  paths: 'subset',
  queryParams: 'ignored',
  matrixParams: 'ignored',
  fragment: 'ignored',
};

@Component({
  selector: 'nav[cc-site-nav]',
  imports: [
    RouterLink,
    RouterLinkActive,
    MsrSportsEsportsIconComponent,
    MsrExtensionIconComponent,
    MsrMenuBookIconComponent,
    MsrAnchorIconComponent,
    MsrCloseIconComponent,
  ],
  templateUrl: './site-nav.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // On small screens the nav is a sidebar popover, opened by the header's menu button.
  host: { 'aria-label': 'Main', id: 'site-nav', popover: '', '(click)': '_closeOnLink($event)' },
})
export class SiteNav {
  readonly #host = inject<ElementRef<HTMLElement>>(ElementRef);
  protected readonly _sectionActive = sectionActive;

  protected _closeOnLink(event: Event): void {
    const nav = this.#host.nativeElement;
    if (
      event.target instanceof Element &&
      event.target.closest('a') &&
      nav.matches(':popover-open')
    )
      nav.hidePopover();
  }
}
