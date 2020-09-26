/**
 * Recurrence config options.
 */
export default interface IRecurrence {
  /** The Julian interval of how often this event should occur. */
  frequency?: string
  /** The amount of time that will occur between recurrences. The scale of the time depends on {@link IRecurrence.frequency}. */
  interval?: number
  /** The maximum number of times the event should repeat. */
  count?: number
  /** The latest date that this event may occur on.  */
  end?: Date
  /** The day of the week to denote when the the week starts on. */
  weekstart?: string
  /** The days of the week that the event should occur on. */
  weekdays?: string[]
  /** The days of the month that the event should occur on.  */
  monthdays?: string
}
