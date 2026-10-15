// Fetches captains-chest/skills (shallow clone of main) into content/skills (untracked) and generates the
// School content: a catalog, one module per skill, lazy loaders, and /school/version.json with the commit used.
// Set SKILLS_DIR to use an existing checkout instead of cloning (e.g. for offline work).
import { execFileSync } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';

const siteDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const repoUrl = 'https://github.com/captains-chest/skills';
const branch = 'main';
const outDir = join(siteDir, 'src/content/generated');

const fail = (message) => {
  console.error(`skills: ${message}`);
  process.exit(1);
};
const git = (cwd, ...args) => execFileSync('git', args, { cwd, encoding: 'utf8' }).trim();

const checkout = () => {
  if (process.env.SKILLS_DIR) return resolve(process.env.SKILLS_DIR);
  const dir = join(siteDir, 'content/skills');
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dirname(dir), { recursive: true });
  execFileSync(
    'git',
    ['clone', '--quiet', '--depth', '1', '--branch', branch, `${repoUrl}.git`, dir],
    { stdio: 'inherit' },
  );
  return dir;
};

const parseSkillFile = (text, file) => {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) fail(`${file} has no front matter`);
  const meta = Object.fromEntries(
    match[1]
      .split(/\r?\n/)
      .map((line) => line.match(/^([\w-]+):\s*(.*)$/))
      .filter(Boolean)
      .map(([, key, value]) => [key, value.replace(/^["']|["']$/g, '').trim()]),
  );
  if (!meta.name || !meta.description)
    fail(`${file} needs "name" and "description" in its front matter`);
  return { meta, body: match[2] };
};

// "Does X. Use when Y." -> purpose "Does X.", whenToUse "Use when Y."
const splitDescription = (description) => {
  const index = description.search(/(?:^|\.\s+)Use (?:when|for|this|it)\b/);
  if (index < 0) return { purpose: description, whenToUse: '' };
  const cut = description[index] === '.' ? index + 1 : index;
  return { purpose: description.slice(0, cut).trim(), whenToUse: description.slice(cut).trim() };
};

const sectionHeadings = (markdown) =>
  [...markdown.matchAll(/^##\s+(.+)$/gm)].map(([, heading]) => heading.trim());
const docOrder = (file) => (file === 'SKILL.md' ? 0 : file === 'README.md' ? 1 : 2);
// Skill documents start at h1; shift them below the page's own h1/h2 so the outline stays valid.
const shiftHeadings = (html) =>
  html.replace(
    /<(\/?)h([1-6])\b/g,
    (_, slash, level) => `<${slash}h${Math.min(Number(level) + 2, 6)}`,
  );
// Relative *.md links in skill docs 404 under <base href="/"> (e.g. GENERAL.md -> /GENERAL.md).
// Point them at the matching file on GitHub in this skill folder instead.
const rewriteRelativeMdLinks = (html, slug) =>
  html.replace(/<a\s+href="([^"]+)"/g, (match, href) => {
    if (/^(?:[a-z]+:|\/|#)/i.test(href)) return match;
    const [pathPart, hash = ''] = href.split('#');
    if (!pathPart.endsWith('.md')) return match;
    const file = pathPart.split('/').filter(Boolean).pop();
    if (!file || file.includes('..')) return match;
    const hashSuffix = hash ? `#${hash}` : '';
    return `<a href="${repoUrl}/blob/${branch}/${slug}/${file}${hashSuffix}"`;
  });

const readSkill = (repoDir, slug) => {
  const folder = join(repoDir, slug);
  const { meta, body } = parseSkillFile(
    readFileSync(join(folder, 'SKILL.md'), 'utf8'),
    `${slug}/SKILL.md`,
  );
  if (meta.name !== slug) fail(`${slug}/SKILL.md: name "${meta.name}" must match its folder name`);
  const docs = readdirSync(folder)
    .filter((file) => file.endsWith('.md'))
    .sort((a, b) => docOrder(a) - docOrder(b) || a.localeCompare(b))
    .map((file) => {
      const markdown = file === 'SKILL.md' ? body : readFileSync(join(folder, file), 'utf8');
      return {
        file,
        sections: sectionHeadings(markdown),
        html: rewriteRelativeMdLinks(shiftHeadings(marked.parse(markdown, { async: false })), slug),
        sourceUrl: `${repoUrl}/blob/${branch}/${slug}/${file}`,
      };
    });
  return {
    slug,
    name: meta.name,
    description: meta.description,
    ...splitDescription(meta.description),
    install: `npx skills@latest add captains-chest/skills --skill ${slug} -y`,
    sourceUrl: `${repoUrl}/tree/${branch}/${slug}`,
    docs,
  };
};

const repoDir = checkout();
const sha = git(repoDir, 'rev-parse', 'HEAD');
const committedAt = git(repoDir, 'log', '-1', '--format=%cI');
const slugs = readdirSync(repoDir)
  .filter((name) => !name.startsWith('.') && statSync(join(repoDir, name)).isDirectory())
  .filter((name) => existsSync(join(repoDir, name, 'SKILL.md')))
  .sort();
if (slugs.length === 0) fail('no skill folders found');
const skills = slugs.map((slug) => readSkill(repoDir, slug));

// Every slug cited by the editorial content must exist.
const known = new Set(slugs);
const tenets = JSON.parse(readFileSync(join(siteDir, 'src/content/tenets.json'), 'utf8'));
for (const tenet of tenets) {
  if (!tenet.sources?.length) fail(`tenet "${tenet.slug}" cites no skills`);
  for (const source of tenet.sources) {
    if (!known.has(source)) fail(`tenet "${tenet.slug}" cites unknown skill "${source}"`);
  }
}
const notes = JSON.parse(readFileSync(join(siteDir, 'src/content/skill-notes.json'), 'utf8'));
for (const slug of Object.keys(notes)) {
  if (!known.has(slug)) fail(`skill-notes.json has notes for unknown skill "${slug}"`);
}

const banner = `// Generated by scripts/generate-skills.mjs from ${repoUrl}@${sha}. Do not edit.\n`;
rmSync(outDir, { recursive: true, force: true });
mkdirSync(join(outDir, 'skills'), { recursive: true });
// The rendered docs are a separate chunk: the skill page hydrates without them (they're `hydrate never`).
for (const skill of skills) {
  const outline = { ...skill, docs: skill.docs.map(({ html: _html, ...doc }) => doc) };
  writeFileSync(
    join(outDir, 'skills', `${skill.slug}.ts`),
    `${banner}import type { Skill } from '../../../app/school/models';\n\nexport const skill: Skill = ${JSON.stringify(outline, null, 2)};\n`,
  );
  writeFileSync(
    join(outDir, 'skills', `${skill.slug}.docs.ts`),
    `${banner}\n/** Rendered HTML of each doc, in the order of the skill's docs. */\nexport const docHtml: readonly string[] = ${JSON.stringify(
      skill.docs.map((doc) => doc.html),
      null,
      2,
    )};\n`,
  );
}
const summaries = skills.map(({ slug, name, purpose, sourceUrl }) => ({
  slug,
  name,
  purpose,
  sourceUrl,
}));
writeFileSync(
  join(outDir, 'catalog.ts'),
  `${banner}import type { SkillsSource, SkillSummary } from '../../app/school/models';\n\n` +
    `export const skillSummaries: readonly SkillSummary[] = ${JSON.stringify(summaries, null, 2)};\n\n` +
    `export const skillsSource: SkillsSource = ${JSON.stringify({ repoUrl, branch, sha, committedAt }, null, 2)};\n`,
);
writeFileSync(
  join(outDir, 'skill-loaders.ts'),
  `${banner}import type { Skill } from '../../app/school/models';\n\n` +
    `export const skillLoaders: Readonly<Record<string, () => Promise<Skill>>> = {\n` +
    slugs
      .map((slug) => `  '${slug}': () => import('./skills/${slug}').then((m) => m.skill),`)
      .join('\n') +
    `\n};\n`,
);
writeFileSync(
  join(outDir, 'doc-loaders.ts'),
  `${banner}\n` +
    `export const docLoaders: Readonly<Record<string, () => Promise<readonly string[]>>> = {\n` +
    slugs
      .map((slug) => `  '${slug}': () => import('./skills/${slug}.docs').then((m) => m.docHtml),`)
      .join('\n') +
    `\n};\n`,
);
mkdirSync(join(outDir, 'public/school'), { recursive: true });
writeFileSync(
  join(outDir, 'public/school/version.json'),
  `${JSON.stringify({ skillsRepo: repoUrl, branch, sha, committedAt, skills: slugs }, null, 2)}\n`,
);
const sitePaths = [
  '/',
  '/play',
  '/mods',
  '/dictator',
  '/dictator/privacy',
  '/school',
  '/school/way',
  '/school/skills',
  ...slugs.map((slug) => `/school/skills/${slug}`),
];
writeFileSync(
  join(outDir, 'public/sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    sitePaths
      .map((path) => `  <url><loc>https://captains-chest.com${path}</loc></url>`)
      .join('\n') +
    `\n</urlset>\n`,
);
console.log(
  `skills: ${slugs.length} skills from ${repoUrl}@${sha.slice(0, 7)} (${slugs.join(', ')}), ${tenets.length} tenets`,
);
