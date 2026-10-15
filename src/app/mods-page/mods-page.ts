import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModCard } from '../mod-card/mod-card';
import { mods } from '../mods/constants';

@Component({
  selector: 'cc-mods-page',
  imports: [ModCard],
  templateUrl: './mods-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModsPage {
  protected readonly mods = mods;
}
