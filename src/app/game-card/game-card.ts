import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import {
  MsrCodeIconComponent,
  MsrSportsEsportsIconComponent,
} from '@captains-chest/material-symbols-rounded-icons';
import type { Game } from '../games/models';

@Component({
  selector: 'article[cc-game-card]',
  imports: [MsrSportsEsportsIconComponent, MsrCodeIconComponent],
  templateUrl: './game-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'card', '[attr.aria-labelledby]': 'headingId()' },
})
export class GameCard {
  readonly game = input.required<Game>();
  protected readonly headingId = computed(() => `game-${this.game().slug}`);
}
