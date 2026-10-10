import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { skillSummaries } from '../../content/generated/catalog';
import { SchoolCredits } from '../school-credits/school-credits';
import { schoolName } from '../school/constants';
import { tenets } from '../school/content';
import { PageMeta } from '../seo/page-meta';
import { TenetCard } from '../tenet-card/tenet-card';

@Component({
  selector: 'cc-school-home',
  imports: [TenetCard, SchoolCredits],
  templateUrl: './school-home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchoolHome {
  protected readonly tenets = tenets;
  protected readonly skillCount = skillSummaries.length;

  constructor() {
    inject(PageMeta).set({
      title: schoolName,
      description: "The opinionated school of how Captain's Chest codes and works, written down as agent skills.",
      path: '/school',
      breadcrumbs: [
        { name: "Captain's Chest", path: '/' },
        { name: 'School', path: '/school' },
      ],
    });
  }
}
