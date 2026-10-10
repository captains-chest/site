import { ChangeDetectionStrategy, Component, input, resource } from '@angular/core';
import { docLoaders } from '../../content/generated/doc-loaders';
import type { SkillDoc } from '../school/models';

@Component({
  selector: 'section[cc-skill-docs]',
  templateUrl: './skill-docs.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-labelledby': 'docs-heading' },
})
export class SkillDocs {
  readonly slug = input.required<string>();
  readonly docs = input.required<readonly SkillDoc[]>();
  /** The rendered docs are their own chunk, fetched only when this block scrolls into view. */
  readonly #html = resource({
    params: () => this.slug(),
    loader: async ({ params }): Promise<readonly string[]> => (await docLoaders[params]?.()) ?? [],
  });
  protected readonly html = (index: number): string => this.#html.value()?.[index] ?? '';
}
