import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  MsrExtensionIconComponent,
  MsrMenuBookIconComponent,
  MsrMicIconComponent,
  MsrSportsEsportsIconComponent,
} from '@captains-chest/material-symbols-rounded-icons';
import { PortLink } from '../port-link/port-link';
import { ProjectCard } from '../project-card/project-card';
import { projects } from '../projects/constants';

@Component({
  selector: 'cc-home',
  imports: [
    RouterLink,
    ProjectCard,
    PortLink,
    MsrSportsEsportsIconComponent,
    MsrMenuBookIconComponent,
    MsrExtensionIconComponent,
    MsrMicIconComponent,
  ],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  protected readonly _projects = projects;
}
