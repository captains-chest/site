import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  MsrCodeIconComponent,
  MsrExtensionIconComponent,
  MsrMenuBookIconComponent,
  MsrMicIconComponent,
  MsrSportsEsportsIconComponent,
} from '@captains-chest/material-symbols-rounded-icons';
import {
  angularNotes,
  employers,
  fullName,
  gitHub,
  handle,
  linkedIn,
  portrait,
  principles,
} from '../about/constants';
import { shipsPapers } from '../about/functions';
import { EmployerCard } from '../employer-card/employer-card';
import { NoteCard } from '../note-card/note-card';
import { PortLink } from '../port-link/port-link';
import { ShipsPapers } from '../ships-papers/ships-papers';

@Component({
  selector: 'cc-about-page',
  imports: [
    RouterLink,
    PortLink,
    NoteCard,
    EmployerCard,
    ShipsPapers,
    MsrCodeIconComponent,
    MsrExtensionIconComponent,
    MsrMenuBookIconComponent,
    MsrMicIconComponent,
    MsrSportsEsportsIconComponent,
  ],
  templateUrl: './about-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPage {
  protected readonly fullName = fullName;
  protected readonly handle = handle;
  protected readonly portrait = portrait;
  protected readonly linkedIn = linkedIn;
  protected readonly gitHub = gitHub;
  protected readonly principles = principles;
  protected readonly angularNotes = angularNotes;
  protected readonly employers = employers;
  /** Prerendered, so "years at sea" is as of the last build. */
  protected readonly papers = shipsPapers(employers, new Date());
}
