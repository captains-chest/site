import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import type { Project } from '../projects/models';

@Component({
  selector: 'article[cc-project-card]',
  templateUrl: './project-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'card', '[attr.aria-labelledby]': 'headingId()' },
})
export class ProjectCard {
  readonly project = input.required<Project>();
  protected readonly headingId = computed(() => `project-${this.project().slug}`);
}
