/**
 * Filters out invalid fields and formats for the given Datebook recurrence config.
 * 
 * @param {Object} value
 * @returns {Object}
 */
export default function getFilteredRecurrence (value) {
  const recurrence = {...value}

  if (recurrence.end) {
    recurrence.end = new Date(recurrence.end)
  }

  if (recurrence.frequency === 'DAILY') {
    // these fields are invalid for daily recurrences
    delete recurrence.weekdays
    delete recurrence.monthdays
  }

  if (recurrence.frequency !== 'YEARLY') {
    // only yearly recurrences can specify the month
    delete recurrence.month
  }
  
  if (recurrence.frequency === 'WEEKLY') {
    // strip the freq numbers in front of weekday days
    recurrence.weekdays = recurrence
      .weekdays
      .map(day => day.replace(/[^A-Z]/ig, ''))
  }

  if (!recurrence.byType.weekdays) {
    delete recurrence.weekdays
  }

  if (!recurrence.byType.monthdays) {
    delete recurrence.monthdays
  }

  if (recurrence.byRepeat.untilDate && recurrence.until) {
    recurrence.until += 'T00:00:00Z'
  } else {
    delete recurrence.until
  }

  if (!recurrence.byRepeat.count) {
    delete recurrence.count
  }

  // delete the non-spec configs
  delete recurrence.byRepeat
  delete recurrence.byType

  return recurrence
}