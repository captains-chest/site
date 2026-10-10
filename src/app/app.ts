import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiteNav } from './site-nav/site-nav';

@Component({
  selector: 'cc-root',
  imports: [RouterOutlet, SiteNav],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
