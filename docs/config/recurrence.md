# Recurrences

The `CalendarRecurrence` object specifies how often the event is supposed to occur. Some examples of this could be:

* an event that occurs once every Friday
* an event that occurs every other week
* an event that occurs daily for five days

Recurrence is **optional**.

:::warning Note
This feature is not supported in Outlook online calendars.
:::

## frequency

* Type: `string`
* Required: no
* Valid value: any of `DAILY`, `WEEKLY`, `MONTHLY`, or `YEARLY`

The Julian interval of how often this event should occur. The interval (i.e., the time between recurrences) is dictated by [`interval`](#interval).

## interval

* Type: `number`
* Required: no
* Valid value: any positive integer

The amount of time that will occur between recurrences. The scale of the time depends on [`frequency`](#frequency).

:::tip Examples
* An event that occurs once every day: `{ frequency: 'DAILY', interval: 1 }`
* An event that occurs once every second Friday: `{ frequency: 'WEEKLY', interval: 2 }`
* An event that occurs once every three months: `{ frequency: 'MONTHLY', interval: 3 }`
:::

## count

* Type: `number`
* Required: no
* Valid value: any positive integer

The maximum number of times the event should repeat.

:::warning Important
If this parameter is specified in conjunction with [`end`](#end), the recurrence will end either when `count` is completed, or when `end` occurs, whichever happens first.
:::

## end

* Type: [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
* Required: no
* Valid value: a valid `Date` reference

The latest date that this event may occur on.

:::warning Important
If this parameter is specified in conjunction with [`end`](#end), the recurrence will end either when `count` is completed, or when `end` occurs, whichever happens first.
:::

## weekdays

* Type: `string[]`
* Required: no
* Valid value: an array containing any non-repeating strings of `SU`, `MO`, `TU`, `WE`, `TH`, `FR` or `SA`, optionally prefixed by an integer.

The days of the week that the event should occur on. The interval (i.e., the time between recurrences) is dictated by [`interval`](#interval).

These days may be prefixed with a non-zero integer to represent the occurrence to fall on the `n`th day. Negative integers may be used to represent the `n`th *last* day. Defaults to `1` if no integer prefix is specified.

:::tip Examples
* The first Sunday of the month: `SU`
* The second Wednesday of the month: `2WE`
* The *last* Friday of the month: `-1FR`
* The *second-to-last* Thursday of the month: `-2TH`
:::

:::warning Important
* The [`frequency`](#frequency) parameter must be set to `WEEKLY` or `MONTHLY` for `weekdays` to take effect.
* In `MONTHLY` mode, Yahoo! Calendar only supports one **nonnegative** weekday.
:::

:::danger Caution when specifying weekdays using Yahoo! Calendar in MONTHLY mode
Only the first **nonnegative** *n*th-day(s) prefix is taken into account, and used for the rest of the days of the week specified.

For example, if you pass in `['2FR', '1TU']` (every second Friday and every first Tuesday), it would fall back to `['2FR', 'TU`]` (**every second Friday** *and* **every second Tuesday**) instead.
:::

## monthdays

* Type: `number[]`
* Required: no
* Valid value: an array of any non-repeating, positive integers between `1` and `31`

The days of the month that the event should occur on. The interval (i.e., the time between recurrences) is dictated by [`interval`](#interval).

:::warning Important
* The [`frequency`](#frequency) parameter must be set to `MONTHLY` for `monthdays` to take effect.
* Non-existent days (e.g., February 30) will be ignored.
:::

## weekstart

The day of the week to denote when the the week starts on.

### Example with end-of-month skipping

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

### Example with invalid dates ignored

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
