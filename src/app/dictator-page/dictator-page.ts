import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MsrDownloadIconComponent } from '@captains-chest/material-symbols-rounded-icons';

@Component({
  selector: 'cc-dictator-page',
  imports: [RouterLink, MsrDownloadIconComponent],
  templateUrl: './dictator-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DictatorPage {}
