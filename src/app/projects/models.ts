export interface ProjectLink {
  readonly label: string;
  readonly href: string;
}

export interface Project {
  readonly slug: string;
  readonly name: string;
  readonly description: string;
  readonly primary: ProjectLink;
  readonly sourceUrl: string;
}
