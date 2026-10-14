// PROTOTYPE (throwaway): what each variant adds to the bottom of the rail.
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { chest } from './chest';
import { ProtoIcon } from './icon';
import { PrototypeVariant } from './variant';

@Component({
  selector: 'cc-proto-rail-extras',
  imports: [ProtoIcon],
  template: `
    @switch (variant.current()) {
      @case ('A') {
        <div class="cr-shiplog">
          <img src="/prototype/chest.jpg" alt="" width="320" height="320" loading="lazy" />
          <p class="cr-shiplog-title">Ship's status</p>
          <p class="cr-shiplog-status"><span class="cr-dot"></span>All hands on deck</p>
          <p class="cr-shiplog-meta">Skills at <a [href]="chest.shaUrl"><code>{{ chest.shortSha }}</code></a></p>
        </div>
      }
      @case ('C') {
        <a class="btn primary cn-sail" [href]="chest.github"><cc-proto-icon name="ship" />Set sail on GitHub</a>
        <div class="cn-me">
          <img src="/prototype/captain.jpg" alt="" width="240" height="240" />
          <span><strong>CaptainDuckay</strong><small>&#64;captains-chest</small></span>
        </div>
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProtoRailExtras {
  protected readonly variant = inject(PrototypeVariant);
  protected readonly chest = chest;
}
