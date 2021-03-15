# `OutlookCalendar(options: CalendarOptions)`

Generates an Outlook Online Calendar instance.

* **`options: CalendarOptions`** - Basic calendar [configuration options](/config/basic.md).

```ts
import { OutlookCalendar } from 'datebook'

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

const outlookCalendar = new OutlookCalendar(options)
```

## `setHost(host: string): OutlookCalendar`

Sets the host service type. The default host for Outlook is **`live`**.

Returns the `OutlookCalendar` instance.

### Valid hosts

* **`live`** - For personal Outlook accounts (default).
* **`office`** - For Office365 Outlook accounts.

### Example

```ts
outlookCalendar.setHost('outlook.office.com')
```

## `setParam(key: string, value: string): OutlookCalendar`

Sets a parameter on the URL. This may be used to either set additional optional properties, or override existing ones. Pass a value of `null` to remove an existing property.

Returns the `OutlookCalendar` instance.

### Additional properties

* **online** - Whether or not this meeting is an online (i.e., Skype) meeting. Set to any value except `null` for this property to take effect.

### Example

```ts
outlookCalendar.setParam('online', 'true')
```

## `render()`

Returns an [Outlook Online Calendar](https://calendar.yahoo.com/) URL to a page autofills a form in the online Outlook Online Calendar app with the event details.

### Example

```ts
outlookCalendar.render()
```

#### Result:

```
https://outlook.live.com/calendar/0/deeplink/compose?path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=2022-07-08T19%3A00%3A00&enddt=2022-07-08T23%3A00%3A00&subject=Happy%20Hour&body=Let's%20blow%20off%20some%20steam%20with%20a%20tall%20cold%20one!&location=The%20Bar%2C%20New%20York%2C%20NY&allday=false
```

This will open a modal in Outlook Online calendar similar to the following:

![Outlook Online Calendar result](/assets/screenshots/outlook.png)
