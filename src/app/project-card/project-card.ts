import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { Project } from '../projects/models';

@Component({
  selector: 'article[cc-project-card]',
  imports: [RouterLink],
  templateUrl: './project-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'card', '[attr.aria-labelledby]': 'headingId()' },
})
export class ProjectCard {
  readonly project = input.required<Project>();
  protected readonly headingId = computed(() => `project-${this.project().slug}`);
}
