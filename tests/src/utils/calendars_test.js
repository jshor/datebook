import Calendars from '../../../src/utils/calendars';
import CalendarRegex from '../../helpers/regex';
import event from './fixtures/event.fixture';


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

  //   let sandbox;

  //   beforeEach(() => {
  //     sandbox = sinon.sandbox.create();
  //   });

  //   afterEach(() => {
  //     sandbox.restore();
  //   });

  //   it('should return the url and data of an icalendar file', function() {

  //     var regex = CalendarRegex.getIcsCalendarRegex();

  //     // sandbox.stub(FileSaver, 'saveAs');

  //     controller.calendarUrl.dlIcal();
  //     // sinon.spy();
  //     var isValidICalendar = regex.test(controller.calendarUrl.icalendar);

  //     // expect(isValidICalendar).toEqual(true);
  //   });


    // it('should have ics data matching that of the standard regex pattern', () => {

    // });

    // it('should call the formatIcsText functions for location and summary params', () => {

    // });

    // it('should call the random UID generator for the UID param', () => {

    // });

    // it('should call the current universal timestamp function', () => {

    // });

  });

});