import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GameCard } from '../game-card/game-card';
import { games } from '../games/constants';
import { PageMeta } from '../seo/page-meta';

@Component({
  selector: 'cc-play-page',
  imports: [GameCard],
  templateUrl: './play-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayPage {
  protected readonly games = games;

  constructor() {
    inject(PageMeta).set({
      title: "Playground · Captain's Chest",
      description: 'Browser games by Nicki Skipper Otte.',
      path: '/play',
      breadcrumbs: [
        { name: "Captain's Chest", path: '/' },
        { name: 'Playground', path: '/play' },
      ],
    });
  }
}
