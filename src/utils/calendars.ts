import GoogleCalendar from '../GoogleCalendar'
import YahooCalendar from '../YahooCalendar'
import ICalendar from '../ICalendar'
import OutlookCalendar from '../OutlookCalendar'
import IOptions from '../interfaces/IOptions'
import warn from './warn'

export default class Calendars {
  static getGoogleCalendarUrl (options: IOptions) {
    warn('`Calendars.getGoogleCalendarUrl()`')
    return (new GoogleCalendar(options)).render()
  }
  
  static getYahooCalendarUrl (options: IOptions) {
    warn('`Calendars.getYahooCalendarUrl()`')
    return (new YahooCalendar(options)).render()
  }

  static getMicrosoftCalendarUrl (options: IOptions) {
    warn('`Calendars.getYahooCalendarUrl()`')
    return (new OutlookCalendar(options)).render()
  }
  
  static downloadIcs (options: IOptions) {
    warn('`Calendars.downloadIcs()`')
    return (new ICalendar(options)).download()
  }
}