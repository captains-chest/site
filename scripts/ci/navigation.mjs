// Client-side navigation check: clicks in-app links (one before hydration finishes) and checks the head follows.
import puppeteer from 'puppeteer-core';

const origin = process.env.PREVIEW_ORIGIN ?? 'http://127.0.0.1:8787';
const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH ?? '/usr/bin/google-chrome',
  args: ['--no-sandbox'],
});
const page = await browser.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
page.on('console', (m) => m.type() === 'error' && !/404/.test(m.text()) && errors.push(m.text()));
let documents = 0;
page.on('request', (r) => r.isNavigationRequest() && r.frame() === page.mainFrame() && documents++);

const head = () =>
  page.evaluate(() => ({
    path: location.pathname + location.hash,
    title: document.title,
    description: document.querySelector('meta[name=description]')?.content,
    canonical: document.querySelector('link[rel=canonical]')?.href ?? null,
    robots: document.querySelector('meta[name=robots]')?.content ?? null,
    current: [...document.querySelectorAll('header [aria-current]')].map((a) =>
      a.textContent.trim(),
    ),
  }));
const click = async (selector) => {
  await page.click(selector);
  await new Promise((resolve) => setTimeout(resolve, 1000));
};
const expect = (label, actual, want) => {
  const ok = Object.entries(want).every(
    ([k, v]) => JSON.stringify(actual[k]) === JSON.stringify(v),
  );
  failed ||= !ok;
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${label}: ${JSON.stringify(actual)}`);
};

let failed = false;

// 1. Click before hydration: stall the JS so the click lands on server HTML, then let event replay handle it.
await page.setRequestInterception(true);
let release;
const gate = new Promise((r) => (release = r));
page.on('request', async (r) => {
  if (r.isInterceptResolutionHandled()) return;
  if (r.resourceType() === 'script') await gate;
  void r.continue();
});
// Module scripts hold back DOMContentLoaded, so only wait for the server HTML to be parsed.
void page.goto(`${origin}/this-page-does-not-exist`).catch(() => {});
await page.waitForSelector('nav a[href="/school"]');
// Every script request is held at the gate, so this click lands on server HTML with no app running.
await page.click('nav a[href="/school"]');
release();
await page.waitForFunction(() => location.pathname === '/school', { timeout: 15000 });
await new Promise((resolve) => setTimeout(resolve, 2000));
expect(
  '404 -> School (clicked before hydration: a plain link load until the app takes over)',
  await head(),
  {
    path: '/school',
    robots: null,
    canonical: 'https://captains-chest.com/school',
    current: ['School'],
  },
);
const before = documents;

await click('a[href="/school/skills"]');
expect('School -> Skills', await head(), {
  path: '/school/skills',
  title: "Skills · School of the Captain's Chest",
  current: ['School'],
});
await click('article.card a.btn.primary[href^="/school/skills/"]');
const skill = await head();
expect('Skills -> a skill', skill, { robots: null, current: ['School'] });
await click('nav a[href="/play"]');
expect('Skill -> Playground', await head(), {
  path: '/play',
  title: "Playground · Captain's Chest",
  canonical: 'https://captains-chest.com/play',
  current: ['Playground'],
});
await click('header a.brand');
expect('Playground -> Home', await head(), {
  path: '/',
  title: "Captain's Chest",
  canonical: 'https://captains-chest.com/',
  current: ["Captain's Chest"],
});
await click('nav a[href="/mods"]');
expect('Home -> Mods', await head(), {
  path: '/mods',
  title: "Mods · Captain's Chest",
  canonical: 'https://captains-chest.com/mods',
  robots: null,
  current: ['Mods'],
});
await click('header a.brand');
await click('article.card a.btn.primary[href="/dictator"]');
expect('Home -> Dictator', await head(), {
  path: '/dictator',
  title: "Dictator: offline dictation for macOS · Captain's Chest",
  canonical: 'https://captains-chest.com/dictator',
  robots: null,
});
await click('main a[href="/dictator/privacy"]');
expect('Dictator -> privacy', await head(), {
  path: '/dictator/privacy',
  title: "Dictator privacy policy · Captain's Chest",
  canonical: 'https://captains-chest.com/dictator/privacy',
});
console.log(`full document loads after hydration: ${documents - before} (expected 0)`);
console.log(`console errors: ${errors.length}`, errors);
failed ||= documents !== before || errors.length > 0;
await browser.close();
process.exit(failed ? 1 : 0);
