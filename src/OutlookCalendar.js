import CalendarBase from './CalendarBase'
import { URL } from './constants'
import { toQueryString } from './utils/data'

/**
 * Generates a an Outlook Calendar url.
 * Note that Outlook Calendar's query string params do not support recurrence.
 * 
 * @example
 *  import { OutlookCalendar } from 'datebook'
 * 
 *  const outlook = new OutlookCalendar({
 *    title: 'Happy Hour',
 *    location: 'The Bar, New York, NY',
 *    description: 'Let\'s blow off some steam from our weekly deployments to enjoy a tall cold one!',
 *    start: '20190704T190000',
 *    end: '20190704T210000'
 *  })
 * 
 *  outlook.render() // https://calendar.google.com/calendar/render?action=TEMPLATE&text=Happy%20Hour&details=Let%27s%20blow%20off%20some%20steam%20from%20our%20weekly%20deployments%20to%20enjoy%20a%20tall%20cold%20one!&location=The%20Bar%2C%20New%20York%2C%20NY&dates=20190704T190000%2F20190704T210000&recur=RRULE%3AFREQ%3DWEEKLY%3BINTERVAL%3D2%3BUNTIL%3D20190610T123926
 *
 */
export default class OutlookCalendar extends CalendarBase {
  /**
   * Constructor.
   * 
   * @param {Object} options
   * @param {String} options.description - event description
   * @param {String} options.title - event title
   * @param {String} options.location - event location 
   * @param {String} options.start - event start time
   * @param {String} [options.end] - event end time
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