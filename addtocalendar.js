'use strict';

angular.module('jshor.angular-addtocalendar', [])
	.controller('AddtocalendarCtrl', function($scope) {
		var cal = ics();

		var utcToDate = function(date) {
			var dateObj = new Date();
			dateObj.setFullYear(date.substring(0, 4));
			dateObj.setDate(date.substring(6, 8));
			dateObj.setMonth(parseInt(date.substring(4, 6))-1);
			dateObj.setUTCHours(date.substring(9, 11));
			dateObj.setUTCMinutes(date.substring(11, 13));
			dateObj.setUTCSeconds(date.substring(13, 15));
			return dateObj.toString();
		};

		$scope.description = $scope.description || '';
		$scope.getIcsCalendarUrl = function() {
			cal.addEvent($scope.title, $scope.description, $scope.location, utcToDate($scope.startDate), utcToDate($scope.endDate));
			return cal.download();
		};

		var getYahooCalendarUrl = function() {
			var yahooCalendarUrl = 'http://calendar.yahoo.com/?v=60&view=d&type=20';
			yahooCalendarUrl += '&title=' + encodeURI($scope.title);
			yahooCalendarUrl += '&st=' + encodeURI($scope.startDate) + '&et=' + encodeURI($scope.endDate);
			yahooCalendarUrl += '&desc=' + encodeURI($scope.description);
			yahooCalendarUrl += '&in_loc=' + encodeURI($scope.location);

			return yahooCalendarUrl;
		};

		var getGoogleCalendarUrl = function() {
			var googleCalendarUrl = 'https://www.google.com/calendar/render?action=TEMPLATE';
			googleCalendarUrl += '&text=' + encodeURI($scope.title);
			googleCalendarUrl += '&dates=' + encodeURI($scope.startDate) + '/' + encodeURI($scope.endDate);
			googleCalendarUrl += '&details=' + encodeURI($scope.description);
			googleCalendarUrl += '&location=' + encodeURI($scope.location);

			return googleCalendarUrl;
		};

		var getMicrosoftCalendarUrl = function() {
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
			yahoo 		: getYahooCalendarUrl()
		};
	})
	.directive('addtocalendar', function() {
    return {
      restrict: 'E',
      scope: {
        startDate 	: '@',
        endDate 		: '@',
        title 			: '@',
        description : '@',
        location 		: '@',
        className 	: '@'
      },
    	controller: 'AddtocalendarCtrl',
      template: '\
				<div class="btn-group" dropdown on-toggle="toggled(open)">\
					<span ng-class="className || \'btn btn-sm btn-default dropdown-toggle\'" dropdown-toggle>\
					Add to Calendar <span class="caret"></span>\
					</span>\
				  <ul class="dropdown-menu">\
				    <li><a href="#" ng-click="getIcsCalendarUrl()">iCalendar</a></li>\
				    <li><a href="{{calendarUrl.google}}" target="_blank">Google Calendar</a></li>\
				    <li><a href="#" ng-click="getIcsCalendarUrl()">Outlook</a></li>\
				    <li><a href="{{calendarUrl.yahoo}}" target="_blank">Yahoo! Calendar</a></li>\
				    <li><a href="{{calendarUrl.microsoft}}" target="_blank">Microsoft Calendar</a></li>\
				  </ul>\
				</div>\
			'
		};
	});
