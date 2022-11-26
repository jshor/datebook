import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { getDirname, path } from '@vuepress/utils'
import { defaultTheme, defineUserConfig } from 'vuepress'

const __dirname = getDirname(import.meta.url)

export default defineUserConfig({
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
  plugins: [
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components'),
    })
  ],
  host: 'localhost',
  theme: defaultTheme({
    logo: '/assets/logo.svg',
    repo: 'jshor/datebook',
    docsDir: 'docs',
    sidebarDepth: 4,
    navbar: [
      {
        text: 'Getting started',
        link: '/start'
      },
      {
        text: 'Config',
        link: '/config/basic'
      },
      {
        text: 'API',
        link: '/api/icalendar'
      },
      {
        text: 'Try it',
        link: '/generator/'
      }
    ],
    sidebar: [
      {
        text: 'Getting started',
        link: '/start'
      },
      {
        text: 'Config',
        link: '/config/basic',
        children: [
          {
            text: 'Basic Config',
            link: '/config/basic.md'
          },
          {
            text: 'Attendees',
            link: '/config/attendees.md'
          },
          {
            text: 'Recurrences',
            link: '/config/recurrence.md'
          },
          {
            text: 'Alarms',
            link: '/config/alarms.md'
          },
          {
            text: 'Durations',
            link: '/config/durations.md'
          }
        ]
      },
      {
        text: 'API',
        link: '/api/icalendar',
        children: [
          {
            text: 'iCalendar',
            link: '/api/icalendar.md'
          },
          {
            text: 'Yahoo! Calendar',
            link: '/api/yahoo.md'
          },
          {
            text: 'Google Calendar',
            link: '/api/google.md'
          },
          {
            text: 'Outlook Web Calendar',
            link: '/api/outlook.md'
          }
        ]
      },
      {
        text: 'Try it',
        link: '/generator/'
      }
    ]
  })
})
