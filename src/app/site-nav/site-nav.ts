import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { Section } from '../site-header/models';

@Component({
  selector: 'nav[cc-site-nav]',
  templateUrl: './site-nav.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-label': 'Main' },
})
export class SiteNav {
  readonly section = input.required<Section>();
  readonly isSectionRoot = input.required<boolean>();
}
