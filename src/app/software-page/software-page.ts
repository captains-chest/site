import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SoftwareCard } from '../software-card/software-card';
import { software } from '../software/constants';

@Component({
  selector: 'cc-software-page',
  imports: [SoftwareCard],
  templateUrl: './software-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SoftwarePage {
  protected readonly software = software;
}
