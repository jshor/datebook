import { FORMAT } from './constants'
import { parseDate } from './utils/time'
import ICalendarBase from './interfaces/ICalendarBase'
import IRecurrence from './interfaces/IRecurrence';
import IOptions from './interfaces/IOptions';

/**
 * Base calendar class. This class can be extended to add new calendar services.
 */
class CalendarBase implements ICalendarBase {
  allday: boolean;
  description: string;
  location: string;
  start: Date;
  end: Date;
  recurrence: IRecurrence;
  title: string;

  /**
   * Constructor.
   *
   * @param {IOptions} options - calendar options
   */
  constructor (options: IOptions) {
    this.setText(options)
    this.setTimestamps(options)
  }
  
  /**
   * Sets the description, title and location.
   * 
   * @private
   * @param {object} options
   * @param {string} options.description - event description
   * @param {string} options.title - event title
   * @param {string} options.location - event location 
   */
  setText (options: IOptions) {
    this.description = options.description || ''
    this.title = options.title || ''
    this.location = options.location || ''
  }
  
  /**
   * Sets the time and recurrence parameters.
   * 
   * @private
   * @param {object} options
   * @param {string} options.start - event start time
   * @param {string} [options.end] - event end time
   * @param {boolean} [options.allday = false] - whether this is an all-day event
   * @param {IRecurrence} [options.recurrence] - event recurrence
   */
  setTimestamps (options: IOptions) {
    this.allday = !options.end
    
    if (this.allday) {
      // if allday is specified, make the end date exactly 1 day from the start date
      this.end = parseDate(options.start)
      this.end.setDate(this.end.getDate() + 1)
    } else {
      this.end = parseDate(options.end)
    }
    
    this.start = parseDate(options.start)
    this.recurrence = options.recurrence
  }
}

export default CalendarBase