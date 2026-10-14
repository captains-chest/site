import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  MsrExploreIconComponent,
  MsrMenuBookIconComponent,
} from '@captains-chest/material-symbols-rounded-icons';
import { skillSummaries } from '../../content/generated/catalog';
import { SchoolCredits } from '../school-credits/school-credits';
import { tenets } from '../school/content';
import { TenetCard } from '../tenet-card/tenet-card';

@Component({
  selector: 'cc-school-home',
  imports: [
    RouterLink,
    TenetCard,
    SchoolCredits,
    MsrExploreIconComponent,
    MsrMenuBookIconComponent,
  ],
  templateUrl: './school-home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchoolHome {
  protected readonly tenets = tenets;
  protected readonly skillCount = skillSummaries.length;
}
