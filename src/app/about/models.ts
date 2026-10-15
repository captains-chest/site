export interface ProfileLink {
  readonly label: string;
  /** A site path (starting with `/`) or an absolute URL. */
  readonly href: string;
}

/** A short titled note: a working principle, or an Angular highlight. */
export interface Note {
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly link?: ProfileLink;
}

export interface Position {
  readonly title: string;
  /** `YYYY-MM`. */
  readonly start: string;
  /** `YYYY-MM`; absent while the position is current. */
  readonly end?: string;
  readonly summary?: string;
  readonly skills: readonly string[];
}

export interface Employer {
  readonly slug: string;
  readonly company: string;
  /** What the company is, for readers outside Denmark. */
  readonly about?: string;
  readonly location: string;
  /** Newest first. */
  readonly positions: readonly Position[];
}

export interface PaperEntry {
  readonly label: string;
  readonly value: string;
}
