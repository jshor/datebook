import GoogleCalendar from '../core/GoogleCalendar'
import YahooCalendar from '../core/YahooCalendar'
import ICalendar from '../core/ICalendar'
import OutlookCalendar from '../core/OutlookCalendar'

export default class Calendars {
  static getGoogleCalendarUrl (options) {
    return (new GoogleCalendar(options)).render()
  }
  
  static getYahooCalendarUrl (options) {
    return (new YahooCalendar(options)).render()
  }

  static getMicrosoftCalendarUrl (options) {
    return (new OutlookCalendar(options)).render()
  }
  
  static downloadIcs (options) {
    return (new ICalendar(options)).download()
  }
}