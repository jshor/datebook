import CalendarRecurrence from './CalendarRecurrence'

/**
 * CalendarBase properties
 */
interface ICalendarBase {
  /** The event description. */
  description: string
  /** The event title (i.e., summary). */
  title: string
  /** A summary description of the event location. */
  location: string
  /** The event start timestamp. */
  start: Date
  /** The event end timestamp. For all-day events, this field should be omitted. */
  end: Date
  /** The recurrence of an event is how often the event is supposed to occur. See {@link CalendarRecurrence}. */
  recurrence?: CalendarRecurrence
  /**
   * Renders the calendar URL or content.
   *
   * @returns {string}
   */
  render (): string
}

export default ICalendarBase
