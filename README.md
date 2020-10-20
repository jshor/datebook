<p align="center">
  <a href="https://datebook.dev/">
    <img src="https://datebook.dev/assets/logo.svg" width="200" height="200" />
  </a>

  <h1 style="text-align: center;" align="center">Datebook</h1>
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

See the [full documentation →](https://datebook.dev/)

## Demo

Try the [online calendar generators →](https://datebook.dev/generators/)

## Quick Start

### Installation

```sh
yarn add datebook
```

### Example Usage

```ts
const config: CalendarOptions = {
  title: 'Happy Hour',
  location: 'The Bar, New York, NY',
  description: 'Let\'s blow off some steam with a tall cold one!',
  start: new Date('2022-07-08T19:00:00'),
  end: new Date('2022-07-08T23:30:00'),
  // an event that recurs every two weeks:
  recurrence: {
    frequency: 'WEEKLY',
    interval: 2
  }
}
```

#### iCalendar

```ts
const icalendar = new ICalendar(config)

icalendar.download()
```

This will download `Happy Hour.ics` onto the user's device. On most mobile devices, this will open the default calendar app with the event.

#### Google Calendar

```js
const googleCalendar = new GoogleCalendar(config)

googleCalendar.render()
```

`googleCalendar.render()` will return a URL that the user can navigate to and pre-fill event details:

```
https://calendar.google.com/calendar/render?action=TEMPLATE&text=Happy%20Hour&details=Let's%20blow%20off%20some%20steam%20with%20a%20tall%20cold%20one!&location=The%20Bar%2C%20New%20York%2C%20NY&dates=20220708T190000%2F20220708T230000&recur=RRULE%3AFREQ%3DWEEKLY%3BINTERVAL%3D1
```

## Browser Support

The latest versions of all major browsers are supported.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_128x128.png?raw=true" width="48px" height="48px" alt="Chrome logo"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_128x128.png?raw=true" width="48px" height="48px" alt="Firefox logo"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_128x128.png" width="48px" height="48px" alt="Internet Explorer logo"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_128x128.png" width="48px" height="48px" alt="Edge Browser Logo" > | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_128x128.png?raw=true" width="48px" height="48px" alt="Opera logo"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_128x128.png?raw=true" width="48px" height="48px" alt="Safari logo">
|:---:|:---:|:---:|:---:|:---:|:---:|
| Yes ✅ | 20+ ✅ | 11+ ✅ | Yes ✅ | 15+ ✅ | 10.1+ ✅
