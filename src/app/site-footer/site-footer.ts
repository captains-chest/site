import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'footer[cc-site-footer]',
  imports: [RouterLink],
  templateUrl: './site-footer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteFooter {
  /** Rendered at build time for prerendered pages, at request time for SSR pages. */
  protected readonly year = new Date().getFullYear();
}
