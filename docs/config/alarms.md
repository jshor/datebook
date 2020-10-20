

# Alarms <Badge text="6.0.0" vertical="middle" />

`ICSAlarm`s are used for [iCalendar event alarms](icalendar.md#addalarm-alarm-alarm) and are often used for reminders before an event occurs.

### Example

```ts
const alarm: ICSAlarm = {
  action: 'AUDIO',
  trigger: new Date('1998-01-01T05:00:00Z'),
  duration: {
    after: true,
    hours: 1
  },
  attach: {
    params: 'FMTTYPE=audio/mp3',
    url: 'ftp://host.com/novo-procs/felizano.mp3'
  }
}
```

## action

* Type: `string`
* Required: **yes**
* Valid value: any of `AUDIO`, `DISPLAY`, `EMAIL`, or `PROCEDURE`

Determines how the alarm will behave.

:::warning Important
If the action is set to `AUDIO`, a valid audio file [ICSAttachment](#attach) must be specified.
:::

## description

* Type: `string`
* Required: **yes**

The description for the alarm.

## summary

* Type: `string`
* Required: **yes**

The summary for the alarm.

## trigger

* Type: [`ICSDuration`](durations.md) or `Date`
* Required: **yes**
* Valid value: a [`ICSDuration`](durations.md) object, or a valid `Date` reference

When to trigger the alarm. This can be a [`ICSDuration`](durations.md) object representing the time to display before or after an event, or a valid `Date` reference.

## duration

* Type: [`ICSDuration`](durations.md)
* Required: no
* Valid value: a [`ICSDuration`](durations.md) object

How long the alarm should be present for.

## repeat

* Type: `number`
* Required: no
* Valid value: a positive integer

The number of times to repeat the alarm.

## attach

* Type: `ICSAttachment`
* Required: no
* Valid value: an `ICSAttachment` object

### attach.params

* Type: `string`
* Required: no
* Valid value: any [ICS Attachment parameter](https://www.kanzaki.com/docs/ical/attach.html)

Sets the parameter for the `ICSAttachment`. This could be a MIME type if referencing a file.

### attach.url

* Type: `string`
* Required: **yes**
* Valid value: a valid URL

Sets the URL for the resource of this `ICSAttachment`.
