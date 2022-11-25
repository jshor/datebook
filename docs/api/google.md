# `GoogleCalendar(options: CalendarOptions)`

Generates a Google Calendar instance.

* **`options: CalendarOptions`** - Basic calendar [configuration options](/config/basic.md).

### Example

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

const googleCalendar = new GoogleCalendar(options)
```

## `setParam(key: string, value: string): GoogleCalendar`

Sets a parameter on the URL. This may be used to either set additional optional properties, or override existing ones. Pass a value of `null` to remove an existing property.

Returns the `GoogleCalendar` instance.

### Additional properties

* **crm** - *Customer Relationship Management*, as to how the event appears on the calendar. May be set to `AVAILABLE`, `BUSY`, or `BLOCKING`.
* **trp** - [Transparency](https://tools.ietf.org/html/rfc5545#section-3.8.2.7), to show an attendee as busy (`true`) or available (`false`).
* **src** - The email address source Google calendar to add this event to.

### Example

```ts
googleCalendar
  .setParam('crm', 'BUSY')
  .setParam('trp', 'true')
  .setParam('src', 'johndoe@example.com')
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
