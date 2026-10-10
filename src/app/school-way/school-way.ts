import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SchoolCredits } from '../school-credits/school-credits';
import { schoolName } from '../school/constants';
import { tenets } from '../school/content';
import { PageMeta } from '../seo/page-meta';
import { TenetCard } from '../tenet-card/tenet-card';

@Component({
  selector: 'cc-school-way',
  imports: [TenetCard, SchoolCredits],
  templateUrl: './school-way.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchoolWay {
  protected readonly tenets = tenets;

  constructor() {
    inject(PageMeta).set({
      title: `The Way · ${schoolName}`,
      description: "Seven tenets of the Captain's Chest, each drawn from what its agent skills say.",
      path: '/school/way',
      breadcrumbs: [
        { name: "Captain's Chest", path: '/' },
        { name: 'School', path: '/school' },
        { name: 'The Way', path: '/school/way' },
      ],
    });
  }
}
