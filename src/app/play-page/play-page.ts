import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GameCard } from '../game-card/game-card';
import { games } from '../games/constants';

@Component({
  selector: 'cc-play-page',
  imports: [GameCard],
  templateUrl: './play-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayPage {
  protected readonly games = games;
}
