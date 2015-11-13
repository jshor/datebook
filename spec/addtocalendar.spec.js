'use strict';

describe('AddtocalendarCtrl', function() {
  beforeEach(module('jshor.angular-addtocalendar'));

  var $controller;

  // beforeEach(angular.inject(function(_$controller_) {
  //   // The injector unwraps the underscores (_) from around the parameter names when matching
  //   $controller = _$controller_;
  // }));

  function forEach(object, callback) {
  	
  }

  function getUrlRegex(baseUrl, urlParams) {
  	var regex = 'http(s?)\:\/\/' + baseUrl.replace('.', '\.') + '\/\?';
  	var params = [];

		for(var key in object) { 
			params.push(key + '\=' + object[key]);
		}

		regex += params.join('\&');

		return regex;
  }

  describe('$scope.getYahooCalendarUrl', function() {
  	it('should return the url to add event to a yahoo calendar', function() {
  		// var $scope = {};
    //   var controller = angular.$controller('PasswordController', { $scope: $scope });
    //   var yahooUrl = $scope.getYahooCalendarUrl();

      var regex = getUrlRegex('calendar.yahoo.com', {
      	v: 60,
      	view: 'd',
      	type: 20,
      	title: '(.*)',
      	st: '[0-9]+',
      	et: '[0-9]+',
      	desc: '(.*)',
      	in_loc: '(.*)'
      });

    //   console.log('url regex: ', regex);
      expect(true).toEqual(true);

      //expect(isValidYahooCalendar).toEqual(true)

  	});
  });
});