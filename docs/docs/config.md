# Config Options

----------

## Basic Config

### title

* Type: `string`
* Required: no
* Default: (Empty string)

The event title (i.e., summary). Line breaks are automatically stripped.

### description

* Type: `string`
* Required: no
* Default: (Empty string)

The event description. Line breaks are automatically converted to `\n`.

### location

* Type: `string`
* Required: no
* Default: (Empty string)

A summary description of the event location. Line breaks are automatically stripped.

### start

* Type: [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) (<Badge text=">= 5.0.0"/>), or `string` (deprecated)
* Required: **yes**
* Valid value: a valid `Date` reference, or any [ISO 8601](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString) value (deprecated).

The event start timestamp. See [date formats](date.md) for more information.

### end

* Type: [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) (<Badge text=">= 5.0.0"/>), or `string` (deprecated)
* Required: **yes**, if not an all-day event
* Valid value: a valid `Date` reference, or any [ISO 8601](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString) value (deprecated).

The event end timestamp. For all-day events, this field should be omitted. See [date formats](date.md) for more information.

## Recurrence

The recurrence of an event is how often the event is supposed to occur. Some examples of this could be:

* an event that occurs once every Friday
* an event that occurs every other week
* an event that occurs daily for five days

Recurrence is **optional**.

:::warning Note
This feature is not supported in Outlook online calendars.
:::

### recurrence.frequency

* Type: `string`
* Required: no
* Valid value: any of `DAILY`, `WEEKLY`, `MONTHLY`, of `YEARLY`

The Julian interval of how often this event should occur. The interval (i.e., the time between recurrences) is dictated by [`interval`](#recurrence-interval).

### recurrence.interval

* Type: `number`
* Required: no
* Valid value: any positive integer

The amount of time that will occur between recurrences. The scale of the time depends on [`frequency`](#recurrence-frequency).

:::tip Examples
* An event that occurs once every day: `{ frequency: 'DAILY', interval: 1 }`
* An event that occurs once every second Friday: `{ frequency: 'WEEKLY', interval: 2 }`
* An event that occurs once every three months: `{ frequency: 'MONTHLY', interval: 3 }`
:::

### recurrence.count

* Type: `number`
* Required: no
* Valid value: any positive integer

The maximum number of times the event should repeat.

:::warning Important
If this parameter is specified in conjunction with [`end`](#recurrence-end), the recurrence will end either when `count` is completed, or when `end` occurs, whichever happens first.
:::

### recurrence.end

* Type: [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) (<Badge text=">= 5.0.0"/>), or `string` (deprecated)
* Required: no
* Valid value: a valid `Date` reference, or any [ISO 8601](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString) value (deprecated).

The latest date that this event may occur on. See [time formats](date.md) for more information.

:::warning Important
If this parameter is specified in conjunction with [`end`](#recurrence-end), the recurrence will end either when `count` is completed, or when `end` occurs, whichever happens first.
:::

### recurrence.weekdays

* Type: `string[]`
* Required: no
* Valid value: an array containing any non-repeating strings of `SU`, `MO`, `TU`, `WE`, `TH`, `FR` or `SA`, optionally prefixed by an integer.

The days of the week that the event should occur on. The interval (i.e., the time between recurrences) is dictated by [`interval`](#recurrence-interval).

These days may be prefixed with a non-zero integer to represent the occurrence to fall on the `n`th day. Negative integers may be used to represent the `n`th *last* day. Defaults to `1` if no integer prefix is specified.

:::tip Examples
* The first Sunday of the month: `SU`
* The second Wednesday of the month: `2WE`
* The *last* Friday of the month: `-1FR`
* The *second-to-last* Thursday of the month: `-2TH`
:::

:::warning Important
* The [`frequency`](#recurrence-frequency) parameter must be set to `WEEKLY` or `MONTHLY` for `weekdays` to take effect.
* In `MONTHLY` mode, Yahoo! Calendar only supports one **nonnegative** weekday.
:::

:::danger Caution when specifying weekdays using Yahoo! Calendar in MONTHLY mode
Only the first **nonnegative** *n*th-day(s) prefix is taken into account, and used for the rest of the days of the week specified.

For example, if you pass in `['2FR', '1TU']` (every second Friday and every first Tuesday), it would fall back to `['2FR', 'TU`]` (**every second Friday** *and* **every second Tuesday**) instead.
:::

### recurrence.monthdays

* Type: `number[]`
* Required: no
* Valid value: an array of any non-repeating, positive integers between `1` and `31`

The days of the month that the event should occur on. The interval (i.e., the time between recurrences) is dictated by [`interval`](#recurrence-interval).

:::warning Important
* The [`frequency`](#recurrence-frequency) parameter must be set to `MONTHLY` for `monthdays` to take effect.
* Non-existent days (e.g., February 30) will be ignored.
:::

### recurrence.weekstart

The day of the week to denote when the the week starts on.

#### Example with end-of-month skipping

An example where the days generated makes a difference because of `weekstart`:

```js
{
  frequency: 'WEEKLY',
  interval: 2,
  count: 4,
  weekdays: ['TU', 'SU'],
  weekstart: 'MO'
}
```

This will generate a recurrence that occurs on August 5, 10, 19, and 24.

However, changing `weekstart` from `MO` to `SU`:

```js
{
  frequency: 'WEEKLY',
  interval: 2,
  count: 4,
  weekdays: ['TU', 'SU'],
  weekstart: 'SU'
}
```

This will instead generate a recurrence that occurs on August 5, 10, 19, and 31.

#### Example with invalid dates ignored

In the following example, the invalid date of February 30 will be ignored.

```js
{
  frequency: 'MONTHLY',
  interval: 2,
  count: 4,
  monthdays: [15, 30],
  weekstart: 'SU'
}
```

This will generate recurrences on the following dates:

* January 15 and 30
* February 15
* March 15, 30
