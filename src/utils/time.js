import { FORMAT } from '../constants'

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
 * @param {String} str
 * @returns {Date}
 */
export const parseDate = (str) => { // TODO: check if `time` is valid date
  return new Date(str)
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
