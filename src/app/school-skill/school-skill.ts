import { ChangeDetectionStrategy, Component, computed, effect, inject, input, RESPONSE_INIT } from '@angular/core';
import { SchoolCredits } from '../school-credits/school-credits';
import { schoolName } from '../school/constants';
import { notes, tenets } from '../school/content';
import { displayName, principlesOf, skillPath, tenetPath, tenetsCiting } from '../school/functions';
import type { Skill } from '../school/models';
import { PageMeta } from '../seo/page-meta';
import { SkillDocs } from '../skill-docs/skill-docs';

const notFoundStatus = 404;

@Component({
  selector: 'cc-school-skill',
  imports: [SkillDocs, SchoolCredits],
  templateUrl: './school-skill.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchoolSkill {
  /** Bound from the route resolver; null when the slug isn't a skill. */
  readonly skill = input.required<Skill | null>();
  protected readonly title = computed(() => {
    const skill = this.skill();
    return skill ? displayName(skill.slug) : 'Skill not found';
  });
  protected readonly principles = computed(() => {
    const skill = this.skill();
    return skill ? principlesOf(skill, notes) : [];
  });
  protected readonly tenets = computed(() => {
    const skill = this.skill();
    return skill ? tenetsCiting(tenets, skill.slug) : [];
  });
  protected readonly tenetPath = tenetPath;

  constructor() {
    const pageMeta = inject(PageMeta);
    const responseInit = inject(RESPONSE_INIT, { optional: true });
    effect(() => {
      const skill = this.skill();
      if (!skill) {
        if (responseInit) responseInit.status = notFoundStatus;
        return;
      }
      pageMeta.set({
        title: `${displayName(skill.slug)} · ${schoolName}`,
        description: skill.purpose,
        path: skillPath(skill.slug),
        breadcrumbs: [
          { name: "Captain's Chest", path: '/' },
          { name: 'School', path: '/school' },
          { name: 'Skills', path: '/school/skills' },
          { name: displayName(skill.slug), path: skillPath(skill.slug) },
        ],
      });
    });
  }
}
