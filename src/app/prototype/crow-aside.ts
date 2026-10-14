// PROTOTYPE (throwaway): Crow's Nest (C) right-hand column, shown on every page.
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { chest } from './chest';

@Component({
  selector: 'aside[cc-proto-crow-aside]',
  imports: [RouterLink],
  template: `
    <section class="cn-panel cn-profile" aria-labelledby="cn-profile-name">
      <div class="cn-profile-banner"></div>
      <img class="cn-avatar" src="/prototype/captain.jpg" alt="" width="240" height="240" />
      <h2 id="cn-profile-name">CaptainDuckay</h2>
      <p class="cn-handle">&#64;captains-chest</p>
      <p>Small, focused open-source tools. Fair winds, tidy code.</p>
      <p class="cn-counts">
        <span><strong>{{ chest.projects.length }}</strong> projects</span>
        <span><strong>{{ chest.games.length }}</strong> game</span>
        <span><strong>{{ chest.skills.length }}</strong> skills</span>
      </p>
    </section>
    <section class="cn-panel" aria-labelledby="cn-way">
      <h2 id="cn-way">The Way</h2>
      <ol class="cn-trending">
        @for (tenet of chest.tenets.slice(0, 4); track tenet.slug; let i = $index) {
          <li>
            <a routerLink="/school/way" [fragment]="tenet.slug">
              <small>Tenet {{ i + 1 }}</small>
              <span>{{ tenet.title }}</span>
            </a>
          </li>
        }
      </ol>
      <a class="cn-more" routerLink="/school/way">All {{ chest.tenets.length }} tenets</a>
    </section>
    <section class="cn-panel" aria-labelledby="cn-ports">
      <h2 id="cn-ports">Ports of call</h2>
      <ul class="cn-ports">
        <li><span><strong>Playground</strong><small>Browser games</small></span><a class="btn" routerLink="/play">Visit</a></li>
        <li><span><strong>School</strong><small>How we code</small></span><a class="btn" routerLink="/school">Visit</a></li>
        <li><span><strong>GitHub</strong><small>captains-chest</small></span><a class="btn" [href]="chest.github">Visit</a></li>
      </ul>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'cn-aside', 'aria-label': 'About the captain' },
})
export class ProtoCrowAside {
  protected readonly chest = chest;
}
