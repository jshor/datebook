'use strict';

angular
	.module('jshor.angular-addtocalendar', [])
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
      template: '<div class="btn-group" dropdown on-toggle="toggled(open)">iCal url: {{calendarUrl.icalendar}}<br /><span ng-class="className || \'btn btn-sm btn-default dropdown-toggle\'" dropdown-toggle>{{btnText || \'Add to calendar\'}} <span class="caret"></span></span><ul class="dropdown-menu"><li><a href="{{calendarUrl.icalendar}}" download="{{filenameSafe}}.ics">iCalendar</a></li><li><a href="{{calendarUrl.google}}" target="_blank">Google Calendar</a></li><li><a href="{{calendarUrl.icalendar}}"">Outlook</a></li><li><a href="{{calendarUrl.yahoo}}" target="_blank">Yahoo! Calendar</a></li><li><a href="{{calendarUrl.microsoft}}" target="_blank">Microsoft Calendar</a></li></ul></div>'
		};
	});