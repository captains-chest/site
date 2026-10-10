import skillNotes from '../../content/skill-notes.json';
import tenetData from '../../content/tenets.json';
import type { SkillNotes, Tenet } from './models';

export const notes: Readonly<Record<string, SkillNotes>> = skillNotes;
export const tenets: readonly Tenet[] = tenetData;
