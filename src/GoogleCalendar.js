import CalendarBase from './CalendarBase'
import { FORMAT, URL } from './constants'
import { formatTimestampString } from './utils/time'
import { toQueryString } from './utils/data'
import { getRrule } from './utils/ics'

/**
 * Generates a Google Calendar url.
 * 
 * @example
 *  import { GoogleCalendar } from 'datebook'
 * 
 *  const google = new GoogleCalendar({
 *    title: 'Happy Hour',
 *    location: 'The Bar, New York, NY',
 *    description: 'Let\'s blow off some steam from our weekly deployments to enjoy a tall cold one!',
 *    start: '20190704T190000',
 *    end: '20190704T210000',
 *    recurrence: {
 *      frequency: 'WEEKLY'
 *      interval: 2
 *    }
 *  })
 * 
 *  google.render() // https://calendar.google.com/calendar/render?action=TEMPLATE&text=Happy%20Hour&details=Let%27s%20blow%20off%20some%20steam%20from%20our%20weekly%20deployments%20to%20enjoy%20a%20tall%20cold%20one!&location=The%20Bar%2C%20New%20York%2C%20NY&dates=20190704T190000%2F20190704T210000&recur=RRULE%3AFREQ%3DWEEKLY%3BINTERVAL%3D2%3BUNTIL%3D20190610T123926
 * 
 */
export default class GoogleCalendar extends CalendarBase {
  /**
   * @inheritDoc
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
    
    let start = formatTimestampString(this.start, FORMAT.FULL)
    let end = formatTimestampString(this.end, FORMAT.FULL)
    
    if (this.allday) {
      start = formatTimestampString(this.start, FORMAT.DATE)
      end = formatTimestampString(this.end, FORMAT.DATE)
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