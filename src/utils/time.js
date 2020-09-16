import { FORMAT } from '../constants'
import warn from './warn'

/**
 * Adds a leading zero to a single-digit string and returns a two-digit string.
 * 
 * @param {String} s
 * @returns {String}
 */
export const addLeadingZero = (s) => {
  return `0${parseInt(s, 10)}`.slice(-2)
}

/**
 * Formats the given JS Date() object to the given format.
 * Format defaults to: YYYYMMDDTHHMMss
 * 
 * @param {Date} d
 * @param {String} format
 * @returns {String}
 */
export const formatTimestampDate = (d, format) => {
  const dateValues = {
    YYYY: d.getFullYear(),
    MM: addLeadingZero(d.getMonth() + 1),
    DD: addLeadingZero(d.getDate()),
    hh: addLeadingZero(d.getHours()),
    mm: addLeadingZero(d.getMinutes()),
    ss: addLeadingZero(d.getSeconds()),
  }

  return Object
    .keys(dateValues)
    .reduce((date, key) => {
      return date.replace(key, dateValues[key])
    }, format)
}

/**
 * Parses the given string as a JS Date() object.
 * 
 * @param {Date | String} date
 * @returns {Date}
 */
export const parseDate = (date) => {
  if (typeof date === 'string') {
    warn('Passing in `date` as a string')
    return new Date(date)
  }

  return date
}

/**
 * Formats the given timestamp.
 *
 * @param {String} time
 * @param {String} format - momentjs format
 * @returns {String}
 */
export const formatTimestampString = (str, format) => {
  return formatTimestampDate(parseDate(str), format)
}

/**
 * Returns the current timestamp.
 *
 * @returns {String}
 */
export const getTimeCreated = () => {
  return formatTimestampDate(new Date(), FORMAT.DATE)
}

/**
 * Increments dates by the given number of days.
 * This will account for edge cases, such as leap years.
 * 
 * @param {Date} dateInput - date to increment
 * @param {Number} increment - number of days
 * @returns {Date}
 */
export const incrementDate = (dateInput, increment) => {
  const additionalTime = increment * 86400000
  const newDate = new Date()
  
  newDate.setTime(dateInput.getTime() + additionalTime)

  return newDate
}