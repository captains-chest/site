import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { isSitePath } from '../about/functions';
import type { Note } from '../about/models';

@Component({
  selector: 'article[cc-note-card]',
  imports: [RouterLink],
  templateUrl: './note-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'card', '[attr.aria-labelledby]': 'headingId()' },
})
export class NoteCard {
  readonly note = input.required<Note>();
  protected readonly headingId = computed(() => `note-${this.note().slug}`);
  protected readonly isSitePath = isSitePath;
}
