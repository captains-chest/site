import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** A signpost to one of the site's sections; the icon is projected. */
@Component({
  selector: 'a[cc-port-link]',
  templateUrl: './port-link.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'card port' },
})
export class PortLink {
  readonly name = input.required<string>();
  readonly detail = input.required<string>();
}
