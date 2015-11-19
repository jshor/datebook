/**
 * angular-addtocalendar
 * An AngularJS directive for adding an event to calendar apps. 
 * 
 * Controller and directive.
 */
'use strict';

angular
	.module('jshor.angular-addtocalendar', [])
	.config([
    '$compileProvider',
    function($compileProvider) {   
      $compileProvider.aHrefSanitizationWhitelist(/^\s*(http(s)?|data):/);
    }
	])
	.controller('AddtocalendarCtrl', function($scope) {

		$scope.description = $scope.description || '';

		/**
		 * Renders a .ics file and downloads it to the client browser.
		 * The name of the file will be the event title with alphanumeric chars
		 * having the extension `.ics`.
		 * 
		 * @return {String}  url to download .ics file.
		 */
		function getIcsCalendar() {
			var elements = [
				'BEGIN:VCALENDAR',
				'VERSION:2.0',
				'BEGIN:VEVENT',
				'CLASS:PUBLIC',
				'DESCRIPTION:' + $scope.description,
				'DTSTART;VALUE=DATE:' + $scope.startDate,
				'DTEND;VALUE=DATE:' + $scope.endDate,
				'LOCATION:' + $scope.location,
				'SUMMARY;LANGUAGE=en-us:' + $scope.title,
				'TRANSP:TRANSPARENT',
				'END:VEVENT',
				'END:VCALENDAR'
			];

			// safe filename for iCal (only \w chars) based on event title
			var fileName = $scope.title.replace(/[^\w ]+/g, '') + '.ics';

			return download(encodeURIComponent(elements.join('\n')), fileName, 'application/octet-stream');

		}

		/**
		 * Generates a url to add event to Yahoo! Calendar.
		 * 
		 * @return {String} yahoo cal url
		 */
		function getYahooCalendarUrl() {
			var yahooCalendarUrl = 'http://calendar.yahoo.com/?v=60&view=d&type=20';
			yahooCalendarUrl += '&title=' + encodeURI($scope.title);
			yahooCalendarUrl += '&st=' + encodeURI($scope.startDate) + '&et=' + encodeURI($scope.endDate);
			yahooCalendarUrl += '&desc=' + encodeURI($scope.description);
			yahooCalendarUrl += '&in_loc=' + encodeURI($scope.location);

			return yahooCalendarUrl;
		};

		/**
		 * Generates a url to add event to Google Calendar.
		 * 
		 * @return {String} google cal url
		 */
		function getGoogleCalendarUrl() {
			var googleCalendarUrl = 'https://www.google.com/calendar/render?action=TEMPLATE';
			googleCalendarUrl += '&text=' + encodeURI($scope.title);
			googleCalendarUrl += '&dates=' + encodeURI($scope.startDate) + '/' + encodeURI($scope.endDate);
			googleCalendarUrl += '&details=' + encodeURI($scope.description);
			googleCalendarUrl += '&location=' + encodeURI($scope.location);

			return googleCalendarUrl;
		};

		/**
		 * Generates a url to add event to Microsoft Calendar.
		 * 
		 * @return {String} microsoft cal url
		 */
		function getMicrosoftCalendarUrl() {
			var microsoftCalendarUrl = 'http://calendar.live.com/calendar/calendar.aspx?rru=addevent';
			microsoftCalendarUrl += '&summary=' + encodeURI($scope.title);
			microsoftCalendarUrl += '&dtstart=' + encodeURI($scope.startDate) + '&dtend=' + encodeURI($scope.endDate);
			microsoftCalendarUrl += '&description=' + encodeURI($scope.description);
			microsoftCalendarUrl += '&location=' + encodeURI($scope.location);

			return microsoftCalendarUrl;
		};

		$scope.calendarUrl = {
			microsoft : getMicrosoftCalendarUrl(),
			google 		: getGoogleCalendarUrl(),
			yahoo 		: getYahooCalendarUrl(),
			icalendar : getIcsCalendar()
		};
	})
	.directive('addtocalendar', function() {
    return {

      restrict: 'E',
      scope: {
        startDate: '@',
        endDate: '@',
        title: '@',
        description: '@',
        location: '@',
        className: '@',
        btnText: '@'
      },
    	controller: 'AddtocalendarCtrl',
      template: '\
      <div class="btn-group" dropdown on-toggle="toggled(open)">\
	      <span\
	      	ng-class="className || \'btn btn-sm btn-default dropdown-toggle\'"\
	      	dropdown-toggle>\
	      	{{btnText || \'Add to calendar\'}} <span class="caret"></span>\
	      </span>\
	      <ul class="dropdown-menu">\
		      <li><a ng-click="icalendar()">iCalendar</a></li>\
		      <li><a href="{{calendarUrl.google}}" target="_blank">Google Calendar</a></li>\
		      <li><a ng-click="icalendar()">Outlook</a></li>\
		      <li><a href="{{calendarUrl.yahoo}}" target="_blank">Yahoo! Calendar</a></li>\
		      <li><a href="{{calendarUrl.microsoft}}" target="_blank">Microsoft Calendar</a></li>\
	      </ul>\
      </div>'
		};
	});
