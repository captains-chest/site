import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageMeta } from '../seo/page-meta';

/** Sections whose pages carry no GitHub links at all, the footer's included. */
const noGitHubSections = ['/mods'];

@Component({
  selector: 'footer[cc-site-footer]',
  imports: [RouterLink],
  templateUrl: './site-footer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteFooter {
  readonly #path = inject(PageMeta).path;
  /** Rendered at build time for prerendered pages, at request time for SSR pages. */
  protected readonly year = new Date().getFullYear();
  protected readonly showGitHub = computed(() => {
    const path = this.#path() ?? '';
    return !noGitHubSections.some((section) => path === section || path.startsWith(`${section}/`));
  });
}
