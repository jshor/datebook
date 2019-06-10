import moment from 'moment'
import { FORMAT } from './constants'

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
   * @param {String} options.start - event start time
   * @param {String} [options.end] - event end time
   * @param {Boolean} [options.allday = false] - whether this is an all-day event
   * @param {Recurrence} [options.recurrence] - event recurrence
   */
  setTimestamps (options) {
    let format = FORMAT.DATE
    
    this.allday = !options.end
    
    if (this.allday) {
      this.end = moment(options.start)
        .add(1, 'days')
        .format(format)
    } else {
      format += `T${FORMAT.TIME}`
      this.end = moment(options.end).format(format)
    }
    
    this.start = moment(options.start).format(format)
    this.recurrence = options.recurrence
  }
}

export default CalendarBase