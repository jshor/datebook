import IRecurrence from './IRecurrence'

/**
 * CalendarBase properties
 */
export default interface ICalendarBase {
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
  /** The recurrence of an event is how often the event is supposed to occur. See {@link IRecurrence}. */
  recurrence?: IRecurrence
}
