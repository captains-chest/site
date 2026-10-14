import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  MsrAnchorIconComponent,
  MsrCodeIconComponent,
} from '@captains-chest/material-symbols-rounded-icons';
import type { Project } from '../projects/models';

@Component({
  selector: 'article[cc-project-card]',
  imports: [RouterLink, MsrAnchorIconComponent, MsrCodeIconComponent],
  templateUrl: './project-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'card bounty', '[attr.aria-labelledby]': 'headingId()' },
})
export class ProjectCard {
  readonly project = input.required<Project>();
  /** The project's place in the chest, shown on its coin. */
  readonly number = input.required<number>();
  protected readonly headingId = computed(() => `project-${this.project().slug}`);
}
