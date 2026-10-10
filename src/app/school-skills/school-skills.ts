import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { skillSummaries } from '../../content/generated/catalog';
import { SchoolCredits } from '../school-credits/school-credits';
import { schoolName } from '../school/constants';
import { PageMeta } from '../seo/page-meta';
import { SkillCard } from '../skill-card/skill-card';

@Component({
  selector: 'cc-school-skills',
  imports: [SkillCard, SchoolCredits],
  templateUrl: './school-skills.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchoolSkills {
  protected readonly skills = skillSummaries;

  constructor() {
    inject(PageMeta).set({
      title: `Skills · ${schoolName}`,
      description: "The agent skills of the Captain's Chest, each teaching one part of its way.",
      path: '/school/skills',
      breadcrumbs: [
        { name: "Captain's Chest", path: '/' },
        { name: 'School', path: '/school' },
        { name: 'Skills', path: '/school/skills' },
      ],
    });
  }
}
