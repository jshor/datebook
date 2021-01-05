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
            text: 'Configuration',
            link: '/config/basic.html'
          },
          {
            text: 'Calendar Types',
            link: '/docs/'
          },
          {
            text: 'Calendar Generators',
            link: '/generators/'
          }
        ],
        sidebar: [
          {
            title: 'Configuration',
            path: '/config/basic.html',
            children: [
              {
                title: 'Basic Config',
                path: '/config/basic.md'
              },
              {
                title: 'Recurrences',
                path: '/config/recurrence.md'
              },
              {
                title: 'Alarms',
                path: '/config/alarms.md'
              },
              {
                title: 'Durations',
                path: '/config/durations.md'
              }
            ]
          },
          {
            title: 'Calendar Types',
            path: '/docs/',
            children: [
              {
                title: 'iCalendar',
                path: '/docs/icalendar.md'
              },
              {
                title: 'Yahoo! Calendar',
                path: '/docs/yahoo.md'
              },
              {
                title: 'Google Calendar',
                path: '/docs/google.md'
              },
              {
                title: 'Outlook Web Calendar',
                path: '/docs/outlook.md'
              }
            ]
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
