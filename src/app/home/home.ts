import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProjectCard } from '../project-card/project-card';
import { projects } from '../projects/constants';
import { PageMeta } from '../seo/page-meta';

@Component({
  selector: 'cc-home',
  imports: [ProjectCard],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  protected readonly projects = projects;

  constructor() {
    inject(PageMeta).set({
      title: "Captain's Chest",
      description: "Captain's Chest: small, focused open-source tools by Nicki Skipper Otte.",
      path: '/',
    });
  }
}
