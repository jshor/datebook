# API

The following classes are available for creating calendars. See [Basic Usage](README.md) for docs on how to get started, or [Config Options](config.md) for the constructor configuration schema.

[Try Datebook online →](generators/README.md)

## `ICalendar(options)`

Generates an iCalendar Calendar instance.

### `render()`

Returns a generated [iCalendar](https://icalendar.org/) file content string containing the event details.

### `download()`

Downloads a `.ics` file on the user's browser for use in local calendars and email clients.

#### Example

```js
import { ICalendar } from 'datebook'

const calendar = new ICalendar({
  title: 'Happy Hour',
  location: 'The Bar, New York, NY',
  description: 'Let\'s blow off some steam with a tall cold one!',
  start: new Date('2022-07-08T19:00:00'),
  end: new Date('2022-07-08T23:30:00'),
  recurrence: {
    frequency: 'WEEKLY',
    interval: 2
  }
})

calendar.render()
```

##### Result:

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
END:VEVENT
END:VCALENDAR
UID:19hq3v1lm15
DTSTAMP:20200916
PRODID:datebook.dev
```

## `YahooCalendar(options)`

Generates a Yahoo! Calendar instance.

### `render()`

Returns a [Yahoo! Calendar](https://calendar.yahoo.com/) URL to a page that autofills a form in the online Yahoo! Calendar app with the event details.

#### Example

```js
import { YahooCalendar } from 'datebook'

const yahooCalendar = new YahooCalendar({
  title: 'Happy Hour',
  location: 'The Bar, New York, NY',
  description: 'Let\'s blow off some steam with a tall cold one!',
  start: new Date('2022-07-08T19:00:00'),
  end: new Date('2022-07-08T23:30:00'),
  recurrence: {
    frequency: 'WEEKLY',
    interval: 2
  }
})

yahooCalendar.render()
```

##### Result:

```
https://calendar.yahoo.com/?v=60&title=Happy%20Hour&desc=Let's%20blow%20off%20some%20steam%20with%20a%20tall%20cold%20one!&in_loc=The%20Bar%2C%20New%20York%2C%20NY&st=20220708T190000&dur=0400&RPAT=01Wk&REND=20220708
```

This will open a modal in Yahoo! Calendar similar to the following:

![Yahoo! Calendar result](/assets/screenshots/yahoo.png)

## `GoogleCalendar(options)`

Generates a Google Calendar instance.

### `render()`

Returns a [Gmail Calendar](https://calendar.google.com/) URL to a page that autofills a form in the online Gmail Calendar app with the event details.

#### Example

```js
import { GoogleCalendar } from 'datebook'

const googleCalendar = new GoogleCalendar({
  title: 'Happy Hour',
  location: 'The Bar, New York, NY',
  description: 'Let\'s blow off some steam with a tall cold one!',
  start: new Date('2022-07-08T19:00:00'),
  end: new Date('2022-07-08T23:30:00'),
  recurrence: {
    frequency: 'WEEKLY',
    interval: 2
  }
})

googleCalendar.render()
```

##### Result:

```
https://calendar.google.com/calendar/render?action=TEMPLATE&text=Happy%20Hour&details=Let's%20blow%20off%20some%20steam%20with%20a%20tall%20cold%20one!&location=The%20Bar%2C%20New%20York%2C%20NY&dates=20220708T190000%2F20220708T230000&recur=RRULE%3AFREQ%3DWEEKLY%3BINTERVAL%3D1
```

This will open a form in Gmail similar to the following:

![Google Calendar result](/assets/screenshots/google.png)

## `OutlookCalendar(options)`

Generates an Outlook Online Calendar instance.

### `render()`

Returns an [Outlook Online Calendar](https://calendar.yahoo.com/) URL to a page autofills a form in the online Outlook Online Calendar app with the event details.

#### Example

```js
import { OutlookCalendar } from 'datebook'

const outlookCalendar = new OutlookCalendar({
  title: 'Happy Hour',
  location: 'The Bar, New York, NY',
  description: 'Let\'s blow off some steam with a tall cold one!',
  start: new Date('2022-07-08T19:00:00'),
  end: new Date('2022-07-08T23:30:00'),
  recurrence: {
    frequency: 'WEEKLY',
    interval: 2
  }
})

outlookCalendar.render()
```

##### Result:

```
https://outlook.live.com/calendar/0/deeplink/compose?path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=2022-07-08T19%3A00%3A00&enddt=2022-07-08T23%3A00%3A00&subject=Happy%20Hour&body=Let's%20blow%20off%20some%20steam%20with%20a%20tall%20cold%20one!&location=The%20Bar%2C%20New%20York%2C%20NY&allday=false
```

This will open a modal in Outlook Online calendar similar to the following:

![Outlook Online Calendar result](/assets/screenshots/outlook.png)


