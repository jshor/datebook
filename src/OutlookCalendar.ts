import CalendarBase from './CalendarBase'
import { FORMAT, URL } from './constants'
import data from './utils/data'
import time  from './utils/time'
import CalendarOptions from './types/CalendarOptions'

/**
 * Generates an Outlook Calendar url.
 *
 * @remark Outlook Calendar's query string params do not support recurrence.
 */
export default class OutlookCalendar extends CalendarBase {
  constructor (opts: CalendarOptions) {
    super(opts)
    this.setInitialParams()
  }

  /**
   * Sets the basic properties for the calendar instance.
   */
  protected setInitialParams = (): void => {
    let timestampFormat = FORMAT.OUTLOOK_DATE

    if (!this.isAllDay) {
      timestampFormat += FORMAT.OUTLOOK_TIME
    }

    this
      .setParam('rru', 'addevent')
      .setParam('path', '/calendar/action/compose')
      .setParam('startdt', time.formatDate(this.start, timestampFormat))
      .setParam('enddt', time.formatDate(this.end, timestampFormat))
      .setParam('subject', this.title)
      .setParam('body', this.description)
      .setParam('location', this.location)
      .setParam('allday', this.isAllDay.toString())
  }

  /**
   * Generates the Outlook url.
   *
   * @returns {string}
   */
  public render = (): string => {
    const baseUrl = URL.OUTLOOK
    const queryString = data.toQueryString(this.params)

    return `${baseUrl}?${queryString}`
  }
}
