# Basic Config

## title

* Type: `string`
* Required: no
* Default: (Empty string)

The event title (i.e., summary). Line breaks are automatically stripped.

## description

* Type: `string`
* Required: no
* Default: (Empty string)

The event description. Line breaks are automatically converted to `\n`.

## location

* Type: `string`
* Required: no
* Default: (Empty string)

A summary description of the event location. Line breaks are automatically stripped.

## start

* Type: [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
* Required: **yes**
* Valid value: a valid `Date` reference

The event start timestamp.

## end

* Type: [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
* Required: **yes**, if not an all-day event
* Valid value: a valid `Date` reference

The event end timestamp. For all-day events, this field should be omitted.

## recurrence

* Type: [`CalendarRecurrence`](recurrence.md)
* Required: no
* Valid value: a valid `CalendarRecurrence` object

The specification for when the event should repeat. See [CalendarRecurrence](recurrence.md) for more information.

:::warning Note
This feature is not supported in Yahoo or Outlook online calendars.
:::

## attendees <Badge text="6.2.3" vertical="middle" />

* Type: [`CalendarAttendee[]`](attendees.md)
* Required: no
* Valid value: an array of valid `CalendarAttendee` objects

A list of attendees for the event. See [CalendarAttendee](attendees.md) for more information.
