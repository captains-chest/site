import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MsrAnchorIconComponent } from '@captains-chest/material-symbols-rounded-icons/anchor';
import { MsrExtensionIconComponent } from '@captains-chest/material-symbols-rounded-icons/extension';
import { MsrMenuBookIconComponent } from '@captains-chest/material-symbols-rounded-icons/menu-book';
import { MsrSailingIconComponent } from '@captains-chest/material-symbols-rounded-icons/sailing';
import { MsrSportsEsportsIconComponent } from '@captains-chest/material-symbols-rounded-icons/sports-esports';
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
    MsrSailingIconComponent,
    MsrAnchorIconComponent,
  ],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  protected readonly _projects = projects;
}
