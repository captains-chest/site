import { ChangeDetectionStrategy, Component, inject, RESPONSE_INIT } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

const notFoundStatus = 404;

@Component({
  selector: 'cc-not-found',
  templateUrl: './not-found.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFound {
  constructor() {
    const responseInit = inject(RESPONSE_INIT, { optional: true });
    if (responseInit) {
      responseInit.status = notFoundStatus;
    }
    inject(Title).setTitle("Page not found · Captain's Chest");
    inject(Meta).updateTag({ name: 'robots', content: 'noindex' });
  }
}
