import ICalendarBase from './types/ICalendarBase'
import CalendarRecurrence from './types/CalendarRecurrence'
import CalendarOptions from './types/CalendarOptions'
import time from './utils/time'
import CalendarAttendee from './types/CalendarAttendee'

/**
 * Base calendar class. This class can be extended to add new calendar services.
 */
abstract class CalendarBase implements ICalendarBase {
  /** True if the event is one that spans the entire day. */
  protected isAllDay = false

  /** Event description. */
  protected description = ''

  /** Event title. */
  protected title = ''

  /** Event physical location. */
  protected location = ''

  /** Start time of the event. */
  protected start = new Date()

  /** End time of the event. */
  protected end = new Date()

  /** Event recurrence specification. See {@link CalendarRecurrence} */
  protected recurrence?: CalendarRecurrence

  /** Calendar service query string params. */
  protected params: Record<string, string | null> = {}

  /**
   * An array of event attendees. See {@link CalendarAttendee}
   *
   * @type {Array<CalendarAttendee>}
   */
  attendees: Array<CalendarAttendee> = []

  /**
   * Constructor.
   *
   * @param {CalendarOptions} options
   */
  constructor (options: CalendarOptions) {
    this.setText(options)
    this.setTimestamps(options)
    this.setAttendees(options)
  }

  /**
   * Sets the description, title and location.
   *
   * @param {CalendarOptions} options
   */
  protected setText = (options: CalendarOptions): void => {
    this.description = options.description || ''
    this.title = options.title || ''
    this.location = options.location || ''
  }

  /**
   * Sets the time and recurrence parameters.
   *
   * @param {CalendarOptions} options
   */
  protected setTimestamps = (options: CalendarOptions): void => {
    this.isAllDay = !options.end
    this.start = options.start

    if (options.end) {
      this.end = options.end
    } else {
      // if no end date is specified, make the end date exactly 1 day from the start date
      this.end = time.incrementDate(this.start, 1)
    }

    this.recurrence = options.recurrence
  }

  /**
   * Sets the attendees array if attendees are supplied.
   * Extend this method in child classes if additional manipulation
   * must occur.
   *
   * @param {CalendarOptions} options
   */
  public setAttendees (options: CalendarOptions): void {
    if (Array.isArray(options.attendees)) {
      this.attendees = options.attendees
    } else {
      this.attendees = []
    }
  }

  /**
   * Transforms the array of attendee objects into an array of attendee
   * strings. Extend this method in child classes if additional manipulation
   * must occur (i.e. ICalendar)
   */
  public renderAttendeesArr (): Array<string> {
    if (this.attendees.length === 0) {
      throw new Error('No attendees')
    }
    return this.attendees.map(({
      name,
      email,
    }) => {
      const mailTo = `<${email}>`
      let commonName = email
      if (name) {
        commonName = name
      }
      return `${commonName} ${mailTo}`
    })
  }

  /**
   * Joins the results of `this.renderAttendeesArr` using a join character.
   * Extend this method in child classes if a different join character is
   * neeeded.
   */
  public renderAttendees (): string {
    return this.renderAttendeesArr().join(',')
  }

  /**
   * Sets additional calendar service properties.
   * May be used to override existing query string params if necessary.
   *
   * @param {string} key
   * @param {string | null} value
   * @returns {CalendarBase}
   */
  public setParam = (key: string, value: string | null): this => {
    this.params[key] = value

    return this
  }

  /** Sets base query string/ICS params. */
  protected abstract setInitialParams (): void

  /** Renders the URL/ICS file data. */
  public abstract render (): string
}

export default CalendarBase
