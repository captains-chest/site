import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { formatYearMonth, isCurrent } from '../about/functions';
import type { Position } from '../about/models';

@Component({
  selector: 'li[cc-position-entry]',
  templateUrl: './position-entry.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'position' },
})
export class PositionEntry {
  readonly position = input.required<Position>();
  protected readonly current = computed(() => isCurrent(this.position()));
  protected readonly formatYearMonth = formatYearMonth;
}
