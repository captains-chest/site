import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SchoolCredits } from '../school-credits/school-credits';
import { tenets } from '../school/content';
import { TenetCard } from '../tenet-card/tenet-card';

@Component({
  selector: 'cc-school-way',
  imports: [RouterLink, TenetCard, SchoolCredits],
  templateUrl: './school-way.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchoolWay {
  protected readonly tenets = tenets;
}
