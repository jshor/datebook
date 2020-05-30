# Documentation

Datebook supports the creation of `.ics` files for iCalendar and Office Outlook, and also supports Google Calendar, Yahoo! Calendar and Outlook Online.

## Basic Usage

### Installation

```sh
yarn add datebook
```

### Quick Example

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