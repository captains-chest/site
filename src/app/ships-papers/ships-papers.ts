import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { PaperEntry } from '../about/models';

@Component({
  selector: 'dl[cc-ships-papers]',
  templateUrl: './ships-papers.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'papers' },
})
export class ShipsPapers {
  readonly entries = input.required<readonly PaperEntry[]>();
}
