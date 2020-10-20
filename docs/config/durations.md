# Durations <Badge text="6.0.0" vertical="middle" />

`ICSDuration`s are objects that represent timespans before or after an iCalendar event date. They can be used to trigger [alarms](#alarms).

## after

* Type: `boolean`
* Required: no

If `true`, sets the duration to be *after* the event date. Otherwise, it defaults to *before* the date (a negative duration).

## weeks

* Type: `number`
* Required: no
* Valid value: a positive integer

The number of weeks the duration spans.

## days

* Type: `number`
* Required: no
* Valid value: a positive integer

The number of days the duration spans.

## hours

* Type: `number`
* Required: no
* Valid value: a positive integer

The number of hours the duration spans.

## minutes

* Type: `number`
* Required: no
* Valid value: a positive integer

The number of minutes the duration spans.

## seconds

* Type: `number`
* Required: no
* Valid value: a positive integer

The number of seconds the duration spans.
