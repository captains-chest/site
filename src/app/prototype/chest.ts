// PROTOTYPE (throwaway): the numbers and lists the Blackwater variants show.
import { skillSummaries, skillsSource } from '../../content/generated/catalog';
import { games } from '../games/constants';
import { projects } from '../projects/constants';
import { tenets } from '../school/content';
import { displayName, skillPath } from '../school/functions';

export const chest = {
  projects,
  games,
  tenets,
  skills: skillSummaries.map((s) => ({ ...s, title: displayName(s.slug), path: skillPath(s.slug) })),
  shortSha: skillsSource.sha.slice(0, 7),
  shaUrl: `${skillsSource.repoUrl}/commit/${skillsSource.sha}`,
  github: 'https://github.com/captains-chest',
} as const;
