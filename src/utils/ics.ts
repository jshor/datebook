import data from './data'
import time from './time'
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

export default {
  formatText,
  getUid,
  getProdId,
  getRrule
}
