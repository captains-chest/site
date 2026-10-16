import type { Software } from './models';

export const software: readonly Software[] = [
  {
    slug: 'dictator',
    name: 'Dictator',
    kind: 'macOS app',
    description:
      'Minimal, local-only dictation for macOS. Press a shortcut, talk, and the text is typed into whatever field has focus, transcribed on-device.',
    facts: [
      'Parakeet or Whisper speech models, run on-device',
      'macOS 15 or later on Apple silicon',
      'Companion apps for iOS and Android',
    ],
    primary: { label: 'Download', href: '/dictator' },
    secondary: { label: 'GitHub', href: 'https://github.com/captains-chest/yet-another-dictator' },
    image: {
      src: '/software/dictator-256.webp',
      src2x: '/software/dictator-512.webp',
      width: 256,
      height: 256,
      alt: 'The Dictator app icon.',
    },
  },
  {
    slug: 'floor-planner',
    name: 'Floor Planner',
    kind: 'Web app',
    description:
      'A browser floor-planning tool. Import a scanned or photographed plan, scale it from a known length, then place simple furniture.',
    facts: [
      'Stored locally in your browser',
      'Measure, group and rotate objects',
      'Export and import .floorplan.json projects',
    ],
    primary: { label: 'Open Floor Planner', href: 'https://floor-planner.captains-chest.com' },
    secondary: { label: 'GitHub', href: 'https://github.com/captains-chest/floor-planner' },
    image: {
      src: '/software/floor-planner-256.webp',
      src2x: '/software/floor-planner-512.webp',
      width: 256,
      height: 256,
      alt: 'Floor Planner in a browser: a dark grid canvas with a tool rail and a prompt to import a floor plan image.',
    },
  },
  {
    slug: 'material-symbols-rounded-icons',
    name: 'Material Symbols Rounded Icons',
    kind: 'Angular library',
    description:
      'Standalone Angular components for the 4,083 Material Symbols Rounded icons, in outline and filled packages. Import only the icons you use.',
    facts: [
      'One subpath import per icon',
      'Inline SVG, no icon font',
      'MIT licensed, published on npm',
    ],
    primary: { label: 'Browse icons', href: 'https://icons.captains-chest.com' },
    secondary: {
      label: 'npm',
      href: 'https://www.npmjs.com/package/@captains-chest/material-symbols-rounded-icons',
    },
    image: {
      src: '/software/material-symbols-rounded-icons-256.webp',
      src2x: '/software/material-symbols-rounded-icons-512.webp',
      width: 256,
      height: 256,
      alt: 'The icon catalog: a search box, outline and filled toggles, and a grid of icon tiles.',
    },
  },
];
