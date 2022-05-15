// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '喵屋',
  tagline: '每天进步一点点',
  url: 'https://meoo.space/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'cxOrz', // Usually your GitHub org/user name.
  projectName: 'meoo.space', // Usually your repo name.

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          showLastUpdateAuthor: true,
          editUrl: 'https://github.com/cxOrz/meoo.space/tree/main/',
        },
        blog: {
          blogTitle: '博客',
          blogSidebarTitle: '全部博文',
          blogSidebarCount: 'ALL',
          showReadingTime: true,
          editUrl:
            'https://github.com/cxOrz/meoo.space/tree/main/',
          postsPerPage: 5
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
        }
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [
      ],
      navbar: {
        title: 'Meoo',
        logo: {
          alt: 'Logo',
          src: 'img/logo.webp',
        },
        items: [
          {
            to: 'docs/notes-intro',
            position: 'left',
            label: '笔记',
          },
          {
            to: '/blog',
            label: '博客',
            position: 'left'
          },
          {
            to: '/essay',
            label: '记录生活',
            position: 'left'
          },
          {
            to: '/docs/hackfun-intro',
            label: '乐趣',
            position: 'left'
          },
          {
            href: 'https://github.com/cxOrz',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub',
          },
          {
            href: 'https://steamcommunity.com/profiles/76561199021282196',
            position: 'right',
            className: 'header-steam-link',
            'aria-label': 'Steam',
          },
          {
            href: 'https://space.bilibili.com/18844857',
            position: 'right',
            className: 'header-bilibili-link',
            'aria-label': 'Bilibili',
          }
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '本站',
            items: [
              {
                label: '笔记',
                to: '/docs/notes-intro',
              },
              {
                label: '博客',
                to: '/blog',
              },
              {
                label: '乐趣',
                to: '/docs/hackfun-intro',
              },
              {
                label: '记录生活',
                to: '/essay',
              },
            ],
          },
          {
            title: '我的',
            items: [
              {
                label: 'Github',
                href: 'https://github.com/cxOrz',
              },
              {
                label: 'CSDN',
                href: 'https://blog.csdn.net/u014418267',
              },
            ],
          },
          {
            title: '更多',
            items: [
              {
                label: '...',
                to: '/'
              }
            ]
          }
        ],
        copyright: `Copyright © ${new Date().getFullYear()} mcx.`,
      },
      prism: {
        theme: require('prism-react-renderer/themes/github'),
        darkTheme: require('prism-react-renderer/themes/vsDark')
      },
      docs:{
        sidebar:{
          hideable: true
        }
      }
    }),
  plugins: [
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'second-blog',
        blogSidebarTitle: '近期博文',
        blogTitle: '记录生活',
        /**
         * 您网站上博客的 URL 路由。
         * *请务必不要*添加斜杠。
         */
        routeBasePath: 'essay',
        /**
         * 相对于站点目录的文件系统数据路径。
         */
        path: './essay',
      },
    ]
  ],
  i18n: {
    defaultLocale: 'zh-cn',
    locales: ['zh-cn', 'en'],
  },
};

module.exports = config;
