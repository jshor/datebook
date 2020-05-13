# Parameters

## Common event details

The following common parameters are utilized across all calendar apps:

| Attribute            | Description                                                                                        | Type                | Required? | Example              |
|----------------------|----------------------------------------------------------------------------------------------------|---------------------|-----------|----------------------|
| title                | Title of the event                                                                                 | `String`            | Yes       | `Happy Hour`         |
| description          | Summary of the event                                                                               | `String`            | Yes       | `Come enjoy drinks!` |
| location             | Event location                                                                                     | `String`            | Yes       | `The Bar, NYC`       |
| start-date           | Timestamp that the event starts on                                                                      | [ISO 8601](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString) `String`      | Yes       | `2021-07-04T19:00:00`    |
| end-date           | Timestamp that the event ends on. Omit for an all-day event                                                                      | [ISO 8601](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString) `String`      | Yes       | `2021-07-04T21:00:00`    |

## Date format

Dates must be formatted as [ISO 8601](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString). Dates not formatted this way will result in `NaN` returned as start and/or end times.

From the [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString):

> [The] simplified extended ISO format (ISO 8601), is always 24 or 27 characters long (`YYYY-MM-DDTHH:mm:ss.sssZ` or `±YYYYYY-MM-DDTHH:mm:ss.sssZ`, respectively). The timezone is always zero UTC offset, as denoted by the suffix "Z".

### Valid date examples

* `2021-07-04T21:20:15:00.000Z`
* `2021-07-04T21:20:15:00.000+05:00` (+500 timezone)
* `2021-07-04T21:20:15`
* `2021-07-04`

## Recurrence parameters


| Attribute            | Description                                                                                        | Type                | Required? | Example              |
|----------------------|----------------------------------------------------------------------------------------------------|---------------------|-----------|----------------------|
| frequency | Event frequency; `DAILY`, `WEEKLY`, `MONTHLY`, `YEARLY`                                            | `String`              | No        | `DAILY`              |
| interval  | Time between recurrences                                                                           | `Integer`           | No        | `2`                  |
| count     | Number of times the event should repeat                                                            | `Integer`           | No        | `4`                  |
| end       | Date when the last recurrence should occur                                                         | [ISO 8601](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString) `String`       | Yes*      | `20190904T210000`    |
| weekstart | Day that the week starts on (default: `SU`); `SU` `MO`, `TU`, `WE`, `TH`, `FR`, `SA`               | `String`              | No        | `SU`                 |
| weekdays  | Comma-separated days of the week that the event occurs on; `SU` `MO`, `TU`, `WE`, `TH`, `FR`, `SA` | `String`              | No        | `TU,TH,SA`           |
| monthdays | Comma-separated list of monthdays                                                                  | `String` of numbers | No        | `2,4,6,8`            |