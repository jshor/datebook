import CalendarBase from './CalendarBase'
import { URL } from '../constants'
import { toQueryString } from '../utils/data'

export default class OutlookCalendar extends CalendarBase {
  /**
   * @param {Object} options
   * @param {Object} options.start - start timestamp
   * @param {Object} options.end - end timestamp; omit if this is an all-day event
   */
  constructor (options) {
    super(options)
  }
  
  /**
   * Generates the Outlook url.
   * 
   * @returns {String}
   */
  render () {
    const params = {
      path: '/calendar/view/Month',
      rru: 'addevent',
      startdt: this.start,
      enddt: this.end,
      subject: this.title,
      body: this.description,
      location: this.location,
      allday: this.allday
    }
    
    const baseUrl = URL.OUTLOOK
    const queryString = toQueryString(params)
    
    return `${baseUrl}?${queryString}`
  }
}