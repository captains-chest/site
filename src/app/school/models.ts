export interface SkillDoc {
  readonly file: string;
  readonly sections: readonly string[];
  readonly sourceUrl: string;
}

export interface SkillSummary {
  readonly slug: string;
  readonly name: string;
  readonly purpose: string;
  readonly sourceUrl: string;
}

export interface Skill extends SkillSummary {
  readonly description: string;
  readonly whenToUse: string;
  readonly install: string;
  readonly docs: readonly SkillDoc[];
}

export interface SkillsSource {
  readonly repoUrl: string;
  readonly branch: string;
  readonly sha: string;
  readonly committedAt: string;
}

export interface SkillNotes {
  readonly principles: readonly string[];
}

export interface Tenet {
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly sources: readonly string[];
}
