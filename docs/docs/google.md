# `GoogleCalendar(options: CalendarOptions)`

Generates a Google Calendar instance.

* **`options: CalendarOptions`** - Basic calendar [configuration options](/config/basic.md).

```ts
import { GoogleCalendar } from 'datebook'

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

const yahooCalendar = new GoogleCalendar(options)
```

## `render()`

Returns a [Google Calendar](https://calendar.google.com/) URL to a page that autofills a form in the online Gmail Calendar app with the event details.

### Example

```ts
googleCalendar.render()
```

##### Result:

```
https://calendar.google.com/calendar/render?action=TEMPLATE&text=Happy%20Hour&details=Let's%20blow%20off%20some%20steam%20with%20a%20tall%20cold%20one!&location=The%20Bar%2C%20New%20York%2C%20NY&dates=20220708T190000%2F20220708T230000&recur=RRULE%3AFREQ%3DWEEKLY%3BINTERVAL%3D1
```

This will open a form in Google Calendar similar to the following:

![Google Calendar result](/assets/screenshots/google.png)
