import type { Game } from './models';

export const games: readonly Game[] = [
  {
    slug: 'minesweeper',
    name: 'Minesweeper',
    // From the game's CONTEXT.md.
    description:
      "Single-player minefield clearing: a live run on a board, plus the player's lasting record and preferences.",
    playUrl: 'https://minesweeper.captains-chest.com',
    sourceUrl: 'https://github.com/captains-chest/minesweeper',
    image: {
      src: '/play/minesweeper-256.webp',
      src2x: '/play/minesweeper-512.webp',
      width: 256,
      height: 256,
      alt: 'Minesweeper: a beginner board of unrevealed tiles with mines left and a timer above it.',
    },
  },
];
