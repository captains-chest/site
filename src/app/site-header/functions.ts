import type { Section } from './models';

const sectionRoots: Readonly<Record<string, Section>> = { '/': 'home', '/play': 'play', '/school': 'school' };

const normalise = (pathname: string): string => (pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname);

export const sectionOf = (pathname: string): Section => {
  const path = normalise(pathname);
  if (path === '/') return 'home';
  const [, first] = path.split('/');
  return sectionRoots[`/${first}`] ?? 'other';
};

export const isSectionRoot = (pathname: string): boolean => normalise(pathname) in sectionRoots;
