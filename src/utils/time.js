import moment from 'moment'
import { FORMAT } from '../constants'

/**
 * Computes the duration between two dates.
 * 
 * @param {String} startDate
 * @param {String} endDate
 * @returns {String}
 */
export const getHoursDuration = (startDate, endDate) => {
  const start = moment(startDate)
  const end = moment(endDate)
  const diff = end.diff(start)
  
  return moment
    .utc(diff)
    .format('HHmm')
}

/**
 * Formats the given timestamp.
 *
 * @param {String} time
 * @param {String} format - momentjs format
 * @returns {String}
 */
export const formatTime = (time, format = `${FORMAT.DATE}T${FORMAT.TIME}`) => {
  return moment(time).format(format)
}

/**
 * Returns the current timestamp.
 * 
 * @returns {String}
 */
export const getTimeCreated = () => {
  return formatTime(new moment())
}