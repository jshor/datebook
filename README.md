<p align="center">
  <a href="https://datebook.dev/">
    <img src="https://datebook.dev/assets/logo.svg" width="200" height="200" />
  </a>

  <h1 style="text-align: center;" align="center">Datebook</h1>
</p>

<p align="center">A library for adding events to popular calendar apps.</p>

<p align="center">It provides full support for rendering .ics file content for iCalendar and Office Outlook, and also supports URL generation for Google Calendar, Yahoo! Calendar, and Outlook Web.</p>

<br>

<p align="center">
  <a href="https://codecov.io/gh/jshor/datebook"><img
    src="https://img.shields.io/codecov/c/github/jshor/datebook.svg?style=for-the-badge"
    alt="Code coverage"
  /></a> <a href="https://github.com/jshor/datebook/actions/workflows/merge.yml"><img
    src="https://img.shields.io/github/actions/workflow/status/jshor/datebook/merge.yml?branch=main&style=for-the-badge"
    alt="Build status"
  /></a> <a href="https://npmjs.com/package/datebook"><img
    src="http://img.shields.io/npm/v/datebook.svg?style=for-the-badge"
    alt="npm version"
  /></a> <a href="https://bundlephobia.com/result?p=datebook"><img
    src="https://img.shields.io/bundlephobia/minzip/datebook?style=for-the-badge"
    alt="npm package size"
  /></a>
</p>

<br>

## Documentation

[Read the docs →](https://datebook.dev/start)

## Demo

Try the [online calendar generator →](https://datebook.dev/generator/)

## Quick Start

### Installation

```sh
yarn add datebook
```

### Examples

```ts
import { ICalendar } from 'datebook'

const config: CalendarOptions = {
  title: 'Happy Hour',
  location: 'The Bar, New York, NY',
  description: 'Let\'s blow off some steam with a tall cold one!',
  start: new Date('2022-07-08T19:00:00'),
  end: new Date('2022-07-08T23:30:00'),
  attendees: [
    {
      name: 'John Doe',
      email: 'john@doe.com',
      icsOptions: {
        rsvp: true
      }
    },
    {
      name: 'Jane Doe',
      email: 'jane@doe.com'
    }
  ],
  // an event that recurs every two weeks:
  recurrence: {
    frequency: 'WEEKLY',
    interval: 2
  }
}

const icalendar = new ICalendar(config)
```

#### iCalendar

##### With a reminder

```ts
icalendar
  .addAlarm({
    action: 'DISPLAY',
    description: 'Remember this event'
    trigger: {
      minutes: 10
    }
  })
```

This will add a [reminder alarm](https://datebook.dev/config/alarms.html) that shows 10 minutes before the event.

##### With multiple events

```ts
const secondEvent = new ICalendar({
  title: 'Monthly Meeting with Boss Man',
  location: 'Conference Room 2A, Big Company, Brooklyn, NY',
  description: 'Meeting to discuss weekly things',
  start: new Date('2022-07-08T19:00:00'),
  recurrence: {
    frequency: 'MONTHLY'
  }
})

icalendar.addEvent(secondEvent)
```

This will add a [second event](https://datebook.dev/api/icalendar.html#addevent-icalendar-icalendar) to the same `.ics` file.

##### Adding other ICS properties

```ts
icalendar.addProperty('CATEGORIES', 'MEETINGS,MANAGEMENT')
```

This will [add the `CATEGORIES` ICS property](https://datebook.dev/api/icalendar.html#addproperty-key-string-value-icspropertyvalue) to the iCalendar instance.

##### Rendering ICS file content

```ts
const content = icalendar.render()
```

This will render ICS file content which can be [downloaded onto the user's device](https://datebook.dev/api/icalendar.html#example-for-downloading-an-ics-file) for use in local calendar apps.

#### Google Calendar

```ts
const googleCalendar = new GoogleCalendar(config)

googleCalendar.render()
```

[`googleCalendar.render()`](https://datebook.dev/api/google.html#render) will return a URL that the user can navigate to and pre-fill event details:

```
https://calendar.google.com/calendar/render?action=TEMPLATE&text=Happy%20Hour&details=Let's%20blow%20off%20some%20steam%20with%20a%20tall%20cold%20one!&location=The%20Bar%2C%20New%20York%2C%20NY&dates=20220708T190000%2F20220708T230000&recur=RRULE%3AFREQ%3DWEEKLY%3BINTERVAL%3D1
```
