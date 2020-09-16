import GoogleCalendar from '../GoogleCalendar'
import YahooCalendar from '../YahooCalendar'
import ICalendar from '../ICalendar'
import OutlookCalendar from '../OutlookCalendar'
import warn from './warn'

export default class Calendars {
  static getGoogleCalendarUrl (options) {
    warn('`Calendars.getGoogleCalendarUrl()`')
    return (new GoogleCalendar(options)).render()
  }
  
  static getYahooCalendarUrl (options) {
    warn('`Calendars.getYahooCalendarUrl()`')
    return (new YahooCalendar(options)).render()
  }

  static getMicrosoftCalendarUrl (options) {
    warn('`Calendars.getMicrosoftCalendarUrl()`')
    return (new OutlookCalendar(options)).render()
  }
  
  static downloadIcs (options) {
    warn('`Calendars.downloadIcs()`')
    return (new ICalendar(options)).download()
  }
}