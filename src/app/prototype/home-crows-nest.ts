// PROTOTYPE (throwaway): C · Crow's Nest home. Everything in the chest as one logbook feed, with a pinned intro.
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { chest } from './chest';
import { ProtoIcon } from './icon';

@Component({
  selector: 'cc-home-crows-nest',
  imports: [RouterLink, ProtoIcon],
  template: `
    <p class="cn-bar" aria-hidden="true">Logbook</p>
    <header class="cn-entry cn-pinned">
      <img class="cn-face" src="/prototype/captain.jpg" alt="" width="240" height="240" />
      <div>
        <p class="cn-meta"><strong>CaptainDuckay</strong> &#64;captains-chest · <cc-proto-icon name="flag" /> Pinned</p>
        <h1>Small, focused tools, built with care.</h1>
        <p class="lead">Captain's Chest is a home for open-source projects by CaptainDuckay.</p>
        <div class="cn-media" aria-hidden="true"></div>
      </div>
    </header>
    <section aria-labelledby="projects-heading">
      <h2 id="projects-heading" class="sr-only">Projects, games and skills</h2>
      @for (project of chest.projects; track project.slug; let i = $index) {
        <article class="cn-entry" [attr.aria-labelledby]="'cn-' + project.slug">
          <span class="cn-face cn-medal"><cc-proto-icon [name]="i === 0 ? 'coin' : 'anchor'" /></span>
          <div>
            <p class="cn-meta"><strong [id]="'cn-' + project.slug">{{ project.name }}</strong> · Project</p>
            <p>{{ project.description }}</p>
            <div class="cn-actions">
              @if (project.primary.href.startsWith('/')) {
                <a class="btn primary" [routerLink]="project.primary.href">{{ project.primary.label }}</a>
              } @else {
                <a class="btn primary" [href]="project.primary.href">{{ project.primary.label }}</a>
              }
              <a class="cn-act" [href]="project.sourceUrl"><cc-proto-icon name="code" />Source</a>
            </div>
          </div>
        </article>
      }
      @for (game of chest.games; track game.slug) {
        <article class="cn-entry" [attr.aria-labelledby]="'cn-' + game.slug">
          <span class="cn-face cn-medal"><cc-proto-icon name="wheel" /></span>
          <div>
            <p class="cn-meta"><strong [id]="'cn-' + game.slug">{{ game.name }}</strong> · Playground</p>
            <p>{{ game.description }}</p>
            <div class="cn-actions">
              <a class="btn primary" [href]="game.playUrl">Play</a>
              <a class="cn-act" [href]="game.sourceUrl"><cc-proto-icon name="code" />Source</a>
            </div>
          </div>
        </article>
      }
      @for (skill of chest.skills; track skill.slug) {
        <article class="cn-entry" [attr.aria-labelledby]="'cn-' + skill.slug">
          <span class="cn-face cn-medal"><cc-proto-icon name="scroll" /></span>
          <div>
            <p class="cn-meta"><strong [id]="'cn-' + skill.slug">{{ skill.title }}</strong> · School</p>
            <p>{{ skill.purpose }}</p>
            <div class="cn-actions">
              <a class="btn" [routerLink]="skill.path">Read the skill</a>
              <a class="cn-act" [href]="skill.sourceUrl"><cc-proto-icon name="code" />Source</a>
            </div>
          </div>
        </article>
      }
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeCrowsNest {
  protected readonly chest = chest;
}
