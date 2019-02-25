import { formatTime } from './time'

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
  return joinParams({
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
 * Creates a key-value pair for a given iCalendar dictionary.
 * 
 * @param {Object} params 
 * @returns {String}
 */
export const joinParams = (params) => {
  const data = []
  
  for (let key in params) {
    if (params.hasOwnProperty(key) && params[key] !== undefined) {
      data.push(`${key}=${params[key]}`)
    }
  }
  
  return data.join(';')
}

/**
 * Downloads the given ics. Meant to be used only for Safari.
 * 
 * @param {String} data - ics data
 * @param {String} fileName - file name to save, ending in .ics
 */
export const safariFileSave = (data, fileName) => {
  const anchor = document.createElement('a');
  const encodedData = encodeURIComponent(data)
  
  anchor.setAttribute('href', `data:text/calendar;charset=utf-8,${encodedData}`)
  anchor.setAttribute('download', fileName)

  if (document.createEvent) {
    const event = document.createEvent('MouseEvents')
    
    event.initEvent('click', true, true)
    anchor.dispatchEvent(event)
  } else {
    anchor.click()
  }
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
    safariFileSave(data, fileName)
  } else {
    FileSaver.saveAs(getBlob(data), fileName)
  }
}