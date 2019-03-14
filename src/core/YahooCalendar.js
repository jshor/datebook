import CalendarBase from './CalendarBase'
import { RECURRENCE, URL } from '../constants'
import { formatTime, getHoursDuration } from '../utils/time'
import { toQueryString } from '../utils/data'

export default class YahooCalendar extends CalendarBase {
  /**
   * @param {Object} options
   * @param {Object} options.start - start timestamp
   * @param {Object} options.end - end timestamp; omit if this is an all-day event
   */
  constructor (options) {
    super(options)
  }

  /**
   * Converts the capitalized two-letter day abbreviation to ProperCase.
   *
   * @param {String} day
   * @returns {String}
   */
  formatDay (day) {
    const first = day.charAt(0)
    const last = day.charAt(1).toLowerCase()

    return `${first}${last}`
  }

  /**
   * Converts the RFC???? FREQ param to to Yahoo! frequency format.
   *
   * @param {Object} recurrence
   * @param {String} [recurrence.frequency] -
   * @param {String} [recurrence.weekdays] -
   * @returns {String}
   */
  getFrequency ({ frequency, weekdays }) {
    const { FREQUENCY } = RECURRENCE

    if (weekdays) {
      return weekdays
        .split(',')
        .map(this.formatDay)
        .join('')
    }

    switch (frequency) {
      case FREQUENCY.DAILY:
        return 'Dy'
      case FREQUENCY.MONTHLY:
        return 'Mh'
      case FREQUENCY.YEARLY:
        return 'Yr'
      default:
        return 'Wk'
    }
  }

  /**
   * Converts the RFC???? to Yahoo! recurrence format.
   *
   * @param {Object} recurrence
   * @param {String} [recurrence.frequency] -
   * @param {String} [recurrence.weekdays] -
   * @returns {String}
   */
  getRecurrence (recurrence) {
    const frequency = this.getFrequency(recurrence)
    let { interval } = recurrence

    if (interval.toString().length === 1) {
      interval = `0${interval}`
    }

    return `${interval}${frequency}`
  }

  /**
   * Generates the Yahoo! Calendar data.
   *
   * @returns {String}
   */
  render () {
    const params = {
      v: 60, // version number; must be 60
      title: this.title,
      st: this.start,
      desc: this.description,
      in_loc: this.location
    }

    if (this.allday) {
      params.dur = 'allday'
    }

    if (this.recurrence) {
      params.RPAT = this.getRecurrence(this.recurrence)
      params.REND = formatTime(this.recurrence.end)
      params.dur = getHoursDuration(this.start, this.end)
    } else {
      params.et = this.end
    }

    const baseUrl = URL.YAHOO
    const queryString = toQueryString(params)

    return `${baseUrl}?${queryString}`
  }
}
