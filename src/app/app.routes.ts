import type { ActivatedRouteSnapshot, ResolveFn, Routes } from '@angular/router';
import { skillLoaders } from '../content/generated/skill-loaders';
import { schoolName } from './school/constants';
import { displayName, skillPath } from './school/functions';
import type { Skill } from './school/models';
import { Home } from './home/home';
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
    component: Home,
    title: siteName,
    data: meta({ description: "Captain's Chest: small, focused open-source tools by Nicki Skipper Otte.", path: '/' }),
  },
  {
    path: 'play',
    loadComponent: () => import('./play-page/play-page').then((m) => m.PlayPage),
    title: `Playground · ${siteName}`,
    data: meta({
      description: 'Browser games by Nicki Skipper Otte.',
      path: '/play',
      breadcrumbs: [home, { name: 'Playground', path: '/play' }],
    }),
  },
  {
    path: 'school',
    loadComponent: () => import('./school-home/school-home').then((m) => m.SchoolHome),
    title: schoolName,
    data: meta({
      description: "The opinionated school of how Captain's Chest codes and works, written down as agent skills.",
      path: '/school',
      breadcrumbs: [home, school],
    }),
  },
  {
    path: 'school/way',
    loadComponent: () => import('./school-way/school-way').then((m) => m.SchoolWay),
    title: `The Way · ${schoolName}`,
    data: meta({
      description: "Seven tenets of the Captain's Chest, each drawn from what its agent skills say.",
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
    path: 'dictator/privacy',
    loadComponent: () => import('./dictator-privacy/dictator-privacy').then((m) => m.DictatorPrivacy),
    title: `Dictator privacy policy · ${siteName}`,
    data: meta({
      description: 'Dictator for Android and iOS collects no data: dictation runs offline, on the device.',
      path: '/dictator/privacy',
      breadcrumbs: [home, { name: 'Dictator privacy policy', path: '/dictator/privacy' }],
    }),
  },
  {
    path: '**',
    loadComponent: () => import('./not-found/not-found').then((m) => m.NotFound),
    title: notFoundTitle,
    data: meta(notFoundMeta),
  },
];
