# Date formats

Dates, including `options.start`, `options.end`, and `recurrence.end`, should be passed in as JavaScript [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) objects. This provides full control over the date, including the specification of timezones.

## Legacy date support <Badge text="deprecated" type="warning" /> <Badge text="<= 4.1.11" />

For backwards compatibility, you may still provide the date as a `string` formatted as [ISO 8601](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString). Dates not formatted this way will result in `NaN` returned as start and/or end times.

From the [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString):

> [The] simplified extended ISO format (ISO 8601), is always 24 or 27 characters long (`YYYY-MM-DDTHH:mm:ss.sssZ` or `±YYYYYY-MM-DDTHH:mm:ss.sssZ`, respectively). The timezone is always zero UTC offset, as denoted by the suffix "Z."

:::danger Deprecation Notice
Specifying dates as strings is deprecated and has been removed in version **5.0.0**.
:::

## Valid date examples

* `2021-07-04T21:20:15:00.000Z`
* `2021-07-04T21:20:15:00.000+05:00` (+500 timezone)
* `2021-07-04T21:20:15`
* `2021-07-04`
