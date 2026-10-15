import { flag, handle, homeWaters } from './constants';
import type { Employer, PaperEntry, Position } from './models';

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const;
const monthsPerYear = 12;

const parseYearMonth = (yearMonth: string): { readonly year: number; readonly month: number } => {
  const [year, month] = yearMonth.split('-').map(Number);
  return { year, month };
};

/** `2025-08` → `Aug 2025`. Fixed English names, so prerendering never depends on the build machine's locale. */
export const formatYearMonth = (yearMonth: string): string => {
  const { year, month } = parseYearMonth(yearMonth);
  return `${monthNames[month - 1]} ${year}`;
};

export const wholeYearsSince = (yearMonth: string, now: Date): number => {
  const { year, month } = parseYearMonth(yearMonth);
  const months = (now.getFullYear() - year) * monthsPerYear + (now.getMonth() + 1 - month);
  return Math.floor(months / monthsPerYear);
};

export const isCurrent = (position: Position): boolean => position.end === undefined;

export const isSitePath = (href: string): boolean => href.startsWith('/');

const allPositions = (employers: readonly Employer[]): readonly Position[] =>
  employers.flatMap((employer) => employer.positions);

export const shipsPapers = (employers: readonly Employer[], now: Date): readonly PaperEntry[] => {
  const current = employers.find((employer) => employer.positions.some(isCurrent));
  const firstStart = allPositions(employers)
    .map((position) => position.start)
    .reduce((earliest, start) => (start < earliest ? start : earliest));
  return [
    { label: 'Rank', value: current?.positions.find(isCurrent)?.title ?? 'Developer' },
    { label: 'Ship', value: current?.company ?? 'Between ships' },
    { label: 'Flag', value: flag },
    { label: 'Home waters', value: homeWaters },
    {
      label: 'At sea since',
      value: `${formatYearMonth(firstStart)} (${wholeYearsSince(firstStart, now)} years)`,
    },
    { label: 'Sails as', value: handle },
  ];
};
