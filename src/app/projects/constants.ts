import type { Project } from './models';

export const projects: readonly Project[] = [
  {
    slug: 'material-symbols-rounded-icons',
    name: 'Material Symbols Rounded Icons',
    description:
      'Publishable Angular standalone component libraries for Material Symbols Rounded icons, in outline and filled variants, with a Storybook catalog.',
    primary: { label: 'Browse icons', href: 'https://icons.captains-chest.com' },
    sourceUrl: 'https://github.com/captains-chest/material-symbols-rounded-icons',
  },
  {
    slug: 'dictator',
    name: 'Dictator',
    description:
      'Minimal, local-only dictation for macOS. Press a shortcut, talk, and the text is typed into whatever field has focus, transcribed on-device.',
    primary: { label: 'Download', href: '/dictator' },
    sourceUrl: 'https://github.com/captains-chest/yet-another-dictator',
  },
];
