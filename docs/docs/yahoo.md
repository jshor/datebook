# `YahooCalendar(options: CalendarOptions)`

Generates a Yahoo! Calendar instance.

* **`options: CalendarOptions`** - Basic calendar [configuration options](/config/basic.md).

```ts
import { YahooCalendar } from 'datebook'

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

const yahooCalendar = new YahooCalendar(options)
```

## `render()`

Returns a [Yahoo! Calendar](https://calendar.yahoo.com/) URL to a page that autofills a form in the online Yahoo! Calendar app with the event details.

### Example

```ts
yahooCalendar.render()
```

#### Result:

```
https://calendar.yahoo.com/?v=60&title=Happy%20Hour&desc=Let's%20blow%20off%20some%20steam%20with%20a%20tall%20cold%20one!&in_loc=The%20Bar%2C%20New%20York%2C%20NY&st=20220708T190000&dur=0400&RPAT=01Wk&REND=20220708
```

This will open a modal in Yahoo! Calendar similar to the following:

![Yahoo! Calendar result](/assets/screenshots/yahoo.png)
