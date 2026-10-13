import { AngularAppEngine, createRequestHandler } from '@angular/ssr';

/** Static assets binding provided by Workers static assets (see wrangler.jsonc). */
interface AssetsBinding {
  fetch(request: Request): Promise<Response>;
}

/** Cloudflare's streaming HTML rewriter (Workers runtime global). */
interface RewriterElement {
  getAttribute(name: string): string | null;
  setAttribute(name: string, value: string): void;
  remove(): void;
}
declare class HTMLRewriter {
  on(selector: string, handlers: { element(element: RewriterElement): void }): HTMLRewriter;
  transform(response: Response): Response;
}

interface Env {
  readonly ASSETS: AssetsBinding;
}

const apexHost = 'captains-chest.com';
const wwwHost = 'www.captains-chest.com';
/** Former subdomain whose content now lives under a path on the apex. */
const movedHosts: Readonly<Record<string, string>> = {
  'school.captains-chest.com': '/school',
};
const movedPermanently = 301;
const notFound = 404;
const hashedAssetPattern = /-[A-Z0-9]{8}\.(?:js|css|mjs)$/;
const immutableCache = 'public, max-age=31536000, immutable';
const htmlCache = 'public, max-age=300, must-revalidate';
const otherCache = 'public, max-age=86400';

const noncePlaceholder = '__CSP_NONCE__';
const nonceBytes = 16;

// Pages are built with ngCspNonce="__CSP_NONCE__", so Angular puts that placeholder on its inline
// scripts and styles; each HTML response swaps it for a fresh nonce that the CSP below allows.
const contentSecurityPolicy = (nonce: string): string =>
  `default-src 'self'; script-src 'nonce-${nonce}' 'strict-dynamic' 'unsafe-inline' https:; style-src 'self' 'nonce-${nonce}'; ` +
  "img-src 'self' data:; font-src 'self'; connect-src 'self'; manifest-src 'self'; object-src 'none'; " +
  "base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests";

const securityHeaders: Readonly<Record<string, string>> = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'X-Frame-Options': 'DENY',
};

const angularApp = new AngularAppEngine();

const cacheControlFor = (pathname: string, contentType: string): string =>
  hashedAssetPattern.test(pathname) ? immutableCache : contentType.includes('text/html') ? htmlCache : otherCache;

const createNonce = (): string => btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(nonceBytes))));

const applyNonce = (response: Response, nonce: string): Response =>
  new HTMLRewriter()
    .on(`[nonce="${noncePlaceholder}"]`, { element: (element) => element.setAttribute('nonce', nonce) })
    .on('[ngcspnonce]', { element: (element) => element.setAttribute('ngcspnonce', nonce) })
    // Pages are prerendered and hydrate incrementally, so route chunks aren't needed for first paint;
    // preloading them competes with the HTML and main bundle on slow mobile links (~0.4 s FCP in Lighthouse).
    .on('link[rel="modulepreload"]', { element: (element) => element.remove() })
    .on('script:not([nonce])', {
      element: (element) => element.setAttribute('nonce', nonce),
    })
    .transform(response);

const withHeaders = (response: Response, pathname: string): Response => {
  const headers = new Headers(response.headers);
  for (const [name, value] of Object.entries(securityHeaders)) {
    headers.set(name, value);
  }
  const contentType = headers.get('Content-Type') ?? '';
  const isHtml = contentType.includes('text/html');
  const nonce = createNonce();
  headers.set('Content-Security-Policy', contentSecurityPolicy(nonce));
  if (response.ok) {
    headers.set('Cache-Control', cacheControlFor(pathname, contentType));
  }
  const result = new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  return isHtml ? applyNonce(result, nonce) : result;
};

const renderAngular = async (request: Request): Promise<Response> =>
  (await angularApp.handle(request)) ?? new Response('Not found', { status: notFound });

/** Used by the Angular CLI dev server and build. */
export const reqHandler = createRequestHandler(renderAngular);

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.hostname === wwwHost) {
      url.hostname = apexHost;
      return Response.redirect(url.toString(), movedPermanently);
    }
    const movedTo = movedHosts[url.hostname];
    if (movedTo !== undefined) {
      url.protocol = 'https:';
      url.hostname = apexHost;
      url.pathname = `${movedTo}${url.pathname}`;
      return Response.redirect(url.toString(), movedPermanently);
    }
    if (url.pathname.toLowerCase().endsWith('.md')) {
      return withHeaders(new Response('Not found', { status: notFound }), url.pathname);
    }
    if (request.method === 'GET' || request.method === 'HEAD') {
      const asset = await env.ASSETS.fetch(request);
      if (asset.status !== notFound) {
        return withHeaders(asset, url.pathname);
      }
    }
    return withHeaders(await renderAngular(request), url.pathname);
  },
};
