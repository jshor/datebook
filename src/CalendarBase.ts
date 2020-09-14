import { FORMAT } from './constants'
import { parseDate } from './utils/time'
import ICalendarBase from './interfaces/ICalendarBase'
import IRecurrence from './interfaces/IRecurrence';
import IOptions from './interfaces/IOptions';

/**
 * Base calendar class. This class can be extended to add new calendar services.
 */
class CalendarBase implements ICalendarBase {
  /**
   * True if the event is one that spans the entire day.
   *
   * @type {boolean}
   */
  allday: boolean = false

  /**
   * Event description.
   *
   * @type {string}
   */
  description: string = ''

  /**
   * Event title.
   *
   * @type {string}
   */
  title: string = ''

  /**
   * Event physical location.
   *
   * @type {string}
   */
  location: string = ''

  /**
   * Start time of the event.
   *
   * @type {Date}
   */
  start: Date = new Date()

  /**
   * End time of the event.
   *
   * @type {Date}
   */
  end: Date = new Date()

  /**
   * Event recurrence specification. See {@link IRecurrence}
   *
   * @type {Date}
   */
  recurrence?: IRecurrence

  /**
   * Constructor.
   *
   * @param {IOptions} options
   */
  constructor (options: IOptions) {
    this.setText(options)
    this.setTimestamps(options)
  }

  /**
   * Sets the description, title and location.
   *
   * @param {IOptions} options
   */
  setText (options: IOptions) {
    this.description = options.description || ''
    this.title = options.title || ''
    this.location = options.location || ''
  }

  /**
   * Sets the time and recurrence parameters.
   *
   * @param {IOptions} options
   */
  setTimestamps (options: IOptions) {
    if (options.end) {
      this.end = parseDate(options.end)
    } else {
      // if no end date is specified, make this an all-day event
      // set the end date exactly 1 day from the start date
      this.allday = true
      this.end = parseDate(options.start)
      this.end.setDate(this.end.getDate() + 1)
    }

    if (options.recurrence) {
      this.recurrence = options.recurrence
    }

    this.start = parseDate(options.start)
  }
}

export default CalendarBase
