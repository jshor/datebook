import { RECURRENCE } from '../constants'
import CalendarRecurrence from '../types/CalendarRecurrence'
import data from './data'
import time from './time'

/**
 * Maps the given Recurrence weekdays to a Yahoo! weekdays format.
 * This will strip out any count prefixes, as they're not supported by YC.
 * Example: 1MO,2TU,3WE becomes MoTuWe
 *
 * @param {string[]} [weekdays = []]
 * @returns {string}
 */
const getWeekdays = (weekdays: string[] = []): string => {
  return weekdays
    .map(w => {
      return data.toProperCase(w.replace(/[^A-Z]/ig, ''))
    })
    .join('')
}

/**
 * Maps the given Recurrence frequency to a Yahoo! frequency format.
 * Example: DAILY becomes Dy; MONTHLY becomes Mh
 *
 * @param {string} frequency
 * @returns {string}
 */
const getFrequency = (frequency: string | undefined): string => {
  const { FREQUENCY } = RECURRENCE

  switch (frequency) {
    case FREQUENCY.YEARLY:
      return 'Yr'
    case FREQUENCY.MONTHLY:
      return 'Mh'
    case FREQUENCY.WEEKLY:
      return 'Wk'
    default:
      return 'Dy' // daily
  }
}

/**
 * Converts the Recurrence to a Yahoo! recurrence string.
 *
 * @param {CalendarRecurrence} recurrence
 * @returns {string}
 */
const getRecurrence = (recurrence: CalendarRecurrence): string => {
  const frequency = getFrequency(recurrence.frequency)
  const weekdays = getWeekdays(recurrence.weekdays)
  const { interval = 1 } = recurrence

  let prefix = ''

  if (recurrence.weekdays?.length && recurrence.frequency === RECURRENCE.FREQUENCY.MONTHLY) {
    // YC only supports the first count of a recurring weekday
    // e.g., -1FR,2TU (every last Friday and every second Tuesday) is NOT supported, but
    // -1FR,TU (every last Friday and Tuesday) IS supported -- strip out all prefixes from
    // the list, then find the first nonzero prefix (if any) and prepend it to the list
    const matches = recurrence.weekdays[0].match(/^([1-5])/)

    prefix = matches ? matches[0] : '1'
  }

  return [
    time.addLeadingZero(interval),
    frequency,
    prefix,
    weekdays
  ].join('')
}

export default {
  getWeekdays,
  getFrequency,
  getRecurrence
}
