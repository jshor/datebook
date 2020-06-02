# Date formats

Dates must be formatted as [ISO 8601](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString). Dates not formatted this way will result in `NaN` returned as start and/or end times.

From the [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString):

> [The] simplified extended ISO format (ISO 8601), is always 24 or 27 characters long (`YYYY-MM-DDTHH:mm:ss.sssZ` or `±YYYYYY-MM-DDTHH:mm:ss.sssZ`, respectively). The timezone is always zero UTC offset, as denoted by the suffix "Z."

## Valid date examples

* `2021-07-04T21:20:15:00.000Z`
* `2021-07-04T21:20:15:00.000+05:00` (+500 timezone)
* `2021-07-04T21:20:15`
* `2021-07-04`