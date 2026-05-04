import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const typesenseEnabled = Boolean(
  process.env.TYPESENSE_HOST && process.env.TYPESENSE_SEARCH_API_KEY,
);

const config: Config = {
  title: 'PascalCTF Wiki',
  tagline: 'A wiki made for beginners to learn CTF and cybersecurity',
  favicon: 'img/favicon.ico',

  themes: typesenseEnabled ? ['docusaurus-theme-search-typesense'] : [],

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://wiki.pascalctf.it',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'PascalCTF', // Usually your GitHub org/user name.
  projectName: 'wiki', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/PascalCTF/Training-Wiki/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg', // TODO create a custom one
    colorMode: {
      respectPrefersColorScheme: true,
    },
    ...(typesenseEnabled
      ? {
          typesense: {
            // Must match `index_name` in the scraper config.
            typesenseCollectionName:
              process.env.TYPESENSE_COLLECTION_NAME ?? 'training-wiki',

            typesenseServerConfig: {
              nodes: [
                {
                  host: process.env.TYPESENSE_HOST!,
                  port: Number(process.env.TYPESENSE_PORT ?? '8108'),
                  protocol: (process.env.TYPESENSE_PROTOCOL ?? 'http') as
                    | 'http'
                    | 'https',
                },
              ],
              apiKey: process.env.TYPESENSE_SEARCH_API_KEY!,
            },
            typesenseSearchParameters: {},
            contextualSearch: true,
          },
        }
      : {}),
    navbar: {
      title: 'Training Wiki',
      logo: {
        alt: 'Paolo logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'binaryExploitationSidebar',
          position: 'left',
          label: 'Binary Exploitation',
        },
        {
          type: 'docSidebar',
          sidebarId: 'reverseEngineeringSidebar',
          position: 'left',
          label: 'Reverse Engineering',
        },
        {
          type: 'docSidebar',
          sidebarId: 'webExploitationSidebar',
          position: 'left',
          label: 'Web Exploitation',
        },
        {
          type: 'docSidebar',
          sidebarId: 'cryptographySidebar',
          position: 'left',
          label: 'Cryptography',
        },
        {
          type: 'docSidebar',
          sidebarId: 'miscellaneousSidebar',
          position: 'left',
          label: 'Miscellaneous',
        },
        {
          href: 'https://github.com/PascalCTF/Training-Wiki',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Binary Exploitation',
              to: '/docs/binary-exploitation/intro',
            },
            {
              label: 'Reverse Engineering',
              to: '/docs/reverse-engineering/intro',
            },
            {
              label: 'Web Exploitation',
              to: '/docs/web-exploitation/intro',
            },
            {
              label: 'Cryptography',
              to: '/docs/cryptography/intro',
            },
            {
              label: 'Miscellaneous',
              to: '/docs/miscellaneous/intro',
            }
          ],
        },
        {
          title: 'Links',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/PascalCTF',
            },
            {
              label: 'LinkedIn',
              href: 'https://linkedin.com/company/pascalctf',
            },
            {
              label: 'Website',
              href: 'https://pascalctf.github.io',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} PascalCTF. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies (Preset.ThemeConfig & {
    typesense?: {
      typesenseCollectionName: string;
      typesenseServerConfig: {
        nodes: Array<{host: string; port: number; protocol: 'http' | 'https'}>;
        apiKey: string;
      };
      typesenseSearchParameters?: Record<string, unknown>;
      contextualSearch?: boolean;
    };
  }),
};

export default config;
