import IRecurrence from './IRecurrence'

/**
 * CalendarBase properties
 */
export default interface ICalendarBase {
  allday: boolean
  description: string
  location: string
  start: Date
  end?: Date
  recurrence?: IRecurrence
  title: string
}
