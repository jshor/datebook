import CalendarBase from './CalendarBase'
import { RECURRENCE, URL, FORMAT } from './constants'
import { formatTimestampString, addLeadingZero } from './utils/time'
import { toQueryString } from './utils/data'

/**
 * Generates a Yahoo! Calendar url.
 * Note that Yahoo! Calendar's support for recurrence is limited to only the interval and frequency.
 * 
 * @example
 *  import { YahooCalendar } from 'datebook'
 * 
 *  const yahoo = new YahooCalendar({
 *    title: 'Happy Hour',
 *    location: 'The Bar, New York, NY',
 *    description: 'Let\'s blow off some steam from our weekly deployments to enjoy a tall cold one!',
 *    start: '20190704T190000',
 *    end: '20190704T210000',
 *    recurrence: {
 *      frequency: 'WEEKLY'
 *      interval: 2
 *    }
 *  })
 * 
 *  yahoo.render() // https://calendar.yahoo.com/?v=60&title=Happy%20Hour&st=20190704T190000&desc=Let%27s%20blow%20off%20some%20steam%20from%20our%20weekly%20deployments%20to%20enjoy%20a%20tall%20cold%20one!&in_loc=The%20Bar%2C%20New%20York%2C%20NY&RPAT=02Wk&REND=20190610T123112&dur=0200
 *
 */
export default class YahooCalendar extends CalendarBase {
  /**
   * Constructor.
   * 
   * @param {Object} options
   * @param {String} options.description - event description
   * @param {String} options.title - event title
   * @param {String} options.location - event location 
   * @param {String} options.start - event start time
   * @param {String} [options.end] - event end time
   * @param {Object} [options.recurrence]
   * @param {String} [options.recurrence.frequency] - recurrence frequency (`DAILY`, `WEEKLY`, `MONTHLY`, `YEARLY`)
   * @param {Number} [options.recurrence.interval] - time between recurrences
   * @param {Number} [options.recurrence.count] - number of times event should repeat
   * @param {String} [options.recurrence.end] - date when the last recurrence should occur
   * @param {String} [options.recurrence.weekstart = 'SU'] - uppercase, first two letters of the day that the week starts on
   * @param {String} [options.recurrence.weekdays] - comma-separated list of uppercase, first two letters of the days the event occurs on
   * @param {String} [options.recurrence.monthdays] - comma-separated list of monthdays	String of numbers
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
   * Converts the RFC 5545 FREQ param to to Yahoo! frequency format.
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
   * Converts the RFC 5545 to Yahoo! recurrence format.
   *
   * @param {Object} recurrence
   * @param {String} [recurrence.frequency] -
   * @param {String} [recurrence.weekdays] -
   * @returns {String}
   */
  getRecurrence (recurrence) {
    const frequency = this.getFrequency(recurrence)
    const { interval } = recurrence

    return `${addLeadingZero(interval)}${frequency}`
  }

  /**
   * Returns the duration between two given dates in hhmm format.
   *
   * @param {String} start
   * @param {String} end
   * @returns {String}
   */
  getDuration (start, end) {
    const seconds = Math.floor((end - start) / 1000)
    const hours = Math.floor(seconds / 3600)
    const mins = ((seconds / 3600) % 1) * 60
  
    return `${addLeadingZero(hours)}${addLeadingZero(mins)}`
  }

  /**
   * Returns the number of hours between two given dates.
   * 
   * @param {String} start
   * @param {String} end
   * @returns {Number}
   */
  getHoursDuration (start, end) {
    const seconds = Math.floor((end - start) / 1000)
    
    return Math.floor(seconds / 3600)
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
      desc: this.description,
      in_loc: this.location
    }

    if (this.allday) {
      params.dur = 'allday'
      params.st = formatTimestampString(this.start, FORMAT.DATE)
    } else {
      params.st = formatTimestampString(this.start, FORMAT.FULL)

      if (this.getHoursDuration(this.start, this.end) > 99) {
        // Yahoo only supports up to 99 hours, so we are forced to specify the end time instead of the duration
        params.et = formatTimestampString(this.end, FORMAT.FULL)
      } else {
        // we prefer specifying duration in lieu of end time, because apparently Yahoo's end time is buggy w.r.t. timezones
        params.dur = this.getDuration(this.start, this.end)
      }
    }

    if (this.recurrence) {
      params.RPAT = this.getRecurrence(this.recurrence)

      if (this.recurrence.end) {
        params.REND = formatTimestampString(this.recurrence.end, FORMAT.DATE)
      } else {
        params.REND = formatTimestampString(this.end, FORMAT.DATE)
      }
    }

    const baseUrl = URL.YAHOO
    const queryString = toQueryString(params)

    return `${baseUrl}?${queryString}`
  }
}
