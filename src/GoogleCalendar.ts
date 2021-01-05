import CalendarBase from './CalendarBase'
import data from './utils/data'
import ics from './utils/ics'
import time from './utils/time'
import { FORMAT, URL } from './constants'
import CalendarOptions from './types/CalendarOptions'

/**
 * Generates a Google Calendar url.
 */
export default class GoogleCalendar extends CalendarBase {
  constructor (opts: CalendarOptions) {
    super(opts)
    this.setInitialParams()
  }

  /**
   * Sets the basic properties for the calendar instance.
   */
  protected setInitialParams = (): void => {
    let timestampFormat = FORMAT.DATE

    if (!this.isAllDay) {
      timestampFormat += FORMAT.TIME
    }

    const dates = [
      time.formatDate(this.start, timestampFormat),
      time.formatDate(this.end, timestampFormat)
    ].join('/')

    this
      .setParam('action', 'TEMPLATE')
      .setParam('dates', dates)
      .setParam('text', this.title)
      .setParam('details', this.description)
      .setParam('location', this.location)
      .setParam('allday', this.isAllDay.toString())

    if (this.recurrence) {
      this.setParam('recur', `RRULE:${ics.getRrule(this.recurrence)}`)
    }

    if (this.attendees.length > 0) {
      this.setParam('add', data.toMailtoList(this.attendees).join(','))
    }
  }

  /**
   * Generates the Google Calendar url.
   *
   * @returns {string}
   */
  public render = (): string => {
    const baseUrl = URL.GOOGLE
    const queryString = data.toQueryString(this.params)

    return `${baseUrl}?${queryString}`
  }
}
