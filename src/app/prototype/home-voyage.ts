// PROTOTYPE (throwaway): B · Voyage home. The painting is the whole first screen; the projects are wooden bounty
// plaques in a single column below it.
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { chest } from './chest';
import { ProtoIcon } from './icon';

@Component({
  selector: 'cc-home-voyage',
  imports: [RouterLink, ProtoIcon],
  template: `
    <header class="vy-hero">
      <p class="eyebrow">Captain's Chest · Open seas</p>
      <h1>Small, focused tools, <span>built with care.</span></h1>
      <p class="lead">A home for open-source projects by CaptainDuckay.</p>
      <p class="links">
        <a class="btn primary big" routerLink="/" fragment="loot" queryParamsHandling="preserve"><cc-proto-icon name="chest" />See the loot</a>
        <a class="btn big" routerLink="/play"><cc-proto-icon name="wheel" />Enter the Playground</a>
      </p>
    </header>
    <section id="loot" class="vy-loot" aria-labelledby="projects-heading">
      <h2 id="projects-heading" class="vy-title">The loot</h2>
      <ol class="plain-list">
        @for (project of chest.projects; track project.slug; let i = $index) {
          <li class="vy-bounty">
            <span class="vy-no" aria-hidden="true">No. {{ i + 1 }}</span>
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
      </ol>
    </section>
    <section class="vy-ports" aria-labelledby="ports-heading">
      <h2 id="ports-heading" class="vy-title">Ports of call</h2>
      <div class="vy-port-row">
        <a class="vy-port" routerLink="/play">
          <cc-proto-icon name="wheel" />
          <strong>The Playground</strong>
          <span>{{ chest.games.length }} game, free in the browser</span>
        </a>
        <a class="vy-port" routerLink="/school">
          <cc-proto-icon name="book" />
          <strong>The School</strong>
          <span>{{ chest.tenets.length }} tenets, {{ chest.skills.length }} skills</span>
        </a>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeVoyage {
  protected readonly chest = chest;
}
