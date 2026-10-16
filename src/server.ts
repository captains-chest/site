import { AngularAppEngine, createRequestHandler } from '@angular/ssr';

/** Static assets binding provided by Workers static assets (see wrangler.jsonc). */
interface AssetsBinding {
  fetch(request: Request): Promise<Response>;
}

/** Cloudflare's streaming HTML rewriter (Workers runtime global). */
interface RewriterElement {
  getAttribute(name: string): string | null;
  setAttribute(name: string, value: string): void;
  removeAttribute(name: string): void;
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
/** Former subdomains whose content now lives under a path on the apex. */
const movedHosts: Readonly<Record<string, string>> = {
  'dictator.captains-chest.com': '/dictator',
  'play.captains-chest.com': '/play',
  'school.captains-chest.com': '/school',
};

const pathOnApex = (pathname: string, destination: string): string =>
  pathname === '/' ? destination : `${destination}${pathname}`;

const movedPermanently = 301;
const notFound = 404;
const hashedAssetPattern = /-[A-Z0-9]{8}\.(?:js|css|mjs)$/;
const immutableCache = 'public, max-age=31536000, immutable';
const htmlCache = 'public, max-age=300, must-revalidate';
const otherCache = 'public, max-age=86400';

// Our scripts use build-time hashes (see scripts/fix-csp-html.mjs); styles are 'unsafe-inline'.
// We do not put nonces on our HTML: that broke when a cached body met a different CSP header.
// Cloudflare Bot Management (JS Detections) injects a changing inline script and stamps whatever
// nonce is in the CSP *header* onto it (https://developers.cloudflare.com/cloudflare-challenges/
// challenge-types/javascript-detections/). So HTML responses get a header-only nonce for CF,
// never rewritten into the body. 'self' already covers /cdn-cgi/challenge-platform/*.
// Web Analytics: exact beacon URL + connect-src per
// https://developers.cloudflare.com/web-analytics/faq/
const nonceBytes = 16;
const createNonce = (): string =>
  btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(nonceBytes))));

const contentSecurityPolicy = (scriptNonce?: string): string => {
  const scriptSrc = [
    "'self'",
    scriptNonce !== undefined ? `'nonce-${scriptNonce}'` : undefined,
    '__CSP_SCRIPT_HASHES__',
    'https://static.cloudflareinsights.com/beacon.min.js',
  ]
    .filter((part): part is string => part !== undefined)
    .join(' ');
  return (
    `default-src 'self'; script-src ${scriptSrc}; style-src 'self' 'unsafe-inline'; ` +
    "img-src 'self' data:; font-src 'self'; connect-src 'self' https://cloudflareinsights.com; " +
    "manifest-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; " +
    "frame-ancestors 'none'; upgrade-insecure-requests"
  );
};

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
  hashedAssetPattern.test(pathname)
    ? immutableCache
    : contentType.includes('text/html')
      ? htmlCache
      : otherCache;

const stripModulePreloads = (response: Response): Response =>
  new HTMLRewriter()
    // Pages are prerendered and hydrate incrementally, so route chunks aren't needed for first paint;
    // preloading them competes with the HTML and main bundle on slow mobile links (~0.4 s FCP in Lighthouse).
    .on('link[rel="modulepreload"]', { element: (element) => element.remove() })
    // SSR pages can still emit Beasties' media="print" links; activate them without relying on the swap script.
    .on('link[rel="stylesheet"][data-beasties-media]', {
      element: (element) => {
        element.setAttribute('media', element.getAttribute('data-beasties-media') ?? 'all');
        element.removeAttribute('data-beasties-media');
      },
    })
    .transform(response);

const withHeaders = (response: Response, pathname: string): Response => {
  const headers = new Headers(response.headers);
  for (const [name, value] of Object.entries(securityHeaders)) {
    headers.set(name, value);
  }
  const contentType = headers.get('Content-Type') ?? '';
  const isHtml = contentType.includes('text/html');
  // Header-only nonce on HTML so Cloudflare can stamp Bot Management's injected script.
  headers.set('Content-Security-Policy', contentSecurityPolicy(isHtml ? createNonce() : undefined));
  if (response.ok) {
    headers.set('Cache-Control', cacheControlFor(pathname, contentType));
  }
  const result = new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
  return isHtml ? stripModulePreloads(result) : result;
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
      url.pathname = pathOnApex(url.pathname, movedTo);
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
