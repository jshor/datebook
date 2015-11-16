'use strict';

describe('AddtocalendarCtrl', function() {
  beforeEach(module('jshor.angular-addtocalendar'));

  var $controller;
  var dateRegex = '[0-9]{8}T[0-9]{6}'; // universal timestamp format

  beforeEach(inject(function(_$controller_) {
    $controller = _$controller_;
  }));

  /**
   * Returns a sample event to test with.
   * 
   * @return {Object} params of event, mimicking directive scope params
   */
  function getSampleEvent() {

    return {
      startDate: '20150704T190000',
      endDate: '20150704T210000',
      title: 'A sample event!',
      description: 'Some interesting description here.',
      location: '1 Futurama Pl, New New York'
    };

  }

  /**
   * Escapes a string so it is treated literally in regex.
   * @param  {String} s  string to escape
   * @return {String}    escape string
   */
  function escapeRegex(s) {

    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

  }

  /**
   * Returns a regular expression for a calendar service url.
   * 
   * @param  {String} baseUrl   the host name of the calendar service
   * @param  {Object} urlParams query string parameters to send
   * @return {RegExp}           regular expression of cal. service url
   */
  function getUrlRegex(baseUrl, urlParams) {

  	var regex = 'http(s?)\\:\\/\\/' + escapeRegex(baseUrl) + '\\?';
  	var params = [];

		for(var key in urlParams) { 
			params.push(key + '\=' + urlParams[key]);
		}

		regex += params.join('\\&');

		return new RegExp(regex, 'g');

  }

  /**
   * Renders the regex for testing a .ics and its download prefix.
   * 
   * @return {RegExp} regex of ics
   */
  function getIcsCalendarRegex() {

    // prefix to download as file in browser
    var regex = 'data\\:application\\/octet-stream\\;charset=utf-8\\,';

    // header metadata
    regex += encodeURIComponent([
      'BEGIN:VCALENDAR',
      'VERSION:2',
      'BEGIN:VEVENT',
      'CLASS:PUBLIC',
      'DESCRIPTION:'
    ].join('\n'));

    regex += '(.*)' + encodeURIComponent('\n');

    // date information
    regex += [
      encodeURIComponent('DTSTART;VALUE=DATE:') + dateRegex,
      encodeURIComponent('DTEND;VALUE=DATE:') + dateRegex,
    ].join(encodeURIComponent('\n'));

    regex += encodeURIComponent('\n');

    // location, description
    regex += [
      encodeURIComponent('LOCATION:') + '(.*)',
      encodeURIComponent('SUMMARY;LANGUAGE=en-us:') + '(.*)',
    ].join(encodeURIComponent('\n'));

    // footer metadata
    regex += encodeURIComponent([
      'TRANSP:TRANSPARENT',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\n'));

    return new RegExp(regex, 'g');
  }

  /**
   * Yahoo! Calendar
   */
  describe('$scope.calendarUrl.yahoo', function() {

  	it('should return the url to add event to a yahoo calendar', function() {
  		var $scope = getSampleEvent();

      $controller('AddtocalendarCtrl', { $scope: $scope });

      var regex = getUrlRegex('calendar.yahoo.com/', {
      	v: 60,
      	view: 'd',
      	type: 20,
      	title: '(.*)',
      	st: dateRegex,
      	et: dateRegex,
      	desc: '(.*)',
      	in_loc: '(.*)'
      });

      var isValidYahooCalendar = regex.test($scope.calendarUrl.yahoo);

      expect(isValidYahooCalendar).toEqual(true);
  	});

  });

  /**
   * Google Calendar
   */
  describe('$scope.calendarUrl.google', function() {

    it('should return the url to add event to a google calendar', function() {
      var $scope = getSampleEvent();

      $controller('AddtocalendarCtrl', { $scope: $scope });

      var regex = getUrlRegex('www.google.com/calendar/render', {
        action: 'TEMPLATE',
        text: '(.*)',
        dates: dateRegex + '\\/' + dateRegex,
        details: '(.*)',
        location: '(.*)'
      });

      var isValidGoogleCalendar = regex.test($scope.calendarUrl.google);

      expect(isValidGoogleCalendar).toEqual(true);
    });

  });

  /**
   * iCalendar
   */
  describe('$scope.calendarUrl.icalendar', function() {

    it('should return the url and data of an icalendar file', function() {
      var $scope = getSampleEvent();

      $controller('AddtocalendarCtrl', { $scope: $scope });

      var regex = getIcsCalendarRegex();

      var isValidICalendar = regex.test($scope.calendarUrl.icalendar);

      expect(isValidICalendar).toEqual(true);
    });

  });

});