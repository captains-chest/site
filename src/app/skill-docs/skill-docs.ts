import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { SkillDoc } from '../school/models';

@Component({
  selector: 'section[cc-skill-docs]',
  templateUrl: './skill-docs.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-labelledby': 'docs-heading' },
})
export class SkillDocs {
  readonly docs = input.required<readonly SkillDoc[]>();
}
