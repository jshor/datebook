import * as FileSaver from 'file-saver'
import data from './data'
import time from './time'
import safariFileSave from './safariFileSave'
import CalendarRecurrence from '../types/CalendarRecurrence'
import { FORMAT } from '../constants'

/**
 * Removes line breaks from a string. Returns an empty string if falsy.
 *
 * @param {string} [str = ''] - string to sanitize
 * @returns {string}
 */
const formatText = (str = ''): string => {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/[,;]/g, '\\$&')
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
  return Math.random()
    .toString(36)
    .substr(2)
}

/**
 * Returns the hostname for usage in `PRODID`. Returns `datebook` in Node.js.
 *
 * @returns {string}
 */
const getProdId = (): string => {
  return typeof window !== 'undefined' ? window.location.host : 'datebook'
}

/**
 * Converts the given recurrence options to RFC????
 *
 * @param {CalendarRecurrence} recurrence
 * @returns {string}
 */
const getRrule = (recurrence: CalendarRecurrence): string => {
  const rrule: Record<string, any> = {
    FREQ: recurrence.frequency,
    INTERVAL: recurrence.interval?.toString(),
    COUNT: recurrence.count?.toString(),
    WKST: recurrence.weekstart,
    BYDAY: recurrence.weekdays,
    BYMONTHDAY: recurrence.monthdays
  }

  if (recurrence.end) {
    rrule.UNTIL = time.formatDate(recurrence.end, FORMAT.FULL)
  }

  return data.toIcsParamString(rrule)
}

/**
 * Returns true if the current browser is Safari.
 *
 * @returns {boolean}
 */
const isSafari = (): boolean => {
  return (
    window.hasOwnProperty('safari') ||
    // check to ensure navigator is not Chrome (which includes Safari in the user agent)
    (/^((?!chrome|android).)*safari/i.test(navigator.userAgent) &&
      // browsers on iOS are wrappers around Safari, but include CriOS (Chrome), FxiOS (Firefox), etc.
      !/(cr|fx)ios[^a-z]/i.test(navigator.userAgent))
  )
}

/**
 * Downloads the given ics as an iCalendar file.
 *
 * @param {string} fileName - filename of the event file
 * @param {string} data - ics data
 */
const download = (fileName: string, data: string): void => {
  if (isSafari()) {
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
