import CalendarBase from './CalendarBase'
import { URL, FORMAT } from './constants'
import data from './utils/data'
import time from './utils/time'
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

    if (this.attendees.length > 0) {
      this.setParam('inv_list', data.toMailtoList(this.attendees).join(','))
    }
  }

  /**
   * Sets the start/end/allday parameters.
   */
  private setTimeParams = (): void => {
    if (this.isAllDay) {
      this
        .setParam('dur', 'allday')
        .setParam('st', time.formatDateNoUtc(this.start, FORMAT.DATE))
    } else {
      this.setParam('st', time.formatDateNoUtc(this.start, FORMAT.NO_UTC_FULL))

      if (time.getHoursDiff(this.start.getTime(), this.end.getTime()) > 99) {
        // Yahoo only supports up to 99 hours, so we are forced to specify the end time instead of the duration
        this.setParam('et', time.formatDateNoUtc(this.end, FORMAT.NO_UTC_FULL))
      } else {
        // we prefer specifying duration in lieu of end time, because apparently Yahoo's end time is buggy w.r.t. timezones
        this.setParam('dur', time.getDuration(this.start.getTime(), this.end.getTime()))
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
