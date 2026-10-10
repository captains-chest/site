import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { displayName, skillPath } from '../school/functions';
import type { SkillSummary } from '../school/models';

@Component({
  selector: 'article[cc-skill-card]',
  imports: [RouterLink],
  templateUrl: './skill-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'card', '[attr.aria-labelledby]': 'headingId()' },
})
export class SkillCard {
  readonly skill = input.required<SkillSummary>();
  protected readonly headingId = computed(() => `skill-${this.skill().slug}`);
  protected readonly title = computed(() => displayName(this.skill().slug));
  protected readonly path = computed(() => skillPath(this.skill().slug));
}
