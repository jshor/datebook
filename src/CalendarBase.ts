import ICalendarBase from './types/ICalendarBase'
import CalendarRecurrence from './types/CalendarRecurrence'
import CalendarOptions from './types/CalendarOptions'
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
   * Event recurrence specification. See {@link CalendarRecurrence}
   *
   * @type {CalendarRecurrence}
   */
  recurrence?: CalendarRecurrence

  /**
   * Constructor.
   *
   * @param {CalendarOptions} options
   */
  constructor (options: CalendarOptions) {
    this.setText(options)
    this.setTimestamps(options)
  }

  /**
   * Sets the description, title and location.
   *
   * @param {CalendarOptions} options
   */
  public setText (options: CalendarOptions): void {
    this.description = options.description || ''
    this.title = options.title || ''
    this.location = options.location || ''
  }

  /**
   * Sets the time and recurrence parameters.
   *
   * @param {CalendarOptions} options
   */
  public setTimestamps (options: CalendarOptions): void {
    this.allday = !options.end
    this.start = options.start

    if (options.end) {
      this.end = options.end
    } else {
      // if allday is specified, make the end date exactly 1 day from the start date
      this.end = time.incrementDate(this.start, 1)
    }

    this.recurrence = options.recurrence
  }

  /**
   * Render stub.
   *
   * @throws {Error}
   */
  public render (): string {
    throw new Error('Render not implemented')
  }
}

export default CalendarBase
