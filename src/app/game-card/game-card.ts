import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import type { Game } from '../games/models';

@Component({
  selector: 'article[cc-game-card]',
  templateUrl: './game-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'card', '[attr.aria-labelledby]': 'headingId()' },
})
export class GameCard {
  readonly game = input.required<Game>();
  protected readonly headingId = computed(() => `game-${this.game().slug}`);
}
