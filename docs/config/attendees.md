# Calendar Attendees <Badge text="6.2.3" vertical="middle" />

The [basic config object](#basic.md) accepts a parameter `attendees` as a list of `CalendarAttendee` objects. This will provide event attendee options to all calendar services.

## name

* Type: `string`
* Required: no

The attendee's name.

## email

* Type: `string`
* Required: **yes**

The attendee's email address.

## icsOptions

* Type: `ICSAttendeeOptions`
* Required: no

`ICSAttendeeOptions` is a configuration object for specifying iCalendar-specific information about the attendee. It accepts the following parameters:

## icsOptions.delegatedFrom

* Type: `string`
* Required: no
* Any valid URI (e.g., `MAILTO:john@doe.com`).

The [delegatee](https://www.kanzaki.com/docs/ical/delegatedFrom.html) of the attendee request.

## icsOptions.partStat

* Type: `string`
* Required: no
* Any valid [RFC 2445 `PARTSTAT`](https://www.kanzaki.com/docs/ical/partstat.html) value.

The participation status of the attendee.

## icsOptions.role

* Type: `string`
* Required: no
* Any valid [RFC 2445 `ROLE`](https://www.kanzaki.com/docs/ical/role.html) value.

The participation role of the attendee.

## icsOptions.rsvp

* Type: `boolean`
* Required: no

Whether or not the attendee is RSVP'd to the event.

## icsOptions.delegatedFrom

* Type: `string`
* Required: no
* Any valid URI (e.g., `MAILTO:john@doe.com`).

The [event sender](https://www.kanzaki.com/docs/ical/sentBy.html).

### Example

```ts
const attendees: CalendarAttendees[] = [
  {
    name: 'John Doe',
    email: 'john@doe.com',
    icsOptions: {
      rsvp: true
    }
  },
  {
    name: 'Jane Doe',
    email: 'jane@doe.com'
  }
]
```
