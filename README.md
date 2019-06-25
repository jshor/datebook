<p align="center">
  <a href="https://jshor.github.io/datebook/">
    <img src="https://raw.githubusercontent.com/jshor/datebook/master/manual/assets/logo.png" width="450" height="100" />
  </a>
</p>

<p align="center">A library for adding events to calendar apps. It supports .ics files for iCalendar and Office Outlook, and also supports Google Calendar, Yahoo! Calendar and Outlook Online.</p>

<br>

<p align="center">
  <a href="https://codecov.io/gh/jshor/datebook"><img
    src="https://img.shields.io/codecov/c/github/jshor/datebook.svg?style=flat-square"
    alt="Code coverage"
  /></a> <a href="https://travis-ci.org/jshor/datebook"><img
    src="https://img.shields.io/travis/jshor/datebook.svg?style=flat-square"
    alt="Build status"
  /></a> <a href="https://npmjs.com/package/datebook"><img
    src="http://img.shields.io/npm/v/datebook.svg?style=flat-square"
    alt="npm version"
  /></a> <a href="LICENSE.md"><img
    src="http://img.shields.io/:license-MIT-blue.svg?style=flat-square"
    alt="License | MIT"
  /></a>
</p>

<br>

## Documentation

See the [full documentation here](https://jshor.github.io/datebook/).

## Quick start

### Installation

```sh
yarn add datebook
```

### Example usage

```js
import { ICalendar } from 'datebook'

const icalendar = new ICalendar({
  title: 'Happy Hour',
  location: 'The Bar, New York, NY',
  description: 'Let\'s blow off some steam from our weekly deployments to enjoy a tall cold one!',
  start: '20190704T190000',
  end: '20190704T210000',
  recurrence: {
    frequency: 'WEEKLY'
    interval: 2
  }
})

icalendar.download()
```

## Available classes

* [`YahooCalendar`](https://jshor.github.io/datebook/class/src/YahooCalendar.js~YahooCalendar.html)
* [`GoogleCalendar`](https://jshor.github.io/datebook/class/src/GoogleCalendar.js~GoogleCalendar.html)
* [`ICalendar`](https://jshor.github.io/datebook/class/src/ICalendar.js~ICalendar.html)
* [`OutlookCalendar`](https://jshor.github.io/datebook/class/src/OutlookCalendar.js~OutlookCalendar.html)
* [`CalendarBase`](https://jshor.github.io/datebook/class/src/CalendarBase.js~CalendarBase.html) (for creating new services)

## Bugs

Please report all bugs [here](https://github.com/jshor/angular-addtocalendar/issues).

## Changelog

Available [here](https://github.com/jshor/angular-addtocalendar/blob/master/CHANGELOG.md).
