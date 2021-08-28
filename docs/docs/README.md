# Documentation

Datebook supports the creation of `.ics` files for iCalendar and Office Outlook, and also supports Google Calendar, Yahoo! Calendar and Outlook Online.

## Demo

Try the [online calendar generators →](/generators/)

## Basic Usage

### Installation

```sh
yarn add datebook
```

### Example Usage

```ts
import { ICalendar } from 'datebook'

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
import { GoogleCalendar } from 'datebook'

const googleCalendar = new GoogleCalendar(config)

googleCalendar.render()
```

`googleCalendar.render()` will return a URL that the user can navigate to and pre-fill event details:

```
https://calendar.google.com/calendar/render?action=TEMPLATE&text=Happy%20Hour&details=Let's%20blow%20off%20some%20steam%20with%20a%20tall%20cold%20one!&location=The%20Bar%2C%20New%20York%2C%20NY&dates=20220708T190000%2F20220708T230000&recur=RRULE%3AFREQ%3DWEEKLY%3BINTERVAL%3D1
```

## Via `<script>` import

Datebook can also be used via script import. CDNs such as [jsdelivr](https://www.jsdelivr.com/package/npm/datebook) can be used to host Datebook for your project.

### Example

```html
<!doctype html>
<html>
  <head>
    <script src="https://cdn.jsdelivr.net/npm/datebook"></script>
  </head>
  <body>
    <script>
      const ical = new datebook.ICalendar({
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
      })

      ical.download()
    </script>
  </body>
</html>
```
