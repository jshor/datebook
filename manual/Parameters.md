# Parameters

## Common event details

The following common parameters are utilized across all calendar apps:

| Attribute            | Description                                                                                        | Type                | Required? | Example              |
|----------------------|----------------------------------------------------------------------------------------------------|---------------------|-----------|----------------------|
| title                | Title of the event                                                                                 | `String`            | Yes       | `Happy Hour`         |
| description          | Summary of the event                                                                               | `String`            | Yes       | `Come enjoy drinks!` |
| location             | Event location                                                                                     | `String`            | Yes       | `The Bar, NYC`       |
| start-date           | Date that the event starts on                                                                      | `String` date`      | Yes       | `20180704T190000`    |
| end-date             | Date that the event ends on. Omit for an all-day event                                             | `String` date`      | No        | `20180704T210000`    |

## Date format

TODO

## Recurrence parameters


| Attribute            | Description                                                                                        | Type                | Required? | Example              |
|----------------------|----------------------------------------------------------------------------------------------------|---------------------|-----------|----------------------|
| recurrence-frequency | Event frequency; `DAILY`, `WEEKLY`, `MONTHLY`, `YEARLY`                                            | `Enum`              | No        | `DAILY`              |
| recurrence-interval  | Time between recurrences                                                                           | `Integer`           | No        | `2`                  |
| recurrence-count     | Number of times the event should repeat                                                            | `Integer`           | No        | `4`                  |
| recurrence-end       | Date when the last recurrence should occur                                                         | `String` date       | Yes*      | `20190904T210000`    |
| recurrence-weekstart | Day that the week starts on (default: `SU`); `SU` `MO`, `TU`, `WE`, `TH`, `FR`, `SA`               | `Enum`              | No        | `SU`                 |
| recurrence-weekdays  | Comma-separated days of the week that the event occurs on; `SU` `MO`, `TU`, `WE`, `TH`, `FR`, `SA` | `Enum`              | No        | `TU,TH,SA`           |
| recurrence-monthdays | Comma-separated list of monthdays                                                                  | `String` of numbers | No        | `2,4,6,8`            |
| btn-text             | Text to be displayed on the button                                                                 | `String`            | No        | `Add to calendar`    |
| use-bootstrap        | Use [Bootstrap](https://getbootstrap.com/) classes                                                 | `Boolean`           | No        | `true`               |