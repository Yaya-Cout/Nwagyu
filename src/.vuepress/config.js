import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { viteBundler } from '@vuepress/bundler-vite'

import { searchPlugin } from '@vuepress/plugin-search'

export default defineUserConfig({
  bundler: viteBundler(),
  plugins: [
    searchPlugin({
      locales: {
        '/': {
          placeholder: 'Search',
        },
        '/fr/': {
          placeholder: 'Rechercher',
        },
      },
    }),
  ],

  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Nwagyu!',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: "Beefy bytes for your NumWorks!",

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['link', { rel: "shortcut icon", href: "/Nwagyu/favicon.ico"}],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  // Base url
  base: '/Nwagyu/',

  locales: {
    // The key is the path for the locale to be nested under.
    // As a special case, the default locale can use '/' as its path.
    '/': {
      lang: 'en-US', // this will be set as the lang attribute on <html>
      label: "English",
    },
    '/fr/': {
      lang: 'fr-FR',
      label: "Français",
    }
  },

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  theme: defaultTheme({
    repo: 'https://github.com/Yaya-Cout/Nwagyu',
    docsDir: 'src',
    logo: '/cow-head.webp',
    navbar: [
      // {
      //   text: 'Apps',
      //   link: '/guide/'
      // },
      // {
      //   text: 'Documentation',
      //   link: '/reference/'
      // },
      {
        text: 'App installer',
        link: 'https://my.numworks.com/apps'
      }
    ],
    sidebar: {
      '/': [
        {
          text: 'Introduction',
          link: '/guide/',
          children: [
          ]
        },
        {
          text: 'Apps',
          link: '/guide/apps/',
          prefix: '/guide/apps/',
          // collapsible: true,
          children: [
            "peanut-gb",
            "nofrendo",
            "khicas",
            "lua",
            "periodic",
            "wabbitemu",
            "playa",
            "pngviewer",
            "mandelbrot",
            "sierpinski",
            "storage",
            "compressor",
            "backup",
            "numcraft",
          ],
        },
        {
          text: "Help",
          link: '/guide/help/',
          prefix: '/guide/help/',
          children: [
            "enlarge-your-memory",
            "how-to-install",
            "how-to-uninstall",
            "faq",
          ]
        },
        {
          text: 'Documentation',
          link: '/reference/',
          children: [
          ]
        },
      ],
      '/fr/': [
        {
          text: 'Introduction',
          link: '/fr/guide/',
          children: [
          ]
        },
        {
          text: 'Applications',
          link: '/fr/guide/apps/',
          prefix: '/fr/guide/apps/',
          // collapsible: true,
          children: [
            "peanut-gb",
            "nofrendo",
            "khicas",
            "lua",
            "periodic",
            "wabbitemu",
            "playa",
            "pngviewer",
            "mandelbrot",
            "sierpinski",
            "storage",
            "compressor",
            "backup",
            "numcraft",
          ],
        },
        {
          text: "Aide",
          link: '/fr/guide/help/',
          prefix: '/fr/guide/help/',
          children: [
            "enlarge-your-memory",
            "how-to-install",
            "how-to-uninstall",
            "faq",
          ]
        },
        {
          text: 'Documentation (anglais)',
          link: '/reference/',
          children: [
          ]
        },
      ],
      '/reference/': [
        {
          text: 'Documentation Index',
          link: '/reference/',
          children: [
          ]
        },
        {
          text: 'External apps',
          link: '/reference/apps/',
          prefix: '/reference/apps/',
          // collapsible: true,
          children: [
              "creating-application",
              "storage",
              "onoff-home",
              "syscalls",
          ],
        },
        {
          text: "Firmware",
          link: '/reference/firmware/',
          prefix: '/reference/firmware/',
          children: [
            "boot-process",
            "slots",
            "bootloader",
            "kernel",
            "userland",
            "addresses-structures",
          ]
        },
        {
          text: "Others",
          link: '/reference/others/',
          prefix: '/reference/others/',
          children: [
            "dfu",
            "downloading-epsilon"
          ]
        },
        {
          text: "Developers tips",
          link: '/reference/tips/',
          prefix: '/reference/tips/',
          children: [
            "rust_heap",
          ]
        },
        {
          text: 'User documentation',
          link: '/guide/',
          children: [
          ]
        },
      ],
    },
    locales: {
      '/': {
        selectLanguageName: 'English',

        toggleColorMode: 'Toogle color mode',
        toggleSidebar: 'Toogle sidebar',
      },
      '/fr/': {
        selectLanguageName: 'Français',
        selectLanguageText: 'Langues',
        editLinkText: 'Modifier cette page',
        lastUpdatedText: 'Dernière mise à jour le ',
        contributorsText: 'Contributeurs',
        tip: 'Conseil',
        warning: 'Attention',
        danger: 'Danger',
        backToHome: "Retourner à l'accueil",
        prev: 'Précédent',
        next: 'Suivant',

        // TODO: Add french 404 messages
        // notFound: [],

        // Following translations are there for a11y purpose
        selectLanguageAriaLabel: 'Langues',
        navbarLabel: 'Accueil',
        pageNavbarLabel: 'Barre latérale',
        toggleColorMode: 'Changer le thème',
        toggleSidebar: 'Basculer la barre latérale',
      }
    }
  }),
})
