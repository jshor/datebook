import CalendarBase from './CalendarBase'
import { FORMAT, URL } from '../constants'
import { formatTime } from '../utils/time'
import { toQueryString } from '../utils/data'
import { getRrule } from '../utils/ics'

export default class GoogleCalendar extends CalendarBase {
  /**
   * @param {Object} options
   * @param {Object} options.start - start timestamp
   * @param {Object} options.end - end timestamp; omit if this is an all-day event
   */
  constructor (options) {
    super(options)
  }
  
  /**
   * Generates the Google Calendar url.
   * 
   * @returns {String}
   */
  render () {
    const params = {
      action: 'TEMPLATE',
      text: this.title,
      details: this.description,
      location: this.location
    }
    
    let start = formatTime(this.start, FORMAT.FULL)
    let end = formatTime(this.end, FORMAT.FULL)
    
    if (this.allday) {
      start = formatTime(this.start, FORMAT.DATE)
      end = formatTime(this.end, FORMAT.DATE)
    }
    
    params.dates = `${start}/${end}`
    
    if (this.recurrence) {
      params.recur = `RRULE:${getRrule(this.recurrence)}`
    }
    
    const baseUrl = URL.GOOGLE
    const queryString = toQueryString(params)
    
    return `${baseUrl}?${queryString}`
  }
}