import CalendarBase from './CalendarBase'
import { formatText, getUid, getRrule, download } from '../utils/ics'
import { getTimeCreated } from '../utils/time'

export default class ICalendar extends CalendarBase {
  /**
   * @param {Object} options
   * @param {Object} options.start - start timestamp
   * @param {Object} options.end - end timestamp; omit if this is an all-day event
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
    const description = formatText(this.description, 62)
    const location = formatText(this.location, 64)
    const summary = formatText(this.title, 66)
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