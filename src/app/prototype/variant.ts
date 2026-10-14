// PROTOTYPE (throwaway): three Blackwater directions for the whole site, switchable via `?variant=A|B|C` on every
// route. No param is today's site. Dev builds only; a production build always renders today's site.
import { Injectable, inject, isDevMode, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

export type VariantKey = 'A' | 'B' | 'C';

export const variants: readonly { readonly key: VariantKey | null; readonly name: string }[] = [
  { key: null, name: 'Today' },
  { key: 'A', name: 'Chart Room' },
  { key: 'B', name: 'Voyage' },
  { key: 'C', name: "Crow's Nest" },
];

const isKey = (value: string | null): value is VariantKey => value === 'A' || value === 'B' || value === 'C';

@Injectable({ providedIn: 'root' })
export class PrototypeVariant {
  readonly #router = inject(Router);
  readonly enabled = isDevMode();
  readonly current = signal<VariantKey | null>(null);

  constructor() {
    if (!this.enabled) return;
    this.#router.events.subscribe((event) => {
      if (!(event instanceof NavigationEnd)) return;
      const fromUrl = this.#router.parseUrl(event.urlAfterRedirects).queryParamMap.get('variant');
      if (isKey(fromUrl)) this.current.set(fromUrl);
      // In-app links drop the param; put it back so a reload or a shared link keeps the variant.
      else if (this.current()) this.#writeUrl(this.current());
    });
  }

  select(key: VariantKey | null): void {
    this.current.set(key);
    this.#writeUrl(key);
  }

  #writeUrl(key: VariantKey | null): void {
    const tree = this.#router.parseUrl(this.#router.url);
    const { variant: _, ...rest } = tree.queryParams;
    tree.queryParams = key ? { ...rest, variant: key } : rest;
    void this.#router.navigateByUrl(tree, { replaceUrl: true });
  }
}
