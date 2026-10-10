// Runs axe-core against the local preview in light and dark mode; fails on any violation or console error.
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import puppeteer from 'puppeteer-core';

const require = createRequire(import.meta.url);
const axeSource = readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const baseUrl = process.env.PREVIEW_URL ?? 'http://127.0.0.1:8787';
const pages = [
  { path: '/', status: 200 },
  { path: '/this-page-does-not-exist', status: 404 },
];
const settleMs = 1000;

const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH ?? '/usr/bin/google-chrome',
  args: ['--no-sandbox'],
});
let failed = false;
for (const { path, status } of pages) {
  for (const scheme of ['light', 'dark']) {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => {
      const isExpected404 = status === 404 && message.text().includes('404');
      if (message.type() === 'error' && !isExpected404) errors.push(message.text());
    });
    await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: scheme }]);
    const response = await page.goto(baseUrl + path, { waitUntil: 'networkidle0' });
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await new Promise((resolve) => setTimeout(resolve, settleMs));
    await page.addScriptTag({ content: axeSource });
    const violations = await page.evaluate(async () =>
      (await window.axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice'] })).violations.map(
        (violation) => `${violation.id}: ${violation.help} (${violation.nodes.length})`,
      ),
    );
    const statusOk = response?.status() === status;
    console.log(`${path} [${scheme}] status ${response?.status()} · axe ${violations.length} · console errors ${errors.length}`);
    [...violations, ...errors].forEach((line) => console.log(`  ${line}`));
    failed ||= !statusOk || violations.length > 0 || errors.length > 0;
    await page.close();
  }
}
await browser.close();
process.exit(failed ? 1 : 0);
