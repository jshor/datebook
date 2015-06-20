angular.module('jshor.angular-addtocalendar', [])
	.controller('AddtocalendarCtrl', function($scope) {
		var getIcs = function() {

		};var obj = { first: "John", last: "Doe" };

		$scope.getYahooCalendarUrl = function() {
			var yahooCalendarUrl = 'http://calendar.yahoo.com/?v=60&view=d&type=20';
			yahooCalendarUrl += '&title=' + encodeURI($scope.title);
			yahooCalendarUrl += '&st=' + encodeURI($scope.startDate) + '&et=' + encodeURI($scope.endDate);
			yahooCalendarUrl += '&desc=' + encodeURI($scope.description);
			yahooCalendarUrl += '&in_loc=' + encodeURI($scope.location);
			console.log('yahooCalendarUrl: ', yahooCalendarUrl);
			return yahooCalendarUrl;
		};

		$scope.getGoogleCalendarUrl = function() {
			var googleCalendarUrl = 'https://www.google.com/calendar/render?action=TEMPLATE';
			googleCalendarUrl += '&text=' + encodeURI($scope.title);
			googleCalendarUrl += '&dates=' + encodeURI($scope.startDate) + '/' + encodeURI($scope.endDate);
			googleCalendarUrl += '&details=' + encodeURI($scope.description);
			googleCalendarUrl += '&location=' + encodeURI($scope.location);
			console.log('googleCalendarUrl: ', googleCalendarUrl);
			return googleCalendarUrl;
		};

		$scope.getMicrosoftCalendarUrl = function() {
			var microsoftCalendarUrl = 'http://calendar.live.com/calendar/calendar.aspx?rru=addevent';
			microsoftCalendarUrl += '&summary=' + encodeURI($scope.title);
			microsoftCalendarUrl += '&dtstart=' + encodeURI($scope.startDate) + '&dtend=' + encodeURI($scope.endDate);
			microsoftCalendarUrl += '&description=' + encodeURI($scope.description);
			microsoftCalendarUrl += '&location=' + encodeURI($scope.location);
			console.log('microsoftCalendarUrl: ', microsoftCalendarUrl);
			return microsoftCalendarUrl;
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
        location: '@' 
      },
    	controller: 'AddtocalendarCtrl',
      template: '<div><a href="#" ng-click="getGoogleCalendarUrl()">google calendar</a><br /><a href="#" ng-click="getYahooCalendarUrl()">yahoo calendar</a><br /><a href="#" ng-click="getMicrosoftCalendarUrl()">microsoft calendar</a><br /></div>'
    };
	});