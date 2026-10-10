import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProjectCard } from '../project-card/project-card';
import { projects } from '../projects/constants';

@Component({
  selector: 'cc-home',
  imports: [ProjectCard],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  protected readonly projects = projects;
}
