// Post-build: make prerendered HTML safe to cache (no nonce attrs on our markup).
//
// Beasties emits stylesheet links as media="print" plus an inline swap script. That script (and
// Angular's event-replay bootstraps) need a matching CSP allow. Per-request nonces cannot be
// paired safely with cached HTML: if a body is reused with a different CSP header, CSS stays on
// print media and every nonce'd inline style is blocked (unstyled page, oversized mark SVG).
//
// This step:
// 1. Turns Beasties links into media="all" and drops the swap script (no inline handler).
// 2. Strips nonce / ngCspNonce placeholders.
// 3. Hashes the remaining inline scripts (Angular event-replay) and patches the Worker CSP.
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

const browserRoot = new URL('../dist/site/browser', import.meta.url).pathname;
const serverEntry = new URL('../dist/site/server/server.mjs', import.meta.url).pathname;
const placeholder = '__CSP_SCRIPT_HASHES__';

const walk = (dir, out = []) => {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path, out);
    else if (name.endsWith('.html')) out.push(path);
  }
  return out;
};

const hashInlineScripts = (html) => {
  const hashes = new Set();
  for (const match of html.matchAll(/<script\b([^>]*)>(.*?)<\/script>/gis)) {
    const [, attrs, body] = match;
    if (/\bsrc\s*=/i.test(attrs)) continue;
    const type = /\btype\s*=\s*["']([^"']+)["']/i.exec(attrs)?.[1]?.toLowerCase() ?? '';
    if (type.includes('json')) continue;
    const normalized = body.replace(/\r\n?/g, '\n');
    hashes.add(`'sha256-${createHash('sha256').update(normalized, 'utf8').digest('base64')}'`);
  }
  return hashes;
};

const fixHtml = (path) => {
  let html = readFileSync(path, 'utf8');
  html = html.replace(
    /<link([^>]*?)rel="stylesheet"([^>]*?)media="print"\s+data-beasties-media="all"([^>]*)>/gi,
    '<link$1rel="stylesheet"$2media="all"$3>',
  );
  html = html.replace(/\s+data-beasties-media="all"/gi, '');
  html = html.replace(
    /<script[^>]*>document\.querySelectorAll\('link\[data-beasties-media\]'\).*?<\/script>/gis,
    '',
  );
  html = html.replace(/\s+nonce="__CSP_NONCE__"/g, '');
  html = html.replace(/\s+ngCspNonce="__CSP_NONCE__"/gi, '');
  html = html.replace(/\s+ngcspnonce="__CSP_NONCE__"/gi, '');
  writeFileSync(path, html);
  return hashInlineScripts(html);
};

const allHashes = new Set();
for (const path of walk(browserRoot)) {
  for (const hash of fixHtml(path)) allHashes.add(hash);
}
// SSR (404 and other on-demand pages) still emit Beasties' swap script; allow its hash too.
const beastiesSwap =
  "document.querySelectorAll('link[data-beasties-media]').forEach(function(l){l.media=l.getAttribute('data-beasties-media');l.removeAttribute('data-beasties-media')})";
allHashes.add(`'sha256-${createHash('sha256').update(beastiesSwap, 'utf8').digest('base64')}'`);

const hashList = [...allHashes].sort().join(' ');
let server = readFileSync(serverEntry, 'utf8');
if (!server.includes(placeholder)) {
  throw new Error(`CSP placeholder ${placeholder} missing from ${serverEntry}`);
}
server = server.replaceAll(placeholder, hashList);
writeFileSync(serverEntry, server);
console.log(
  `fix-csp-html: Beasties→media=all, stripped nonces, patched Worker with ${allHashes.size} script hash(es)`,
);
