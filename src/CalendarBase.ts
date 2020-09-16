import ICalendarBase from './interfaces/ICalendarBase'
import IRecurrence from './interfaces/IRecurrence'
import IOptions from './interfaces/IOptions'
import time from './utils/time'

/**
 * Base calendar class. This class can be extended to add new calendar services.
 */
class CalendarBase implements ICalendarBase {
  /**
   * True if the event is one that spans the entire day.
   *
   * @type {boolean}
   */
  allday = false

  /**
   * Event description.
   *
   * @type {string}
   */
  description = ''

  /**
   * Event title.
   *
   * @type {string}
   */
  title = ''

  /**
   * Event physical location.
   *
   * @type {string}
   */
  location = ''

  /**
   * Start time of the event.
   *
   * @type {Date}
   */
  start = new Date()

  /**
   * End time of the event.
   *
   * @type {Date}
   */
  end = new Date()

  /**
   * Event recurrence specification. See {@link IRecurrence}
   *
   * @type {IRecurrence}
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
  setText (options: IOptions): void {
    this.description = options.description || ''
    this.title = options.title || ''
    this.location = options.location || ''
  }

  /**
   * Sets the time and recurrence parameters.
   *
   * @param {IOptions} options
   */
  setTimestamps (options: IOptions): void {
    this.allday = !options.end
    this.start = time.parseDate(options.start)

    if (this.end) {
      this.end = time.parseDate(options.end)
    } else {
      // if allday is specified, make the end date exactly 1 day from the start date
      this.end = time.incrementDate(this.start, 1)
    }

    this.recurrence = options.recurrence

    if (this.recurrence && this.recurrence.end) {
      this.recurrence.end = time.parseDate(this.recurrence.end)
    }
  }
}

export default CalendarBase
