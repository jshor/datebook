import CalendarBase from './CalendarBase'
import IOptions from './interfaces/IOptions'
import data from './utils/data'
import ics from './utils/ics'
import time from './utils/time'
import { FORMAT, URL } from './constants'

/**
 * Generates a Google Calendar url.
 */
export default class GoogleCalendar extends CalendarBase {
  /**
   * @inheritDoc
   */
  constructor (options: IOptions) {
    super(options)
  }

  /**
   * Generates the Google Calendar url.
   *
   * @returns {string}
   */
  render (): string {
    let timestampFormat = FORMAT.DATE

    if (!this.allday) {
      timestampFormat += FORMAT.TIME
    }

    const params: Record<string, string> = {
      action: 'TEMPLATE',
      text: this.title,
      details: this.description,
      location: this.location,
      dates: [
        time.formatDate(this.start, timestampFormat),
        time.formatDate(this.end, timestampFormat)
      ].join('/')
    }

    if (this.recurrence) {
      params.recur = `RRULE:${ics.getRrule(this.recurrence)}`
    }

    const baseUrl = URL.GOOGLE
    const queryString = data.toQueryString(params)

    return `${baseUrl}?${queryString}`
  }
}
