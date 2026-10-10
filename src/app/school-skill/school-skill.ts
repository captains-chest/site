import { ChangeDetectionStrategy, Component, computed, effect, inject, input, RESPONSE_INIT } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SchoolCredits } from '../school-credits/school-credits';
import { notes, tenets } from '../school/content';
import { displayName, principlesOf, tenetsCiting } from '../school/functions';
import type { Skill } from '../school/models';
import { SkillDocs } from '../skill-docs/skill-docs';

const notFoundStatus = 404;

@Component({
  selector: 'cc-school-skill',
  imports: [RouterLink, SkillDocs, SchoolCredits],
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

  constructor() {
    const responseInit = inject(RESPONSE_INIT, { optional: true });
    effect(() => {
      if (!this.skill() && responseInit) responseInit.status = notFoundStatus;
    });
  }
}
