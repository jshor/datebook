const path = require('path')
const getDir = require('./utils/getDir')

module.exports = {
  base: '/',
  dest: path.join(__dirname, '../../build/docs'),
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Datebook',
      description: 'Add events to popular calendar apps.'
    }
  },
  head: [
    ['link', {
      rel: 'icon',
      href: '/assets/favicon.svg'
    }]
  ],
  host: 'localhost',
  serviceWorker: true,
  themeConfig: {
    logo: '/assets/logo.svg',
    repo: 'jshor/datebook',
    docsDir: 'docs',
    editLinks: true,
    sidebarDepth: 3,
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        lastUpdated: 'Last Updated',
        editLinkText: 'Edit this page on GitHub',
        nav: [
          {
            text: 'Documentation',
            link: '/docs/'
          },
          {
            text: 'Calendar Generators',
            link: '/generators/'
          }
        ],
        sidebar: [
          {
            title: 'Documentation',
            path: '/docs/',
            children: getDir('docs')
          },
          {
            title: 'Calendar Generators',
            path: '/generators/',
            children: [
              {
                title: 'Recurrence Generator',
                path: '/generators/recurrence.md'
              }
            ]
          }
        ]
      }
    }
  }
}