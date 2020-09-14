import { FORMAT } from '../constants'
import warn from './warn'

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
const formatTimestampDate = (d: Date, format: string) => {
  const dateValues = {
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
 * Parses the given string as a JS Date() object.
 *
 * @param {string} str
 * @returns {date | string} date
 * @returns {Date}
 */
const parseDate = (date: Date | string) => {
  if (typeof date === 'string') {
    warn('Passing in `date` as a string')
    return new Date(date)
  }

  return date
}

/**
 * Formats the given timestamp.
 *
 * @param {string} time
 * @param {string} format - momentjs format
 * @returns {string}
 */
const formatTimestampString = (str: string, format: string) => {
  return formatTimestampDate(parseDate(str), format)
}

/**
 * Returns the current timestamp.
 *
 * @returns {string}
 */
const getTimeCreated = () => {
  return formatTimestampDate(new Date(), FORMAT.DATE)
}

/**
 * Increments dates by the given number of days.
 * This will account for edge cases, such as leap years.
 *
 * @param {Date} dateInput - date to increment
 * @param {number} increment - number of days
 * @returns {Date}
 */
const incrementDate = (dateInput: Date, increment: number): Date => {
  const additionalTime = increment * 86400000
  const newDate = new Date()

  newDate.setTime(dateInput.getTime() + additionalTime)

  return newDate
}

export default {
  addLeadingZero,
  parseDate,
  formatTimestampDate,
  formatTimestampString,
  getTimeCreated,
  incrementDate
}
