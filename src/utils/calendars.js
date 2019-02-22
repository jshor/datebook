import Utils from './utils';

export default class Calendars {

  static getYahooCalendarUrl(data) {
    var yahooCalendarUrl = 'http://calendar.yahoo.com/?v=60&view=d&type=20';
    var duration = Utils.getHoursDuration(data.startDate, data.endDate);

    yahooCalendarUrl += '&TITLE=' + data.title;
    yahooCalendarUrl += '&ST=' + data.startDate + '&DUR=' + duration;
    yahooCalendarUrl += '&DESC=' + data.description;
    yahooCalendarUrl += '&in_loc=' + data.location;

    return yahooCalendarUrl;
  }

  static getMicrosoftCalendarUrl(data) {
    var microsoftCalendarUrl = 'http://calendar.live.com/calendar/calendar.aspx?rru=addevent';
    microsoftCalendarUrl += '&summary=' + data.title;
    microsoftCalendarUrl += '&dtstart=' + data.startDate + '&dtend=' + data.endDate;
    microsoftCalendarUrl += '&description=' + data.description;
    microsoftCalendarUrl += '&location=' + data.location;

    return microsoftCalendarUrl;
  }

  static getGoogleCalendarUrl(data) {
    var googleCalendarUrl = 'https://www.google.com/calendar/render?action=TEMPLATE';
    googleCalendarUrl += '&text=' + data.title;
    googleCalendarUrl += '&dates=' + data.startDate + '/' + data.endDate;
    googleCalendarUrl += '&details=' + data.description;
    googleCalendarUrl += '&location=' + data.location;

    return googleCalendarUrl;
  }

  static getIcsCalendar(data) {

    //TODO expand these rules as per those defined in the specification https://www.kanzaki.com/docs/ical/rrule.html
    var rrule = {
      "FREQ" : data.recurrenceFrequency, //the recurrence frequency, e.g. WEEKLY, MONTHLY, DAILY (FREQ=WEEKLY)
      "INTERVAL" : data.recurrenceInterval, //frequency unit of time between recurrence instances
      "COUNT" : data.recurrenceCount, // e.g. 8 (COUNT=8)
      "WKST" : "SU", // defaulting start of week to Sunday (WKST=SU)
      "UNTIL" : data.recurrenceEnd, //end date for the recurrence, e.g. 19971224T000000Z (UNTIL=19971224T000000Z)
      "BYDAY" : data.recurrenceWeekdays, //for weekly recurrence, the days to recur, e.g. TU,TH (BYDAY=TU,TH),
      "BYMONTHDAY" : data.recurrenceMonthdays //for monthly recurrence, the days of the month on which the event should fall (BYMONTHDAY=13)
    }

    return [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      'CLASS:PUBLIC',
      'DESCRIPTION:' + Utils.formatIcsText(data.description, 62),
      'DTSTART:' + data.startDate,
      'DTEND:' + data.endDate,
      'LOCATION:' + Utils.formatIcsText(data.location, 64),
      'SUMMARY:' + Utils.formatIcsText(data.title, 66),
      'TRANSP:TRANSPARENT',
      'END:VEVENT',
      'END:VCALENDAR',
      'UID:' + Utils.getUid(),
      'DTSTAMP:' + Utils.getTimeCreated(),
      'PRODID:angular-addtocalendar',
      'RRULE:' + Utils.getRecurrence(rrule)
    ].join('\n');
  }
}
