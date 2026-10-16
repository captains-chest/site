import type { ModImage } from '../mods/models';

export interface SoftwareLink {
  readonly label: string;
  readonly href: string;
}

export interface Software {
  readonly slug: string;
  readonly name: string;
  /** What kind of software it is, shown above the description. */
  readonly kind: string;
  readonly description: string;
  readonly facts: readonly string[];
  /** Site-relative hrefs (starting with `/`) are router links. */
  readonly primary: SoftwareLink;
  readonly secondary?: SoftwareLink;
  readonly image: ModImage;
}
