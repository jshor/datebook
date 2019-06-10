# Datebook

A library for adding events to calendar apps. It supports .ics files for iCalendar and Office Outlook, and also supports Google Calendar, Yahoo! Calendar and Outlook Online.

[![Coverage Status](https://coveralls.io/repos/github/jshor/angular-addtocalendar/badge.svg?branch=master)](https://coveralls.io/github/jshor/angular-addtocalendar?branch=master)
[![Build Status](https://travis-ci.org/jshor/angular-addtocalendar.svg?branch=master)](https://travis-ci.org/jshor/angular-addtocalendar) [![npm version](https://badge.fury.io/js/angular-addtocalendar.svg)](https://badge.fury.io/js/angular-addtocalendar)
[![License](http://img.shields.io/:license-mit-blue.svg)](http://doge.mit-license.org)
[![dependency Status](https://david-dm.org/jshor/angular-addtocalendar/status.png)](https://david-dm.org/jshor/angular-addtocalendar#info=dependencies)

## Documentation

See the [full documentation here]()

## Quick start

```sh
yarn add datebook
```

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

* [`YahooCalendar`]()
* [`GoogleCalendar`]()
* [`ICalendar`]()
* [`OutlookCalendar`]()
* [`CalendarBase`]() (for creating new services)

## Bugs

Please report all bugs [here](https://github.com/jshor/angular-addtocalendar/issues).

## Changelog

Available [here](https://github.com/jshor/angular-addtocalendar/blob/master/CHANGELOG.md).
