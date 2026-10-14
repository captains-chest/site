// PROTOTYPE (throwaway): A · Chart Room home. A dashboard in the admin-panel reference: banner, stat tiles, a
// projects panel and a ship's log.
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { chest } from './chest';
import { ProtoIcon } from './icon';

@Component({
  selector: 'cc-home-chart-room',
  imports: [RouterLink, ProtoIcon],
  template: `
    <header class="poster">
      <p class="eyebrow">Overview</p>
      <h1>Small, focused tools, built with care.</h1>
      <p class="lead">Captain's Chest is a home for open-source projects by CaptainDuckay.</p>
    </header>
    <ul class="cr-stats" aria-label="The chest at a glance">
      <li><cc-proto-icon name="chest" /><span>Projects</span><strong>{{ chest.projects.length }}</strong><small>Open source, MIT</small></li>
      <li><cc-proto-icon name="wheel" /><span>Games</span><strong>{{ chest.games.length }}</strong><small>Free in the browser</small></li>
      <li><cc-proto-icon name="scroll" /><span>Skills</span><strong>{{ chest.skills.length }}</strong><small>Agent skills, taught</small></li>
      <li><cc-proto-icon name="compass" /><span>Tenets</span><strong>{{ chest.tenets.length }}</strong><small>The Way, written down</small></li>
    </ul>
    <div class="cr-board">
      <section class="cr-panel" aria-labelledby="projects-heading">
        <h2 id="projects-heading">Projects</h2>
        <ul class="cr-projects">
          @for (project of chest.projects; track project.slug; let i = $index) {
            <li>
              <span class="cr-medal"><cc-proto-icon [name]="i === 0 ? 'coin' : 'anchor'" /></span>
              <div>
                <h3>{{ project.name }}</h3>
                <p>{{ project.description }}</p>
                <div class="links">
                  @if (project.primary.href.startsWith('/')) {
                    <a class="btn primary" [routerLink]="project.primary.href"><cc-proto-icon name="anchor" />{{ project.primary.label }}</a>
                  } @else {
                    <a class="btn primary" [href]="project.primary.href"><cc-proto-icon name="anchor" />{{ project.primary.label }}</a>
                  }
                  <a class="btn" [href]="project.sourceUrl"><cc-proto-icon name="code" />GitHub</a>
                </div>
              </div>
            </li>
          }
        </ul>
      </section>
      <section class="cr-panel" aria-labelledby="log-heading">
        <h2 id="log-heading">Ship's log</h2>
        <ol class="cr-log">
          @for (game of chest.games; track game.slug) {
            <li>
              <span class="cr-avatar"><cc-proto-icon name="wheel" /></span>
              <span><a [href]="game.playUrl">{{ game.name }}</a><small>Docked in the Playground</small></span>
            </li>
          }
          @for (skill of chest.skills; track skill.slug) {
            <li>
              <span class="cr-avatar"><cc-proto-icon name="scroll" /></span>
              <span><a [routerLink]="skill.path">{{ skill.title }}</a><small>Taught in the School</small></span>
            </li>
          }
          <li>
            <span class="cr-avatar"><cc-proto-icon name="skull" /></span>
            <span>Skills synced at <a [href]="chest.shaUrl"><code>{{ chest.shortSha }}</code></a><small>From captains-chest/skills</small></span>
          </li>
        </ol>
        <a class="cr-more" routerLink="/school">Read the School <cc-proto-icon name="arrow" /></a>
      </section>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeChartRoom {
  protected readonly chest = chest;
}
