angular.module('jshor.angular-addtocalendar', []).
	directive('ngAddtocalendar', function () {
    return {
      restrict: 'E',
      scope: {
        eventDate: '@'
      },
      template: '<div>Date: {{eventDate}}</div>'
    };
});