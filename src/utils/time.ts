import { RECURRENCE, FORMAT } from '../constants'
import CalendarRecurrence from '../types/CalendarRecurrence'

/**
 * Adds a leading zero to a single-digit string and returns a two-digit string.
 *
 * @param {number | string} n
 * @returns {string}
 */
const addLeadingZero = (n: number | string = ''): string => {
  return `0${parseInt(n.toString(), 10)}`.slice(-2)
}

/**
 * Returns the duration between two given dates in hhmm format.
 *
 * @param {number} start
 * @param {number} end
 * @returns {string}
 */
const getDuration = (start: number, end: number): string => {
  const seconds = Math.floor((end - start) / 1000)
  const hours = Math.floor(seconds / 3600)
  const mins = ((seconds / 3600) % 1) * 60

  return `${addLeadingZero(hours)}${addLeadingZero(mins)}`
}

/**
 * Returns the number of hours between two given dates.
 *
 * @param {number} start
 * @param {number} end
 * @returns {number}
 */
const getHoursDiff = (start: number, end: number): number => {
  const seconds = Math.floor((end - start) / 1000)

  return Math.floor(seconds / 3600)
}

/**
 * Computes the number of days a recurrence will last.
 *
 * @param {CalendarRecurrence} recurrence
 * @returns {number}
 */
const getRecurrenceLengthDays = (recurrence: CalendarRecurrence): number => {
  const { frequency, interval } = recurrence
  const { FREQUENCY } = RECURRENCE

  if (interval) {
    switch (frequency) {
      case FREQUENCY.YEARLY:
        return interval * 365.25
      case FREQUENCY.MONTHLY:
        return interval * 30.42 // avg days in a year
      case FREQUENCY.WEEKLY:
        return interval * 7
      default:
        return interval // daily
    }
  }

  // if no frequency is specified, set an arbitrarily-long recurrence end
  return 365.25 * 100 // 100 years
}

/**
 * Formats the given JS Date() object to the given format.
 * Format defaults to: YYYYMMDDTHHMMss
 *
 * @param {Date} [d = new Date()]
 * @param {string} format
 * @returns {string}
 */
const formatDate = (d: Date = new Date(), format: string): string => {
  const dateValues: Record<string, string | number> = {
    YYYY: d.getUTCFullYear(),
    MM: addLeadingZero(d.getUTCMonth() + 1),
    DD: addLeadingZero(d.getUTCDate()),
    hh: addLeadingZero(d.getUTCHours()),
    mm: addLeadingZero(d.getUTCMinutes()),
    ss: addLeadingZero(d.getUTCSeconds())
  }

  return Object
    .keys(dateValues)
    .reduce((date: string, key: string): string => {
      return date.replace(key, dateValues[key].toString())
    }, format)
}


/**
 * Formats the given JS Date() object to the given format, not using UTC
 * Format defaults to: YYYYMMDDTHHMMss
 *
 * @param {Date} [d = new Date()]
 * @param {string} format
 * @returns {string}
 */
const formatDateNoUtc = (d: Date = new Date(), format: string): string => {
  const dateValues: Record<string, string | number> = {
    YYYY: d.getUTCFullYear(),
    MM: addLeadingZero(d.getMonth() + 1),
    DD: addLeadingZero(d.getDate()),
    hh: addLeadingZero(d.getHours()),
    mm: addLeadingZero(d.getMinutes()),
    ss: addLeadingZero(d.getSeconds())
  }

  return Object
    .keys(dateValues)
    .reduce((date: string, key: string): string => {
      return date.replace(key, dateValues[key].toString())
    }, format)
}

/**
 * Returns the current timestamp.
 *
 * @returns {string}
 */
const getTimeCreated = (): string => {
  return formatDate(new Date(), FORMAT.DATE)
}

/**
 * Increments dates by the given number of days.
 * This will account for edge cases, such as leap years.
 *
 * @param {Date} dateInput - date to increment
 * @param {number} days - number of days
 * @returns {Date}
 */
const incrementDate = (dateInput: Date, days: number): Date => {
  const additionalTime = days * 86400000
  const newDate = new Date()

  newDate.setTime(dateInput.getTime() + additionalTime)

  return newDate
}

export default {
  addLeadingZero,
  getDuration,
  getHoursDiff,
  getRecurrenceLengthDays,
  formatDate,
  formatDateNoUtc,
  getTimeCreated,
  incrementDate
}
