import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { Software } from '../software/models';

@Component({
  selector: 'article[cc-software-card]',
  imports: [RouterLink],
  templateUrl: './software-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'card mod-card', '[attr.aria-labelledby]': 'headingId()' },
})
export class SoftwareCard {
  readonly software = input.required<Software>();
  readonly priority = input(false);
  protected readonly headingId = computed(() => `software-${this.software().slug}`);
}
