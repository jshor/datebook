/**
 * angular-addtocalendar
 * An AngularJS directive for adding an event to calendar apps.
 *
 * controller
 */
'use strict';

addtocalendar
  .controller('AddtocalendarCtrl', ['$scope', '$attrs',
    function ($scope, $attrs) {

      var dates = {};

      $scope.description = $scope.description || '';

      /**
       * Returns file contents for a .ics file.
       * @return {String}  ics calendar data
       */
      function getIcsCalendar() {
        return [
          'BEGIN:VCALENDAR',
          'VERSION:2.0',
          'BEGIN:VEVENT',
          'CLASS:PUBLIC',
          'DESCRIPTION:' + formatIcsText($scope.description, 62),
          'DTSTART:' + dates.startDate,
          'DTEND:' + dates.endDate,
          'LOCATION:' + formatIcsText($scope.location, 64),
          'SUMMARY:' + formatIcsText($scope.title, 66),
          'TRANSP:TRANSPARENT',
          'END:VEVENT',
          'END:VCALENDAR'
        ].join('\n');
      }

      function setTimesFromFormat() {
        var format = $scope.format;
        var timezone = $scope.timezone;

        ['startDate', 'endDate']
          .forEach(function(t) {
            dates[t] = formatTime($scope[t], format, timezone);
          });
      }

      function getYahooCalendarUrl() {
        var yahooCalendarUrl = 'http://calendar.yahoo.com/?v=60&view=d&type=20';
        var duration = getHoursDuration($scope.startDate, $scope.endDate);

        yahooCalendarUrl += '&TITLE=' + encodeURIComponent($scope.title);
        yahooCalendarUrl += '&ST=' + encodeURIComponent(dates.startDate) + '&DUR=' + encodeURIComponent(duration);
        yahooCalendarUrl += '&DESC=' + encodeURIComponent($scope.description);
        yahooCalendarUrl += '&in_loc=' + encodeURIComponent($scope.location);

        return yahooCalendarUrl;
      }

      function getGoogleCalendarUrl() {
        var googleCalendarUrl = 'https://www.google.com/calendar/render?action=TEMPLATE';
        googleCalendarUrl += '&text=' + encodeURIComponent($scope.title);
        googleCalendarUrl += '&dates=' + encodeURIComponent(dates.startDate) + '/' + encodeURIComponent(dates.endDate);
        googleCalendarUrl += '&details=' + encodeURIComponent($scope.description);
        googleCalendarUrl += '&location=' + encodeURIComponent($scope.location);

        return googleCalendarUrl;
      }

      function getMicrosoftCalendarUrl() {
        var microsoftCalendarUrl = 'http://calendar.live.com/calendar/calendar.aspx?rru=addevent';
        microsoftCalendarUrl += '&summary=' + encodeURIComponent($scope.title);
        microsoftCalendarUrl += '&dtstart=' + encodeURIComponent(dates.startDate) + '&dtend=' + encodeURIComponent(dates.endDate);
        microsoftCalendarUrl += '&description=' + encodeURIComponent($scope.description);
        microsoftCalendarUrl += '&location=' + encodeURIComponent($scope.location);

        return microsoftCalendarUrl;
      }

      function buildUrl() {
        setTimesFromFormat();
        $scope.calendarUrl = {
          microsoft: getMicrosoftCalendarUrl(),
          google: getGoogleCalendarUrl(),
          yahoo: getYahooCalendarUrl(),
          icalendar: getIcsCalendar(),
          dlIcal: dlIcal
        };
      }

      /**
       * Downloads a .ics file for the given parameters.
       * The name of the file will be the event title with alphanumeric chars
       * having the extension `.ics`.
       */
      function dlIcal() {
        var fileName = $scope.title.replace(/[^\w ]+/g, '') + '.ics';
        download(getIcsCalendar(), fileName, 'application/octet-stream');
      }

      // observe user-specified attributes
      forEachAttr($attrs, function(key) {
        $attrs.$observe(key, function() {
          buildUrl();
        });
      });
      buildUrl();
    }
  ]);