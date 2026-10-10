import type { Game } from './models';

export const games: readonly Game[] = [
  {
    slug: 'minesweeper',
    name: 'Minesweeper',
    // From the game's CONTEXT.md.
    description: "Single-player minefield clearing: a live run on a board, plus the player's lasting record and preferences.",
    playUrl: 'https://minesweeper.play.captains-chest.com',
    sourceUrl: 'https://github.com/captains-chest/minesweeper',
  },
];
