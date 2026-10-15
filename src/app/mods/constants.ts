import type { Mod } from './models';

export const mods: readonly Mod[] = [
  {
    slug: 'danish-voice-pack-wotc',
    name: 'Danish voice pack (WOTC)',
    game: 'XCOM 2: War of the Chosen',
    description:
      'Male Danish soldier voice for XCOM 2: War of the Chosen. 2026 rebuild: cleaned and loudness-matched takes, radio-comms processing, and fixes for Run And Gun and Enter Squad Concealment.',
    facts: ['Requires the War of the Chosen DLC', '139 events', '1,329 recordings'],
    url: 'https://steamcommunity.com/sharedfiles/filedetails/?id=1491590732',
    linkLabel: 'Steam Workshop',
    image: {
      src: '/mods/danish-voice-pack-256.webp',
      src2x: '/mods/danish-voice-pack-512.webp',
      width: 256,
      height: 256,
      alt: 'Action-poster style illustration: a bearded man in a navy suit and red tie fires a pistol, a rifle slung across his chest, in front of a large waving Danish flag. A snarling crocodile lunges at his feet amid flames, and a dark-haired woman in a black dress crouches against his leg.',
    },
  },
];
