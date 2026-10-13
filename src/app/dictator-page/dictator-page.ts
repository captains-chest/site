import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'cc-dictator-page',
  imports: [RouterLink],
  templateUrl: './dictator-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DictatorPage {}
