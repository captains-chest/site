import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import type { Mod } from '../mods/models';

@Component({
  selector: 'article[cc-mod-card]',
  templateUrl: './mod-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'card mod-card', '[attr.aria-labelledby]': 'headingId()' },
})
export class ModCard {
  readonly mod = input.required<Mod>();
  readonly priority = input(false);
  protected readonly headingId = computed(() => `mod-${this.mod().slug}`);
}
