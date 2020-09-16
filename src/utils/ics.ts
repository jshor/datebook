import * as FileSaver from 'file-saver'
import data from './data'
import time from './time'
import safariFileSave from './safariFileSave'
import IRecurrence from '../interfaces/IRecurrence'

/**
 * Removes line breaks from a string. Returns an empty string if falsy.
 *
 * @param {string} [str = ''] - string to sanitize
 * @returns {string}
 */
const formatText = (str = ''): string => {
  return str.replace(/\n/g, '\\n')
}

/**
 * The name of the file will be the event title with alphanumeric chars with the extension `.ics`.
 *
 * @param {string} icsData
 * @returns {Blob}
 */
const getBlob = (icsData: string): Blob => {
  return new Blob([icsData], {
    type: 'application/octet-stream' // TODO: change to text/calendar?
  })
}

/**
 * Transforms given string to be valid file name.
 *
 * @param {string} title
 * @returns {string}
 */
const getFileName = (title: string): string => {
  if (!title) {
    return 'event.ics'
  }
  return `${title.replace(/[^\w ]/g, '')}.ics`
}

/**
 * Returns a random base 36 hash for iCal UID.
 *
 * @returns {string}
 */
const getUid = (): string => {
  return Math.random().toString(36).substr(2)
}

/**
 * Returns the hostname for usage in `PRODID`. Returns `datebook` in Node.js.
 *
 * @returns {string}
 */
const getProdId = (): string => {
  return typeof window !== 'undefined'
    ? window.location.host
    : 'datebook'
}

/**
 * Converts the given recurrence options to RFC????
 *
 * @param {IRecurrence} recurrence
 * @returns {string}
 */
const getRrule = (recurrence: IRecurrence): string => {
  const rrule: Record<string, any> = {
    FREQ: recurrence.frequency,
    INTERVAL: recurrence.interval?.toString(),
    COUNT: recurrence.count?.toString(),
    WKST: recurrence.weekstart,
    BYDAY: recurrence.weekdays,
    BYMONTHDAY: recurrence.monthdays
  }

  if (recurrence.end) {
    rrule.UNTIL = time.formatTimestampString(recurrence.end, 'YYYYMMDDThhmmss')
  }

  return data.toIcsParamString(rrule)
}

/**
 * Downloads the given ics as an iCalendar file.
 *
 * @param {string} title - title of the event
 * @param {string} data - ics data
 */
const download = (title: string, data: string): void => {
  const fileName = getFileName(title)

  if (window.hasOwnProperty('safari')) {
    safariFileSave(data, fileName)
  } else {
    const blob = getBlob(data)
    FileSaver.saveAs(blob, fileName)
  }
}

export default {
  formatText,
  getBlob,
  getFileName,
  getUid,
  getProdId,
  getRrule,
  download
}
