import CalendarBase from './CalendarBase'
import { FORMAT } from './constants'
import ics from './utils/ics'
import time from './utils/time'
import IOptions from './interfaces/IOptions'

/**
 * Generates a downloadable ICS file.
 */
export default class ICalendar extends CalendarBase {
  /**
   * @inheritDoc
   */
  constructor (options: IOptions) {
    super(options)
  }

  /**
   * Downloads the rendered iCalendar.
   *
   * @remark Only works in browsers.
   */
  download (): void {
    ics.download(this.title, this.render())
  }

  /**
   * Generates the iCalendar data.
   *
   * @returns {string}
   */
  render (): string {
    const description = ics.formatText(this.description)
    const location = ics.formatText(this.location)
    const summary = ics.formatText(this.title)
    const event = [
      'CLASS:PUBLIC',
      `DESCRIPTION:${description}`,
      `DTSTART:${time.formatTimestampDate(this.start, FORMAT.FULL)}`,
      `DTEND:${time.formatTimestampDate(this.end, FORMAT.FULL)}`,
      `LOCATION:${location}`,
      `SUMMARY:${summary}`,
      'TRANSP:TRANSPARENT'
    ]

    if (this.recurrence) {
      event.push(`RRULE:${ics.getRrule(this.recurrence)}`)
    }

    const uid = ics.getUid()
    const timeCreated = time.getTimeCreated()
    const host = ics.getProdId()
    const calendar = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      event.join('\n'),
      'END:VEVENT',
      'END:VCALENDAR',
      `UID:${uid}`,
      `DTSTAMP:${timeCreated}`,
      `PRODID:${host}`
    ]

    return calendar.join('\n')
  }
}
