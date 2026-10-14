import { DOCUMENT, ViewportScroller } from '@angular/common';
import {
  type ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import {
  provideClientHydration,
  withEventReplay,
  withIncrementalHydration,
} from '@angular/platform-browser';
import {
  provideRouter,
  TitleStrategy,
  withComponentInputBinding,
  withInMemoryScrolling,
} from '@angular/router';
import { routes } from './app.routes';
import { PageTitleStrategy } from './seo/page-title-strategy';

// Zoneless change detection is the default in this Angular version (no zone.js is loaded).
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withIncrementalHydration(), withEventReplay()),
    // In-app links replace full page loads, so the router scrolls to fragments and back to the top.
    provideRouter(
      routes,
      withComponentInputBinding(),
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
    ),
    // Fragment targets land just below the sticky header plank, whose height grows when it wraps on narrow screens.
    provideAppInitializer(() => {
      const document = inject(DOCUMENT);
      inject(ViewportScroller).setOffset(() => [
        0,
        (document.querySelector('.hull')?.getBoundingClientRect().bottom ?? 0) + 16,
      ]);
    }),
    // Every navigation, on the server and in the browser, writes the route's title and meta tags.
    { provide: TitleStrategy, useClass: PageTitleStrategy },
  ],
};
