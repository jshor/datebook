import CalendarBase from './CalendarBase'
import { URL, FORMAT } from './constants'
import data from './utils/data'
import time from './utils/time'
import yahooUtils from './utils/yahoo'
import CalendarOptions from './types/CalendarOptions'

/**
 * Generates a Yahoo! Calendar url.
 *
 * @remark Yahoo! Calendar's support for recurrence is limited to only the interval and frequency.
 */
export default class YahooCalendar extends CalendarBase {
  constructor (opts: CalendarOptions) {
    super(opts)
    this.setInitialParams()
  }

  /**
   * Sets the basic properties for the calendar instance.
   */
  protected setInitialParams = (): void => {
    this
      .setParam('v', '60') // version number; must be 60
      .setParam('title', this.title)
      .setParam('desc', this.description)
      .setParam('in_loc', this.location)

    this.setTimeParams()
    this.setRecurrenceParams()
  }

  /**
   * Sets the start/end/allday parameters.
   */
  private setTimeParams = (): void => {
    if (this.isAllDay) {
      this
        .setParam('dur', 'allday')
        .setParam('st', time.formatDate(this.start, FORMAT.DATE))
    } else {
      this.setParam('st', time.formatDate(this.start, FORMAT.FULL))

      if (time.getHoursDiff(this.start.getTime(), this.end.getTime()) > 99) {
        // Yahoo only supports up to 99 hours, so we are forced to specify the end time instead of the duration
        this.setParam('et', time.formatDate(this.end, FORMAT.FULL))
      } else {
        // we prefer specifying duration in lieu of end time, because apparently Yahoo's end time is buggy w.r.t. timezones
        this.setParam('dur', time.getDuration(this.start.getTime(), this.end.getTime()))
      }
    }
  }

  /**
   * Sets the recurrence parameters, if recurrence is specified.
   */
  private setRecurrenceParams = (): void => {
    if (this.recurrence) {
      this.setParam('RPAT', yahooUtils.getRecurrence(this.recurrence))

      if (this.recurrence.end) {
        this.setParam('REND', time.formatDate(this.recurrence.end, FORMAT.DATE))
      } else {
        const days = time.getRecurrenceLengthDays(this.recurrence)
        const rend = time.incrementDate(this.end, Math.ceil(days))

        this.setParam('REND', time.formatDate(rend, FORMAT.DATE))
      }
    }
  }

  /**
   * Generates the Yahoo! Calendar data.
   *
   * @returns {string}
   */
  public render = (): string => {
    const baseUrl = URL.YAHOO
    const queryString = data.toQueryString(this.params)

    return `${baseUrl}?${queryString}`
  }
}
