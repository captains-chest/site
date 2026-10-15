export interface ModImage {
  /** 1x source; `src2x` is the same picture at twice the pixels. */
  readonly src: string;
  readonly src2x: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
}

export interface Mod {
  readonly slug: string;
  readonly name: string;
  readonly game: string;
  readonly description: string;
  readonly facts: readonly string[];
  readonly url: string;
  readonly linkLabel: string;
  readonly image: ModImage;
}
