import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { displayName, skillPath } from '../school/functions';
import type { Tenet } from '../school/models';

@Component({
  selector: 'article[cc-tenet-card]',
  imports: [RouterLink],
  templateUrl: './tenet-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'card', '[id]': 'tenet().slug', '[attr.aria-labelledby]': "tenet().slug + '-title'" },
})
export class TenetCard {
  readonly tenet = input.required<Tenet>();
  readonly number = input.required<number>();
  protected readonly displayName = displayName;
  protected readonly skillPath = skillPath;
}
