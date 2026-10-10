import { ChangeDetectionStrategy, Component } from '@angular/core';
import { skillsSource } from '../../content/generated/catalog';
import { credits } from '../school/constants';

@Component({
  selector: 'p[cc-school-credits]',
  templateUrl: './school-credits.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'credits' },
})
export class SchoolCredits {
  protected readonly credits = credits;
  protected readonly source = skillsSource;
  protected readonly shortSha = skillsSource.sha.slice(0, 7);
}
