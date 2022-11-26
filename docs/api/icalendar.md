
# `ICalendar(options: CalendarOptions)`

Generates an iCalendar instance.

* **`options: CalendarOptions`** - Basic calendar [configuration options](/config/basic.md).

### Example

```ts
const options: CalendarOptions = {
  title: 'Happy Hour',
  location: 'The Bar, New York, NY',
  description: 'Let\'s blow off some steam with a tall cold one!',
  start: new Date('2022-07-08T19:00:00'),
  end: new Date('2022-07-08T23:30:00'),
  recurrence: {
    frequency: 'WEEKLY',
    interval: 2
  }
}

const icalendar = new ICalendar(options)
```

## `addEvent(icalendar: ICalendar)` <Badge text="6.0.0" vertical="middle" />

* **`icalendar: ICalendar`** - `ICalendar` instance of the event to add

This method allows you to add multiple events to a single `.ics` file. Returns the `ICalendar` instance.

### Example

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

## `addAlarm(alarm: Alarm)` <Badge text="6.0.0" vertical="middle" />

Adds an alarm. Multiple different alarms may be added to a single instance. Returns the `ICalendar` instance.

* **`alarm: Alarm`** - [Alarm options](../config/alarms.md).


### Example

```ts
const alarm1: Alarm = {
  action: 'DISPLAY',
  trigger: new Date('1998-01-01T05:00:00Z'),
  description: 'The first alarm description',
  summary: 'The first alarm summary',
  summary: 'a quick summary',
  duration: {
    after: true,
    minutes: 3
  }
}

const alarm2: Alarm = {
  action: 'DISPLAY',
  description: 'The second alarm description',
  summary: 'The second alarm summary',
  trigger: {
    minutes: 5
  },
  duration: {
    after: true,
    minutes: 3
  }
}

calendar
  .addAlarm(alarm1)
  .addAlarm(alarm2)
  .render()
```

#### Result:

```
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
CLASS:PUBLIC
DESCRIPTION:Let's blow off some steam with a tall cold one!
DTSTART:20220708T190000
DTEND:20220708T230000
LOCATION:The Bar, New York, NY
SUMMARY:Happy Hour
BEGIN:VALARM
ACTION:DISPLAY
DESCRIPTION:The first alarm description
SUMMARY:The first alarm summary
DURATION:PT3M
TRIGGER;VALUE=DATE-TIME:19980101T050000Z
END:VALARM
BEGIN:VALARM
ACTION:DISPLAY
DESCRIPTION:The second alarm description
SUMMARY:The second alarm summary
DURATION:
TRIGGER:-PT5M
DURATION:PT3M
END:VALARM
TRANSP:TRANSPARENT
UID:19hq3v1lm15
DTSTAMP:20200916T000000
END:VEVENT
PRODID:datebook.dev
END:VCALENDAR
```

## `setMeta(key: string, value: string)` <Badge text="6.0.0" vertical="middle" />

Sets iCalendar meta properties, such as `UID`, `DTSTAMP`, etc. Returns the `ICalendar` instance.

* **`key: string`** - iCalendar meta property key.
* **`value: string`** - Value of the meta property.

### Example

```ts
calendar
  .setMeta('UID', 'e9de89b0a5e9ad6efd5e5ab543ec617c')
  .render()
```

## `addProperty(key: string, value: ICSPropertyValue)` <Badge text="6.0.0" vertical="middle" />

Adds any additional desired iCalendar event property having the given key-value pair to the instance. Returns the `ICalendar` instance.

* **`key: string`** - iCalendar event property name.
* **`value: Record<string, any> | string | number`** - A key-value subset of properties, or a valid value.


### Example

```ts
calendar
  .addProperty('CATEGORIES', 'RECREATION,TEAM-BUILDING')
  .render()
```

#### Result:

```
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
CLASS:PUBLIC
DESCRIPTION:Let's blow off some steam with a tall cold one!
DTSTART:20220708T190000
DTEND:20220708T230000
LOCATION:The Bar, New York, NY
SUMMARY:Happy Hour
TRANSP:TRANSPARENT
CATEGORIES:RECREATION,TEAM-BUILDING
UID:19hq3v1lm15
DTSTAMP:20200916T000000
END:VEVENT
PRODID:datebook.dev
END:VCALENDAR
```

## `render()`

Returns a generated [iCalendar](https://icalendar.org/) file content string containing the event details.

```ts
calendar.render()
```

#### Result:

```
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
CLASS:PUBLIC
DESCRIPTION:Let's blow off some steam with a tall cold one!
DTSTART:20220708T190000
DTEND:20220708T230000
LOCATION:The Bar, New York, NY
SUMMARY:Happy Hour
TRANSP:TRANSPARENT
RRULE:FREQ=DAILY;INTERVAL=1
UID:19hq3v1lm15
DTSTAMP:20200916T000000
END:VEVENT
PRODID:datebook.dev
END:VCALENDAR
```

### Example for downloading an ICS file

Once an ICS file string is rendered, you can use [FileSaver.js](https://www.npmjs.com/package/file-saver) or a similar library to locally download the ICS file onto the user's device.

```ts
import * as FileSaver from 'file-saver'

const ics = calendar.render()
const blob = new Blob([ics], {
  type: 'text/calendar'
})

FileSaver.saveAs(blob, 'my-calendar-event.ics')
```

## `download(fileName?: string)` <Badge text="Deprecated" type="warning" vertical="middle" />

* **`fileName: string`** - optional file name

Downloads a `.ics` file on the user's browser for use in local calendars and email clients.

:::warning Deprecation Notice
This feature is deprecated and will be removed in v8.
:::
