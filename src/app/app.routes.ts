import type { ActivatedRouteSnapshot, ResolveFn, Routes } from '@angular/router';
import { skillLoaders } from '../content/generated/skill-loaders';
import { schoolName } from './school/constants';
import { displayName, skillPath } from './school/functions';
import type { Skill } from './school/models';
import { notFoundMeta, notFoundTitle, routeMetaKey, siteName } from './seo/constants';
import type { Breadcrumb, RouteMeta, RouteMetaSource } from './seo/models';

const loadSkill = async (route: ActivatedRouteSnapshot): Promise<Skill | null> =>
  (await skillLoaders[route.paramMap.get('slug') ?? '']?.()) ?? null;
const skillResolver: ResolveFn<Skill | null> = loadSkill;
// Title resolvers run alongside the data resolvers, so this loads the same (cached) skill chunk.
const skillTitle: ResolveFn<string> = async (route) => {
  const skill = await loadSkill(route);
  return skill ? `${displayName(skill.slug)} · ${schoolName}` : notFoundTitle;
};

const home: Breadcrumb = { name: siteName, path: '/' };
const school: Breadcrumb = { name: 'School', path: '/school' };
const dictator: Breadcrumb = { name: 'Dictator', path: '/dictator' };
const skills: Breadcrumb = { name: 'Skills', path: '/school/skills' };

const skillMeta = (data: { readonly skill?: Skill | null }): RouteMeta => {
  const skill = data.skill;
  if (!skill) return notFoundMeta;
  const path = skillPath(skill.slug);
  return {
    description: skill.purpose,
    path,
    breadcrumbs: [home, school, skills, { name: displayName(skill.slug), path }],
  };
};

const meta = (source: RouteMetaSource) => ({ [routeMetaKey]: source });

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home').then((m) => m.Home),
    title: siteName,
    data: meta({
      description: "Captain's Chest: small, focused open-source tools by CaptainDuckay.",
      path: '/',
    }),
  },
  {
    path: 'play',
    loadComponent: () => import('./play-page/play-page').then((m) => m.PlayPage),
    title: `Playground · ${siteName}`,
    data: meta({
      description: 'Browser games by CaptainDuckay.',
      path: '/play',
      breadcrumbs: [home, { name: 'Playground', path: '/play' }],
    }),
  },
  {
    path: 'mods',
    loadComponent: () => import('./mods-page/mods-page').then((m) => m.ModsPage),
    title: `Mods · ${siteName}`,
    data: meta({
      description:
        'Game mods by CaptainDuckay, starting with a Danish voice pack for XCOM 2: War of the Chosen.',
      path: '/mods',
      breadcrumbs: [home, { name: 'Mods', path: '/mods' }],
    }),
  },
  {
    path: 'school',
    loadComponent: () => import('./school-home/school-home').then((m) => m.SchoolHome),
    title: schoolName,
    data: meta({
      description:
        "The opinionated school of how Captain's Chest codes and works, written down as agent skills.",
      path: '/school',
      breadcrumbs: [home, school],
    }),
  },
  {
    path: 'school/way',
    loadComponent: () => import('./school-way/school-way').then((m) => m.SchoolWay),
    title: `The Way · ${schoolName}`,
    data: meta({
      description:
        "Seven tenets of the Captain's Chest, each drawn from what its agent skills say.",
      path: '/school/way',
      breadcrumbs: [home, school, { name: 'The Way', path: '/school/way' }],
    }),
  },
  {
    path: 'school/skills',
    loadComponent: () => import('./school-skills/school-skills').then((m) => m.SchoolSkills),
    title: `Skills · ${schoolName}`,
    data: meta({
      description: "The agent skills of the Captain's Chest, each teaching one part of its way.",
      path: '/school/skills',
      breadcrumbs: [home, school, skills],
    }),
  },
  {
    path: 'school/skills/:slug',
    resolve: { skill: skillResolver },
    loadComponent: () => import('./school-skill/school-skill').then((m) => m.SchoolSkill),
    title: skillTitle,
    data: meta(skillMeta),
  },
  {
    path: 'dictator',
    loadComponent: () => import('./dictator-page/dictator-page').then((m) => m.DictatorPage),
    title: `Dictator: offline dictation for macOS · ${siteName}`,
    data: meta({
      description:
        'Minimal, local-only dictation for macOS. Transcription runs on-device with Whisper.',
      path: '/dictator',
      breadcrumbs: [home, dictator],
    }),
  },
  {
    path: 'dictator/privacy',
    loadComponent: () =>
      import('./dictator-privacy/dictator-privacy').then((m) => m.DictatorPrivacy),
    title: `Dictator privacy policy · ${siteName}`,
    data: meta({
      description:
        'Dictator for Android and iOS collects no data. Speech recognition runs on-device; on Android the only network use is a one-time model download you start.',
      path: '/dictator/privacy',
      breadcrumbs: [home, dictator, { name: 'Dictator privacy policy', path: '/dictator/privacy' }],
    }),
  },
  {
    path: '**',
    loadComponent: () => import('./not-found/not-found').then((m) => m.NotFound),
    title: notFoundTitle,
    data: meta(notFoundMeta),
  },
];
