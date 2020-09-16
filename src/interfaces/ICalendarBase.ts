import IRecurrence from './IRecurrence'

/**
 * CalendarBase properties
 */
export default interface ICalendarBase {
  allday: boolean
  description: string
  location: string
  start: Date | string
  end?: Date | string
  recurrence?: IRecurrence
  title: string
}
