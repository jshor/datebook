/**
 * angular-addtocalendar
 * An AngularJS directive for adding an event to calendar apps. 
 * 
 * Controller test suite.
 */

import 'angular';
import 'angular-mocks/angular-mocks';
import eventFixtures from './fixtures/events.fixture';
import angularAtc from '../../../src/component/app';

import CalendarRegex from '../../helpers/regex';

describe('AddtocalendarCtrl', function() {

  let controller,
      FileSaver,
      $attrs = eventFixtures.sampleEventFixture;
  
  $attrs.$observe = () => {};

  beforeEach(() => {
    angular.mock.module(angularAtc);

    angular.mock.inject(($controller) => {
      controller = $controller('AddtocalendarCtrl', {$attrs});
    });
  });

  /**
   * Yahoo! Calendar
   */
  describe('$scope.calendarUrl.yahoo ', function() {

    it('should return the url to add event to a yahoo calendar', function() {

      let regex = CalendarRegex.getUrlRegex('calendar.yahoo.com/', {
        v: 60,
        view: 'd',
        type: 20,
        TITLE: '(.*)',
        ST: CalendarRegex.dateRegex,
        DUR: CalendarRegex.militaryHoursRegex,
        DESC: '(.*)',
        in_loc: '(.*)'
      });

      let isValidYahooCalendar = regex.test(controller.calendarUrl.yahoo);

      expect(isValidYahooCalendar).toEqual(true);
    });

  });

  /**
   * Google Calendar
   */
  describe('$scope.calendarUrl.google ' + scope, function() {

    it('should return a valid url to add event to a google calendar', function() {

      var regex = CalendarRegex.getUrlRegex('www.google.com/calendar/render', {
        action: 'TEMPLATE',
        text: '(.*)',
        dates: CalendarRegex.dateRegex + '\\/' + CalendarRegex.dateRegex,
        details: '(.*)',
        location: '(.*)'
      });

      var isValidGoogleCalendar = regex.test($controller.calendarUrl.google);

      expect(isValidGoogleCalendar).toEqual(true);
    });

  });

  /**
   * Windows Live Calendar
   */
  describe('$scope.calendarUrl.microsoft ' + scope, function() {

    it('should return the url to add event to a windows live calendar', function() {

      var regex = CalendarRegex.getUrlRegex('calendar.live.com/calendar/calendar.aspx', {
        rru: 'addevent',
        summary: '(.*)',
        dtstart: CalendarRegex.dateRegex,
        dtend: CalendarRegex.dateRegex,
        description: '(.*)',
        location: '(.*)'
      });

      var isValidMicrosoftCalendar = regex.test($controller.calendarUrl.microsoft);

      expect(isValidMicrosoftCalendar).toEqual(true);
    });

  });

  /**
   * iCalendar/Outlook
   */
  describe('$scope.calendarUrl.icalendar ' + scope, function() {

    it('should return the url and data of an icalendar file', function() {

      var regex = CalendarRegex.getIcsCalendarRegex();

      // sinon.stub(FileSaver, 'saveAs');

      $controller.calendarUrl.dlIcal();
      // sinon.spy();
      var isValidICalendar = regex.test($controller.calendarUrl.icalendar);

      expect(isValidICalendar).toEqual(true);
    });

  });

});