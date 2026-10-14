// PROTOTYPE (throwaway): a handful of line icons for the Blackwater variants.
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

const paths = {
  anchor: 'M12 3.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4M12 7.5V21M8 11h8M4.5 13.5a7.5 7.5 0 0 0 15 0M3 15l1.5-1.5L6 15M18 15l1.5-1.5L21 15',
  skull: 'M12 3a7 7 0 0 0-7 7c0 2.3 1.1 4 2.5 5v3h9v-3c1.4-1 2.5-2.7 2.5-5a7 7 0 0 0-7-7M9.2 10.3h.1M14.7 10.3h.1M12 13l-1 1.5h2zM10 18v2M14 18v2',
  compass: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18M15.5 8.5l-2 5-5 2 2-5z',
  wheel: 'M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12M12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4M12 2v8M12 14v8M2 12h8M14 12h8M5 5l5.6 5.6M13.4 13.4 19 19M19 5l-5.6 5.6M10.6 13.4 5 19',
  book: 'M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5zM4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8',
  chest: 'M3 11h18v9H3zM3 11a9 4.5 0 0 1 18 0M10.5 13.5h3v3h-3zM3 15h7.5M13.5 15H21',
  coin: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10M12 9.5v5',
  code: 'm8.5 7.5-5 4.5 5 4.5M15.5 7.5l5 4.5-5 4.5M13.5 5l-3 14',
  scroll: 'M7 4h11a2 2 0 0 1 2 2v1h-4M7 4a2 2 0 0 0-2 2v12a2 2 0 0 1-2 2h11a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2M8 9h5M8 13h5',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  ship: 'M3 16h18l-2.5 4h-13zM12 3v13M12 4l6 9h-6M12 6l-5 7h5',
  flag: 'M5 21V4M5 4h12l-2.5 4L17 12H5',
} as const;

export type IconName = keyof typeof paths;

@Component({
  selector: 'cc-proto-icon',
  template: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path [attr.d]="d()" /></svg>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'proto-icon' },
})
export class ProtoIcon {
  readonly name = input.required<IconName>();
  protected readonly d = computed(() => paths[this.name()]);
}
