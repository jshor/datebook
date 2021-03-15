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
  /** Base URL for the host service. */
  private baseUrl: string = URL.OUTLOOK

  constructor (opts: CalendarOptions) {
    super(opts)
    this.setInitialParams()
    this.setHost('live')
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

    if (this.attendees.length > 0) {
      this.setParam('to', data.toMailtoList(this.attendees).join(','))
    }
  }

  /**
   * Sets the host service type. The default host for Outlook is **`live`**.
   *
   * @param {string} host - `live` (for personal accounts) or `office` (for Office365)
   * @returns {OutlookCalendar}
   */
  public setHost = (host: string) => {
    if (['live', 'office'].includes(host)) {
      this.baseUrl = URL.OUTLOOK.replace('{{host}}', host)
    }

    return this
  }

  /**
   * Generates the Outlook url.
   *
   * @returns {string}
   */
  public render = (): string => {
    const queryString = data.toQueryString(this.params)

    return `${this.baseUrl}?${queryString}`
  }
}
