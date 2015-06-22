var app = angular.module('myApp', ['jshor.angular-addtocalendar', 'ui.bootstrap']);
app.controller('myCtrl', function($scope) {
	$scope.test = 'Hello, world!';
});
