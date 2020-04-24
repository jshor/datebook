import { FORMAT } from '../constants'

/**
 * Adds a leading zero to a single digit and returns a two-digit string.
 * 
 * @param {String} s
 * @returns {String}
 */
const addLeadingZero = (s) => {
  return `0${parseInt(s, 10)}`.slice(-2)
}

/**
 * Returns the date from the given JS Date() object in format: YYYYMMDD.
 * 
 * @param {Date} d
 * @returns {String}
 */
const getDate = (d) => {
  return [
    d.getFullYear(),
    addLeadingZero(d.getMonth() + 1),
    addLeadingZero(d.getDate())
  ].join('')
}

/**
 * Returns the time from the given JS Date() object in format: HHMMss.
 * 
 * @param {Date} d
 * @returns {String}
 */
const getTime = (d) => {
  return [
    addLeadingZero(d.getHours()),
    addLeadingZero(d.getMinutes()),
    addLeadingZero(d.getSeconds()),
  ].join('')
}

/**
 * Computes the duration between two dates.
 *
 * @param {String} from
 * @param {String} to
 * @returns {String}
 */
export const getHoursDuration = (from, to) => {
  const start = parseDate(from)
  const end = parseDate(to)
  const seconds = Math.floor((end - start) / 1000)
  const hours = Math.floor(seconds / 3600)
  const mins = ((seconds / 3600) % 1) * 60

  return `${addLeadingZero(hours)}${addLeadingZero(mins)}`
}

/**
 * Formats the given JS Date() object to the given format.
 * Format defaults to: YYYYMMDDTHHMMss
 * 
 * @param {Date} date 
 * @param {String} [format = 'YYYYMMDDTHHMMss']
 * @returns {String}
 */
export const formatTimestampDate = (date, format = `${FORMAT.DATE}T${FORMAT.TIME}`) => {
  switch (format) {
    case FORMAT.DATE:
      return getDate(date)

    case FORMAT.TIME:
      return getTime(date)

    default:
      return `${getDate(date)}T${getTime(date)}`
  }
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
