import Calendars from '../../../src/utils/calendars';
import CalendarRegex from '../../helpers/regex';
import event from '../../fixtures/event.fixture';


describe('Calendars', () => {

  describe('getYahooCalendarUrl', () => {

    it('should return the url to add event to a yahoo calendar', () => {

      let regex = CalendarRegex.getUrlRegex('calendar.yahoo.com/', {
        v: 60,
        view: 'd',
        type: 20,
        TITLE: '(.*)',
        ST: CalendarRegex.dateRegex,
        DUR: '[0-9]+',
        DESC: '(.*)',
        in_loc: '(.*)'
      });
      
      let result = Calendars.getYahooCalendarUrl(event);

      expect(result).to.be.a.string;
      expect(result).to.not.be.empty;
      expect(result).to.match(regex);
    });

  });

  describe('getGoogleCalendarUrl', () => {

    it('should return a valid url to add event to a google calendar', () => {

      let regex = CalendarRegex.getUrlRegex('www.google.com/calendar/render', {
        action: 'TEMPLATE',
        text: '(.*)',
        dates: CalendarRegex.dateRegex + '\\/' + CalendarRegex.dateRegex,
        details: '(.*)',
        location: '(.*)'
      });
      
      let result = Calendars.getGoogleCalendarUrl(event);

      expect(result).to.be.a.string;
      expect(result).to.not.be.empty;
      expect(result).to.match(regex);
    });

  });

  describe('getMicrosoftCalendarUrl', () => {

    it('should return the url to add event to a windows live calendar', () => {

      let regex = CalendarRegex.getUrlRegex('calendar.live.com/calendar/calendar.aspx', {
        rru: 'addevent',
        summary: '(.*)',
        dtstart: CalendarRegex.dateRegex,
        dtend: CalendarRegex.dateRegex,
        description: '(.*)',
        location: '(.*)'
      });

      let result = Calendars.getMicrosoftCalendarUrl(event);

      expect(result).to.be.a.string;
      expect(result).to.not.be.empty;
      expect(result).to.match(regex);
    });

  });

  describe('getIcsCalendar', () => {

    it('should return the raw data of the rendered icalendar file', () => {
      const regex = new RegExp(CalendarRegex.getIcsCalendarRegex());

      let result = Calendars.getIcsCalendar(event);

      expect(result).to.be.defined;
      expect(result).to.be.a.string;
      expect(result).to.not.be.empty;
      expect(result).to.match(regex);
    });

  });

});