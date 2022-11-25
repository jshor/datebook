# `YahooCalendar(options: CalendarOptions)`

Generates a Yahoo! Calendar instance.

* **`options: CalendarOptions`** - Basic calendar [configuration options](/config/basic.md).

### Example

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

## `setParam(key: string, value: string): YahooCalendar`

Sets a parameter on the URL. This may be used to either set additional optional properties, or override existing ones. Pass a value of `null` to remove an existing property.

Returns the `YahooCalendar` instance.

### Additional properties

* **in_st** - Event location street address.
* **in_csz** - Event location city, state, and zip.
* **in_ph** - Event location phone number.

### Example

```ts
yahooCalendar
  .setParam('in_st', '1 Main St.')
  .setParam('in_csz', 'New York, NY, 10001')
  .setParam('in_ph', '555-555-5555')
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
