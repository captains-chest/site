import { inject } from '@angular/core';
import type { ResolveFn, Routes } from '@angular/router';
import { skillLoaders } from '../content/generated/skill-loaders';
import type { Skill } from './school/models';
import { Home } from './home/home';

const skillResolver: ResolveFn<Skill | null> = (route) => skillLoaders[route.paramMap.get('slug') ?? '']?.() ?? null;

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'play', loadComponent: () => import('./play-page/play-page').then((m) => m.PlayPage) },
  { path: 'school', loadComponent: () => import('./school-home/school-home').then((m) => m.SchoolHome) },
  { path: 'school/way', loadComponent: () => import('./school-way/school-way').then((m) => m.SchoolWay) },
  { path: 'school/skills', loadComponent: () => import('./school-skills/school-skills').then((m) => m.SchoolSkills) },
  {
    path: 'school/skills/:slug',
    resolve: { skill: skillResolver },
    loadComponent: () => import('./school-skill/school-skill').then((m) => m.SchoolSkill),
  },
  { path: '**', loadComponent: () => import('./not-found/not-found').then((m) => m.NotFound) },
];
