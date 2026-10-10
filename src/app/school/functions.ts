import type { Skill, SkillNotes, Tenet } from './models';

export const displayName = (slug: string): string =>
  slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

export const tenetsCiting = (tenets: readonly Tenet[], slug: string): readonly Tenet[] =>
  tenets.filter((tenet) => tenet.sources.includes(slug));

/** Curated principles when written, otherwise the section headings of the skill's documents. */
export const principlesOf = (skill: Skill, notes: Readonly<Record<string, SkillNotes>>): readonly string[] =>
  notes[skill.slug]?.principles ?? skill.docs.flatMap((doc) => doc.sections);

export const skillPath = (slug: string): string => `/school/skills/${slug}`;
export const tenetPath = (slug: string): string => `/school/way#${slug}`;
