import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import type { Employer } from '../about/models';
import { PositionEntry } from '../position-entry/position-entry';

@Component({
  selector: 'article[cc-employer-card]',
  imports: [PositionEntry],
  templateUrl: './employer-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'card voyage', '[attr.aria-labelledby]': 'headingId()' },
})
export class EmployerCard {
  readonly employer = input.required<Employer>();
  protected readonly headingId = computed(() => `employer-${this.employer().slug}`);
}
