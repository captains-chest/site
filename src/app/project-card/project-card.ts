import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { Project } from '../projects/models';

@Component({
  selector: 'li[cc-project-card]',
  templateUrl: './project-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'card' },
})
export class ProjectCard {
  readonly project = input.required<Project>();
}
