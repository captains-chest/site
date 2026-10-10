import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { skillSummaries } from '../../content/generated/catalog';
import { SchoolCredits } from '../school-credits/school-credits';
import { SkillCard } from '../skill-card/skill-card';

@Component({
  selector: 'cc-school-skills',
  imports: [RouterLink, SkillCard, SchoolCredits],
  templateUrl: './school-skills.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchoolSkills {
  protected readonly skills = skillSummaries;
}
