/* eslint-disable */
import {
  GoogleCalendar,
  YahooCalendar,
  OutlookCalendar,
  ICalendar
} from '.'

declare global {
  interface Window {
    datebook: {
      GoogleCalendar
      YahooCalendar
      OutlookCalendar
      ICalendar
    }
  }
}
