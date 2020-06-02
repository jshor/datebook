<p align="center">
  <a href="https://jshor.github.io/datebook/">
    <img src="https://raw.githubusercontent.com/jshor/datebook/master/manual/assets/logo.png" width="450" height="100" />
  </a>
</p>

<p align="center">A library for adding events to popular calendar apps.</p>

<p align="center">It supports .ics files for iCalendar and Office Outlook, and also supports Google Calendar, Yahoo! Calendar and Outlook Online.</p>

<br>

<p align="center">
  <a href="https://codecov.io/gh/jshor/datebook"><img
    src="https://img.shields.io/codecov/c/github/jshor/datebook.svg?style=for-the-badge"
    alt="Code coverage"
  /></a> <a href="https://travis-ci.org/jshor/datebook"><img
    src="https://img.shields.io/travis/jshor/datebook.svg?style=for-the-badge"
    alt="Build status"
  /></a> <a href="https://david-dm.org/jshor/datebook#info=dependencies"><img
    src="https://img.shields.io/david/jshor/datebook.svg?style=for-the-badge"
    alt="Dependency Status"
  /></a> <a href="https://npmjs.com/package/datebook"><img
    src="http://img.shields.io/npm/v/datebook.svg?style=for-the-badge"
    alt="npm version"
  /></a> <a href="https://bundlephobia.com/result?p=datebook"><img
    src="https://img.shields.io/bundlephobia/min/datebook?style=for-the-badge"
    alt="npm package size"
  /></a>
</p>

<br>

## Documentation

See the [full documentation →](https://www.datebook.dev/)

## Quick Start

### Installation

```sh
yarn add datebook
```

### Example Usage

```js
import { ICalendar } from 'datebook'

const icalendar = new ICalendar({
  title: 'Happy Hour',
  location: 'The Bar, New York, NY',
  description: 'Let\'s blow off some steam from our weekly deployments to enjoy a tall cold one!',
  start: '2020-07-04T19:00:00',
  end: '2020-07-04T23:30:00',
  recurrence: {
    frequency: 'WEEKLY',
    interval: 2
  }
})

icalendar.download()
```

## Available Classes

* [`YahooCalendar`](https://jshor.github.io/datebook/class/src/YahooCalendar.js~YahooCalendar.html)
* [`GoogleCalendar`](https://jshor.github.io/datebook/class/src/GoogleCalendar.js~GoogleCalendar.html)
* [`ICalendar`](https://jshor.github.io/datebook/class/src/ICalendar.js~ICalendar.html)
* [`OutlookCalendar`](https://jshor.github.io/datebook/class/src/OutlookCalendar.js~OutlookCalendar.html)
* [`CalendarBase`](https://jshor.github.io/datebook/class/src/CalendarBase.js~CalendarBase.html) (for creating new services)

## Browser Support

The latest versions of all major browsers are supported.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_128x128.png?raw=true" width="48px" height="48px" alt="Chrome logo"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_128x128.png?raw=true" width="48px" height="48px" alt="Firefox logo"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_128x128.png" width="48px" height="48px" alt="Internet Explorer logo"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_128x128.png" width="48px" height="48px" alt="Edge Browser Logo" > | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_128x128.png?raw=true" width="48px" height="48px" alt="Opera logo"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_128x128.png?raw=true" width="48px" height="48px" alt="Safari logo">
|:---:|:---:|:---:|:---:|:---:|:---:|
| Yes ✅ | 20+ ✅ | 10+ ✅ | Yes ✅ | 15+ ✅ | 10.1+ ✅
