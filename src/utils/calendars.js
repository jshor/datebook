import GoogleCalendar from '../GoogleCalendar'
import YahooCalendar from '../YahooCalendar'
import ICalendar from '../ICalendar'
import OutlookCalendar from '../OutlookCalendar'

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