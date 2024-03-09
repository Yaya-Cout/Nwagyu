const { description } = require('../../package')

module.exports = {
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
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  // Base url
  base: '/Nwagyu/',

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    nav: [
      {
        text: 'Help',
        link: '/guide/help/',
      },
      {
        text: 'Apps',
        link: '/guide/apps/',
      },
      {
        text: 'App installer',
        link: 'https://my.numworks.com/apps'
      }
    ],
    sidebar: [
      {
        title: 'Introduction',   // required
        path: '/guide/',      // optional, link of the title, which should be an absolute path and must exist
        // collapsable: false, // optional, defaults to true
        // sidebarDepth: 1,    // optional, defaults to 1
        children: [
        ]
      },
      {
        title: 'Apps',
        path: '/guide/apps/',
        children: [
          "/guide/apps/lua",
          "/guide/apps/peanut-gb",
          "/guide/apps/periodic",
          "/guide/apps/khicas",
          "/guide/apps/nofrendo",
          "/guide/apps/wabbitemu",
          "/guide/apps/playa",
          "/guide/apps/pngviewer",
          "/guide/apps/mandelbrot",
          "/guide/apps/sierpinski",
        ],
        // initialOpenGroupIndex: -1 // optional, defaults to 0, defines the index of initially opened subgroup
      },
      {
        title: "Help",
        path: '/guide/help/',
        children: [
          "/guide/help/how-to-install",
          "/guide/help/enlarge-your-memory",
          "/guide/help/how-to-uninstall",
          "/guide/help/faq",
        ]
      }
    ]
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}
