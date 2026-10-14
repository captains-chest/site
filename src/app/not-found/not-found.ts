import { ChangeDetectionStrategy, Component, inject, RESPONSE_INIT } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MsrAnchorIconComponent } from '@captains-chest/material-symbols-rounded-icons';

const notFoundStatus = 404;

@Component({
  selector: 'cc-not-found',
  imports: [RouterLink, MsrAnchorIconComponent],
  templateUrl: './not-found.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFound {
  constructor() {
    const responseInit = inject(RESPONSE_INIT, { optional: true });
    if (responseInit) {
      responseInit.status = notFoundStatus;
    }
  }
}
