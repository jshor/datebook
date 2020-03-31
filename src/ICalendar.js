import CalendarBase from './CalendarBase'
import { formatText, getUid, getRrule, download } from './utils/ics'
import { getTimeCreated } from './utils/time'

/**
 * Generates a downloadable ICS file.
 * 
 * @example
 *  import { ICalendar } from 'datebook'
 * 
 *  const icalendar = new ICalendar({
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
 *  icalendar.render() // renders the following:
 *  // BEGIN:VCALENDAR
 *  // VERSION:2.0
 *  // BEGIN:VEVENT
 *  // CLASS:PUBLIC
 *  // DESCRIPTION:Let's blow off some steam from our weekly deployments to enjoy
 *  // DTSTART:20190704T190000
 *  // DTEND:20190704T210000
 *  // LOCATION:The Bar, New York, NY
 *  // SUMMARY:Happy Hour
 *  // TRANSP:TRANSPARENT
 *  // RRULE:FREQ=WEEKLY;INTERVAL=2;UNTIL=20190610T123608
 *  // END:VEVENT
 *  // END:VCALENDAR
 *  // UID:7ci7n1e1i6a
 *  // DTSTAMP:20190610T123608
 *  // PRODID:mydomain.com
 * 
 *  icalendar.download() // downloads the .ics file as <title>.ics
 * 
 */
export default class ICalendar extends CalendarBase {
  /**
   * @inheritDoc
   */
  constructor (options) {
    super(options)
  }
  
  /**
   * Downloads the rendered iCalendar.
   */
  download () {
    download(this.title, this.render())
  }
  
  /**
   * Generates the iCalendar data.
   * 
   * @returns {String}
   */
  render () {
    const description = formatText(this.description, 512)
    const location = formatText(this.location, 250)
    const summary = formatText(this.title, 512)
    const event = [
      'CLASS:PUBLIC',
      `DESCRIPTION:${description}`,
      `DTSTART:${this.start}`,
      `DTEND:${this.end}`,
      `LOCATION:${location}`,
      `SUMMARY:${summary}`,
      'TRANSP:TRANSPARENT'
    ]
    
    if (this.recurrence) {
      event.push(`RRULE:${getRrule(this.recurrence)}`)
    }
    
    const uid = getUid()
    const timeCreated = getTimeCreated()
    const host = window.location.host
    const calendar = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      event.join('\n'),
      'END:VEVENT',
      'END:VCALENDAR',
      `UID:${uid}`,
      `DTSTAMP:${timeCreated}`,
      `PRODID:${host}`
    ]
    
    return calendar.join('\n')
  }
}