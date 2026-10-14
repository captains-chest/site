import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProjectCard } from '../project-card/project-card';
import { projects } from '../projects/constants';
import { HomeChartRoom } from '../prototype/home-chart-room';
import { HomeCrowsNest } from '../prototype/home-crows-nest';
import { HomeVoyage } from '../prototype/home-voyage';
import { PrototypeVariant } from '../prototype/variant';

@Component({
  selector: 'cc-home',
  imports: [ProjectCard, HomeChartRoom, HomeVoyage, HomeCrowsNest],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  protected readonly _projects = projects;
  protected readonly _variant = inject(PrototypeVariant);
}
