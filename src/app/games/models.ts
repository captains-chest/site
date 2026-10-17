import type { ModImage } from '../mods/models';

export interface Game {
  readonly slug: string;
  readonly name: string;
  readonly description: string;
  readonly playUrl: string;
  readonly sourceUrl: string;
  readonly image: ModImage;
}
