import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ProjectCard } from '../project-card/project-card';
import { projects } from '../projects/constants';

const homeTitle = "Captain's Chest";

@Component({
  selector: 'cc-home',
  imports: [ProjectCard],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  protected readonly projects = projects;

  constructor() {
    // Client navigation from the 404 page leaves that route's title and robots tag in place.
    inject(Title).setTitle(homeTitle);
    inject(Meta).removeTag('name="robots"');
  }
}
