/**
 * angular-addtocalendar
 * An AngularJS directive for adding an event to calendar apps.
 *
 * controller
 */
'use strict';

addtocalendar
  .controller('AddtocalendarCtrl', ['$scope', '$attrs', 'FileSaver',
    function ($scope, $attrs, FileSaver) {

      var dates = {};

      $scope.description = $scope.description || '';

      function setTimesFromFormat() {
        var format = $scope.format;
        var timezone = $scope.timezone;

        ['startDate', 'endDate']
          .forEach(function(t) {
            dates[t] = formatTime($scope[t], format, timezone);
          });
      }

      function getSanitizedData() {
        var urlData = {};
        forEachAttr($scope, function(key) {
          urlData[key] = encodeURIComponent($scope[key]);
        });
        return urlData;
      }

      function buildUrl() {
        var urlData = angular.extend(getSanitizedData(), dates);

        $scope.calendarUrl = {
          microsoft: getMicrosoftCalendarUrl(urlData),
          google: getGoogleCalendarUrl(urlData),
          yahoo: getYahooCalendarUrl(urlData),
          icalendar: getIcsCalendar($scope),
          dlIcal: dlIcal
        };
      }

      function dlIcal() {
        var fileName = getIcsFileName($scope.title);
        var icsData = $scope.calendarUrl.icalendar;
        var icsBlob = getIcsBlob(icsData);
        FileSaver.saveAs(icsBlob, fileName);
      }

      function init() {
        buildUrl();
        setTimesFromFormat();
      }

      $attrs.btnText = ($attrs.btnText == undefined) ? 'Add to calendar' : $attrs.btnText;
      forEachAttr($attrs, function(key) {
        $attrs.$observe(key, init);
      });
      init();
    }
  ]);