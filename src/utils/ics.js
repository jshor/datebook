import { toIcsParamString } from './data'
import { formatTime } from './time'
import safariFileSave from './safariFileSave'

/**
 * Removes line breaks and ensures that the string is no
 * longer than maxLength chars (or 75 chars if none specified).
 *
 * @param {String} str - string to sanitize
 * @param {Number} maxLength
 * @returns {String}
 */
export const formatText = (str, maxLength) => {
  if (!str) {
    return ''
  }
  str = str.replace(/\n/g, '\\n')
  str = str.substring(0, maxLength)

  return str
}

/**
 * The name of the file will be the event title with alphanumeric chars with the extension `.ics`.
 *
 * @param {String} icsData
 * @returns {Blob}
 */
export const getBlob = (icsData) => {
  return new Blob([icsData], {
    type: 'application/octet-stream' // TODO: change to text/calendar?
  })
}

/**
 * Transforms given string to be valid file name.
 *
 * @param {String} title
 * @returns {String}
 */
export const getFileName = (title) => {
  if (!title) {
    return 'event.ics'
  }
  return `${title.replace(/[^\w ]/g, '')}.ics`
}

/**
 * Returns a random base 36 hash for iCal UID.
 *
 * @returns {String}
 */
export const getUid = () => {
  return Math.random().toString(36).substr(2)
}

/**
 * Converts the given recurrence options to RFC????
 *
 * @param {*} recurrence
 */
export const getRrule = (recurrence) => {
  return toIcsParamString({
    'FREQ': recurrence.frequency,
    'INTERVAL': recurrence.interval,
    'COUNT': recurrence.count,
    'WKST': recurrence.weekStart,
    'UNTIL': formatTime(recurrence.end),
    'BYDAY': recurrence.weekdays,
    'BYMONTHDAY': recurrence.monthdays
  })
}

/**
 * Downloads the given ics as an iCalendar file.
 *
 * @param {String} title - title of the event
 * @param {String} data - ics data
 */
export const download = (title, data) => {
  const fileName = getFileName(title)
  const isSafari = ~navigator
    .userAgent
    .toLowerCase()
    .indexOf('safari')

  if (isSafari) {
    FileSaver.saveAs(getBlob(data), fileName)
  } else {
    safariFileSave(data, fileName)
  }
}
