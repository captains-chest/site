import type { Employer, Note, ProfileLink } from './models';

export const fullName = 'Nicki Skipper Otte';
export const handle = 'CaptainDuckay';
export const homeWaters = 'Denmark';
export const flag = 'Angular';

export const portrait = {
  src: '/about/captain-224.webp',
  src2x: '/about/captain-448.webp',
  size: 224,
  alt: 'Cartoon portrait of Nicki as a pirate captain: long brown hair, beard, tricorn hat with a skull and crossbones, and a red officer’s coat, on a ship’s deck under a green cosmic swirl.',
} as const;

export const linkedIn: ProfileLink = {
  label: 'LinkedIn',
  href: 'https://www.linkedin.com/in/nickiskipper',
};

export const gitHub: ProfileLink = {
  label: 'GitHub',
  href: 'https://github.com/captainDuckay',
};

export const principles: readonly Note[] = [
  {
    slug: 'freedom-under-responsibility',
    title: 'Freedom under responsibility',
    summary:
      'I do my best work with real ownership: the trust to make technical decisions and the backing to carry them out, without a chain of sign-offs in the way.',
  },
  {
    slug: 'own-the-direction',
    title: 'Own the direction',
    summary:
      "I'd rather lead the technical direction than follow it. Taking a problem from the first sketch to launch is where I'm most useful.",
  },
  {
    slug: 'process-that-fits',
    title: 'A process that fits the crew',
    summary:
      'I pick the way of working that suits the team and the problem, not the mainstream framework by default. By-the-book Scrum rarely fits how I work; short feedback loops and shared ownership do.',
  },
  {
    slug: 'good-crews',
    title: 'Good crews ship good work',
    summary:
      'Agile only works when people feel safe to ask, try and fail. I put real effort into keeping the environment around me positive.',
  },
];

export const angularNotes: readonly Note[] = [
  {
    slug: 'angularjs-to-angular',
    title: 'AngularJS to Angular 19',
    summary:
      'At nemlig.com I led the migration of a legacy AngularJS codebase to Angular 19, as a gradual migration rather than a big-bang rewrite.',
  },
  {
    slug: 'icons',
    title: 'Icons for Angular',
    summary:
      'Material Symbols Rounded Icons: publishable standalone component libraries, in outline and filled variants. Every icon on this site comes from them.',
    link: { label: 'Browse the icons', href: 'https://icons.captains-chest.com' },
  },
  {
    slug: 'this-ship',
    title: 'This very ship',
    summary:
      "captains-chest.com runs on Angular 22: standalone, zoneless and signal-based, prerendered and served from Cloudflare's edge, with incremental hydration.",
    link: { label: 'Read the source', href: 'https://github.com/captains-chest/site' },
  },
  {
    slug: 'house-way',
    title: 'Conventions, written down',
    summary:
      'The Angular conventions I code by, from component cuts to signal forms and resources, are agent skills in the School.',
    link: { label: 'Project code standards', href: '/school/skills/project-code-standards' },
  },
];

export const employers: readonly Employer[] = [
  {
    slug: 'metroselskabet',
    company: 'Metroselskabet',
    about: 'The company that builds and runs the Copenhagen Metro.',
    location: 'Copenhagen',
    positions: [{ title: 'Frontend Developer', start: '2025-08', skills: ['Angular', 'Figma'] }],
  },
  {
    slug: 'edora',
    company: 'Edora',
    about: 'A software consultancy: custom development, IT consulting and support.',
    location: 'Charlottenlund',
    positions: [
      {
        title: 'Senior Developer',
        start: '2025-03',
        end: '2025-07',
        skills: ['C#', '.NET Framework'],
      },
    ],
  },
  {
    slug: 'nemlig',
    company: 'nemlig.com',
    about: "Denmark's online grocery store.",
    location: 'Brøndby',
    positions: [
      {
        title: 'Software Developer',
        start: '2023-06',
        end: '2025-03',
        summary: 'Led the migration of a legacy AngularJS codebase to Angular 19.',
        skills: ['Angular', 'AngularJS', 'SEO', 'Kubernetes'],
      },
      {
        title: 'Frontend Developer',
        start: '2022-02',
        end: '2023-06',
        skills: ['Kubernetes', 'Helm Charts'],
      },
    ],
  },
  {
    slug: 'evercall',
    company: 'evercall ApS',
    location: 'Odense',
    positions: [
      {
        title: 'Software Engineer',
        start: '2020-08',
        end: '2022-01',
        skills: ['PHP', 'React'],
      },
      {
        title: 'Data technician apprentice, programming',
        start: '2016-02',
        end: '2020-08',
        skills: ['PHP', 'Linux', 'Zabbix', 'Asterisk', 'Kamailio'],
      },
    ],
  },
];
