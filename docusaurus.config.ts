import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Hanasaki的老窝',
  tagline: '咸鱼',
  url: 'https://cxOrz.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.webp',
  organizationName: 'cxOrz',
  projectName: 'cxOrz.com',

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      {
        docs: false,
        blog: {
          blogTitle: '博客',
          blogSidebarTitle: '近期博文',
          blogSidebarCount: 10,
          showReadingTime: true,
          editUrl:
            'https://github.com/cxOrz/meoo.space/tree/main/',
          postsPerPage: 5
        },
        theme: {
          customCss: './src/css/custom.css',
        }
      } satisfies Preset.Options,
    ],
  ],

  markdown: {
    format: 'detect',
  },

  themeConfig: {
    metadata: [
      { name: 'keywords', content: 'blog, react, node, web, javascript, typescript' }
    ],
    colorMode: {
      respectPrefersColorScheme: true
    },
    navbar: {
      logo: {
        alt: 'Logo',
        src: 'img/logo.webp',
        style: { borderRadius: '50%' }
      },
      items: [
        {
          label: '博客',
          to: '/blog',
          position: 'left',
          activeBaseRegex: '^/blog$'
        },
        {
          label: '归档',
          to: '/blog/archive',
          position: 'left'
        },
        {
          label: '分类',
          to: '/blog/tags',
          position: 'left'
        },
        {
          href: 'https://github.com/cxOrz',
          position: 'right',
          label: 'GitHub',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '博客',
          items: [
            {
              label: '归档',
              to: '/blog/archive',
            },
            {
              label: '分类',
              to: '/blog/tags',
            },
          ],
        },
        {
          title: '链接',
          items: [
            {
              label: 'Github',
              href: 'https://github.com/cxOrz',
            },
          ],
        },
      ],
      copyright: `版权所有 © 2024 cxOrz，此网站使用 Docusaurus 构建。`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.vsDark,
    },
    docs: {
      sidebar: {
        hideable: true
      }
    }
  } satisfies Preset.ThemeConfig,
};

export default config;
