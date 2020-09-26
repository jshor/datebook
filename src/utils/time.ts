import { FORMAT } from '../constants'

/**
 * Adds a leading zero to a single-digit string and returns a two-digit string.
 *
 * @param {number | string} n
 * @returns {string}
 */
const addLeadingZero = (n: number | string): string => {
  return `0${parseInt(n.toString(), 10)}`.slice(-2)
}

/**
 * Formats the given JS Date() object to the given format.
 * Format defaults to: YYYYMMDDTHHMMss
 *
 * @param {Date} d
 * @param {string} format
 * @returns {string}
 */
<<<<<<< HEAD
const formatTimestampDate = (d: Date = new Date(), format: string): string => {
  const dateValues = {
=======
const formatDate = (d: Date = new Date(), format: string): string => {
  const dateValues: Record<string, string | number> = {
>>>>>>> d8c964c... refactor: removes ability to specify time as strings
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
  formatDate,
  getTimeCreated,
  incrementDate
}
