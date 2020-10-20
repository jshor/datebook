
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

The event start timestamp. See [date formats](date.md) for more information.

## end

* Type: [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
* Required: **yes**, if not an all-day event
* Valid value: a valid `Date` reference

The event end timestamp. For all-day events, this field should be omitted. See [date formats](date.md) for more information.

## recurrence

* Type: [`CalendarRecurrence`](recurrence.md)
* Required: no
* Valid value: a valid `CalendarRecurrence` object

The specification for when the event should repeat. See [CalendarRecurrence](recurrence.md) for more information.
