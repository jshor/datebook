/**
 * angular-addtocalendar
 * An AngularJS directive for adding an event to calendar apps. 
 * 
 * Controller test suite.
 */
'use strict';

describe('AddtocalendarCtrl', function() {
  beforeEach(module('jshor.angular-addtocalendar'));

  var $controller;
  var FileSaver;

  beforeEach(inject(function(_$controller_, _FileSaver_) {
    $controller = _$controller_;
    FileSaver = _FileSaver_;
  }));

  Object.keys(eventFixtures).forEach(function (scope) {

    /**
     * Yahoo! Calendar
     */
    describe('$scope.calendarUrl.yahoo ' + scope, function() {

      it('should return the url to add event to a yahoo calendar', function() {
        var $scope = eventFixtures[scope];

        $controller('AddtocalendarCtrl', {
          $scope: $scope,
          $attrs: {}
        });

        var regex = CalendarRegex.getUrlRegex('calendar.yahoo.com/', {
          v: 60,
          view: 'd',
          type: 20,
          TITLE: '(.*)',
          ST: CalendarRegex.dateRegex,
          DUR: CalendarRegex.militaryHoursRegex,
          DESC: '(.*)',
          in_loc: '(.*)'
        });

        var isValidYahooCalendar = regex.test($scope.calendarUrl.yahoo);

        expect(isValidYahooCalendar).toEqual(true);
      });

    });

    /**
     * Google Calendar
     */
    describe('$scope.calendarUrl.google ' + scope, function() {
      var $scope = eventFixtures[scope];

      it('should return the url to add event to a google calendar', function() {
        $controller('AddtocalendarCtrl', {
          $scope: $scope,
          $attrs: {}
        });

        var regex = CalendarRegex.getUrlRegex('www.google.com/calendar/render', {
          action: 'TEMPLATE',
          text: '(.*)',
          dates: CalendarRegex.dateRegex + '\\/' + CalendarRegex.dateRegex,
          details: '(.*)',
          location: '(.*)'
        });

        var isValidGoogleCalendar = regex.test($scope.calendarUrl.google);

        expect(isValidGoogleCalendar).toEqual(true);
      });

    });

    /**
     * Windows Live Calendar
     */
    describe('$scope.calendarUrl.microsoft ' + scope, function() {
      var $scope = eventFixtures[scope];

      it('should return the url to add event to a windows live calendar', function() {
        $controller('AddtocalendarCtrl', {
          $scope: $scope,
          $attrs: {}
        });

        var regex = CalendarRegex.getUrlRegex('calendar.live.com/calendar/calendar.aspx', {
          rru: 'addevent',
          summary: '(.*)',
          dtstart: CalendarRegex.dateRegex,
          dtend: CalendarRegex.dateRegex,
          description: '(.*)',
          location: '(.*)'
        });

        var isValidMicrosoftCalendar = regex.test($scope.calendarUrl.microsoft);

        expect(isValidMicrosoftCalendar).toEqual(true);
      });

    });

    /**
     * iCalendar/Outlook
     */
    describe('$scope.calendarUrl.icalendar ' + scope, function() {
      var $scope = eventFixtures[scope];

      it('should return the url and data of an icalendar file', function() {
        $controller('AddtocalendarCtrl', {
          $scope: $scope,
          $attrs: {}
        });

        var regex = CalendarRegex.getIcsCalendarRegex();

        sinon.stub(FileSaver, 'saveAs');

        $scope.calendarUrl.dlIcal();
        sinon.spy();
        var isValidICalendar = regex.test($scope.calendarUrl.icalendar);

        expect(isValidICalendar).toEqual(true);
      });

    });

  });

});
