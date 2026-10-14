// PROTOTYPE (throwaway): floating variant switcher. Also carries the variant stylesheet, so none of it ships to
// production (this component only renders in dev builds).
import { ChangeDetectionStrategy, Component, ViewEncapsulation, computed, inject } from '@angular/core';
import { PrototypeVariant, variants } from './variant';

@Component({
  selector: 'cc-prototype-switcher',
  template: `
    <button type="button" (click)="step(-1)" aria-label="Previous variant">←</button>
    <span class="proto-label">{{ label() }}</span>
    <button type="button" (click)="step(1)" aria-label="Next variant">→</button>
  `,
  styleUrl: './blackwater-variants.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'proto-switcher', '(document:keydown)': 'onKey($event)' },
})
export class PrototypeSwitcher {
  readonly #variant = inject(PrototypeVariant);
  readonly #index = computed(() => variants.findIndex((v) => v.key === this.#variant.current()));
  protected readonly label = computed(() => {
    const v = variants[this.#index()];
    return v.key ? `${v.key} · ${v.name}` : v.name;
  });

  protected step(by: number): void {
    const next = (this.#index() + by + variants.length) % variants.length;
    this.#variant.select(variants[next].key);
  }

  protected onKey(event: KeyboardEvent): void {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    const target = event.target as HTMLElement | null;
    if (target?.closest('input, textarea, select, [contenteditable]')) return;
    this.step(event.key === 'ArrowLeft' ? -1 : 1);
  }
}
