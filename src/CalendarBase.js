import { incrementDate, parseDate } from './utils/time'

/**
 * Base calendar class. This class can be extended to add new calendar services.
 */
class CalendarBase {
  /**
   * Constructor.
   * 
   * @param {Object} options
   * @param {String} options.description - event description
   * @param {String} options.title - event title
   * @param {String} options.location - event location 
   * @param {Date | String} options.start - event start time, in [ISO 8601](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse#Date_Time_String_Format) format
   * @param {Date | String} [options.end] - event end time, in [ISO 8601](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse#Date_Time_String_Format) format
   * @param {Object} [options.recurrence]
   * @param {String} [options.recurrence.frequency] - recurrence frequency (`DAILY`, `WEEKLY`, `MONTHLY`, `YEARLY`)
   * @param {Number} [options.recurrence.interval] - time between recurrences
   * @param {Number} [options.recurrence.count] - number of times event should repeat
   * @param {Date | String} [options.recurrence.end] - date when the last recurrence should occur
   * @param {String} [options.recurrence.weekstart = 'SU'] - uppercase, first two letters of the day that the week starts on
   * @param {String} [options.recurrence.weekdays] - comma-separated list of uppercase, first two letters of the days the event occurs on
   * @param {String} [options.recurrence.monthdays] - comma-separated list of monthdays	String of numbers
   */
  constructor (options) {
    this.setText(options)
    this.setTimestamps(options)
  }
  
  /**
   * Sets the description, title and location.
   * 
   * @private
   * @param {Object} options
   * @param {String} options.description - event description
   * @param {String} options.title - event title
   * @param {String} options.location - event location 
   */
  setText (options) {
    this.description = options.description || ''
    this.title = options.title || ''
    this.location = options.location || ''
  }
  
  /**
   * Sets the time and recurrence parameters.
   * 
   * @private
   * @param {Object} options
   * @param {Date | String} options.start - event start time
   * @param {Date | String} [options.end] - event end time
   * @param {Boolean} [options.allday = false] - whether this is an all-day event
   * @param {Recurrence} [options.recurrence] - event recurrence
   */
  setTimestamps (options) {
    this.allday = !options.end
    this.start = parseDate(options.start)
    
    if (this.allday) {
      // if allday is specified, make the end date exactly 1 day from the start date
      this.end = incrementDate(this.start, 1)
    } else {
      this.end = parseDate(options.end)
    }
    
    this.recurrence = options.recurrence

    if (this.recurrence && this.recurrence.end) {
      this.recurrence.end = parseDate(this.recurrence.end)
    }
  }
}

export default CalendarBase