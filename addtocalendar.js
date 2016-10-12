/**
 * angular-addtocalendar
 * An AngularJS directive for adding an event to calendar apps. 
 * 
 * Loop through attributes, excluding ones starting with `$`.
 */
var forEachAttr = function(attrs, cb) {
  for(key in attrs) {
    if(attrs.hasOwnProperty(key) && key.indexOf('$') === -1) {
      cb(key, attrs[key]);
    }
  }
};/**
 * angular-addtocalendar
 * An AngularJS directive for adding an event to calendar apps.
 *
 * .ics file format: string escape function
 *
 * Removes line breaks and ensures that the string is no
 * longer than maxLength chars (or 75 chars if none specified).
 */
var formatIcsText = function(s, maxLength) {
  function _wrap(s) {
    if (s.length <= maxLength) {
      return s;
    }
    return s.substring(0, maxLength).replace(/\n/g, '\\n') + "\r\n " + _wrap(s.substring(maxLength), 75);
  }
  return _wrap(s.replace(/\n/g, '\\n'), maxLength);
};function formatTime(timestamp, inputFormat) {
  var formats = ['YYYYMMDD', 'HHmmss'];

  var date = (function() {
    if(inputFormat) {
      return new moment(timestamp, inputFormat);
    }
    return new moment(timestamp);
  })();

  return formats.map(function(format) {
    return date.format(format);
  }).join('T');
}function getMilitaryHours(hours) {
  if(hours < 10) {
    hours = '0' + hours;
  }
  return hours + '00';
}

function getHoursDuration(startDate, endDate, timezone) {
  var start = new moment(startDate);
  var end = new moment(endDate);

  if(timezone) {
    start.utcOffset(timezone);
    end.utcOffset(timezone);
  }

  var hours = moment
    .duration(end.diff(start))
    .asHours();

  return getMilitaryHours(hours);
}/**
 * The name of the file will be the event title with alphanumeric chars
 * having the extension `.ics`.
 */
function getIcsBlob(icsData) {
  return new Blob([icsData], {
    type: 'application/octet-stream'
  });
}function getIcsFileName(title) {
  return title.replace(/[^\w ]+/g, '') + '.ics';
}function getGoogleCalendarUrl(data) {
  var googleCalendarUrl = 'https://www.google.com/calendar/render?action=TEMPLATE';
  googleCalendarUrl += '&text=' + data.title;
  googleCalendarUrl += '&dates=' + data.startDate + '/' + data.endDate;
  googleCalendarUrl += '&details=' + data.description;
  googleCalendarUrl += '&location=' + data.location;

  return googleCalendarUrl;
}/**
 * Returns file contents for a .ics file.
 * @return {String}  ics calendar data
 */
function getIcsCalendar(data) {
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    'CLASS:PUBLIC',
    'DESCRIPTION:' + formatIcsText(data.description, 62),
    'DTSTART:' + data.startDate,
    'DTEND:' + data.endDate,
    'LOCATION:' + formatIcsText(data.location, 64),
    'SUMMARY:' + formatIcsText(data.title, 66),
    'TRANSP:TRANSPARENT',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\n');
}function getMicrosoftCalendarUrl(data) {
  var microsoftCalendarUrl = 'http://calendar.live.com/calendar/calendar.aspx?rru=addevent';
  microsoftCalendarUrl += '&summary=' + data.title;
  microsoftCalendarUrl += '&dtstart=' + data.startDate + '&dtend=' + data.endDate;
  microsoftCalendarUrl += '&description=' + data.description;
  microsoftCalendarUrl += '&location=' + data.location;

  return microsoftCalendarUrl;
}function getYahooCalendarUrl(data) {
  var yahooCalendarUrl = 'http://calendar.yahoo.com/?v=60&view=d&type=20';
  var duration = getHoursDuration(data.startDate, data.endDate);

  yahooCalendarUrl += '&TITLE=' + data.title;
  yahooCalendarUrl += '&ST=' + data.startDate + '&DUR=' + duration;
  yahooCalendarUrl += '&DESC=' + data.description;
  yahooCalendarUrl += '&in_loc=' + data.location;

  return yahooCalendarUrl;
}/**
 * angular-addtocalendar
 * An AngularJS directive for adding an event to calendar apps.
 *
 * module
 */
'use strict';

var addtocalendar = angular
  .module('jshor.angular-addtocalendar', ['ngFileSaver']);
/**
 * angular-addtocalendar
 * An AngularJS directive for adding an event to calendar apps.
 */
'use strict';

addtocalendar
  .config([
    '$compileProvider',
    function ($compileProvider) {
      $compileProvider.aHrefSanitizationWhitelist(/^\s*(http(s)?|data):/);
    }
  ]);/**
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
        var urlData = angular.extend(getSanitizedData(), dates),
            icsData = angular.extend({}, $scope, dates);

        $scope.calendarUrl = {
          microsoft: getMicrosoftCalendarUrl(urlData),
          google: getGoogleCalendarUrl(urlData),
          yahoo: getYahooCalendarUrl(urlData),
          icalendar: getIcsCalendar(icsData),
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
        setTimesFromFormat();
        buildUrl();
      }

      forEachAttr($attrs, function(key) {
        $attrs.$observe(key, init);
      });
      init();
    }
  ]);/**
 * angular-addtocalendar
 * An AngularJS directive for adding an event to calendar apps.
 *
 * directive
 */
'use strict';

addtocalendar
  .directive('addtocalendar', function () {

    function getTemplate(prefix) {
      return '\
      <div class="btn-group dropdown" ' + prefix + ' on-toggle="toggled(open)" \
        title="{{(hoverText == undefined) ? title : hoverText}}">\
        <span\
          ng-class="className || \'btn btn-sm btn-default ' + prefix + '-toggle\'"\
          ' + prefix + '-toggle>\
          {{(btnText == undefined) ? \'Add to calendar\' : btnText}}\
          <span ng-if="caret != \'false\'" class="caret"></span>\
        </span>\
        <ul class="dropdown-menu">\
          <li><a ng-click="calendarUrl.dlIcal()" ng-if="calendarUrl.dlIcal">iCalendar</a></li>\
          <li><a href="{{calendarUrl.google}}" target="_blank">Google Calendar</a></li>\
          <li><a ng-click="calendarUrl.dlIcal()" ng-if="calendarUrl.dlIcal">Outlook</a></li>\
          <li><a href="{{calendarUrl.yahoo}}" target="_blank">Yahoo! Calendar</a></li>\
          <li><a href="{{calendarUrl.microsoft}}" target="_blank">Microsoft Calendar</a></li>\
        </ul>\
      </div>';
    }

    function resolveTemplate(tElement, tAttrs) {
      if(tAttrs.$attr && tAttrs.$attr['uibDropdown']) {
        return getTemplate('uib-dropdown');
      }
      return getTemplate('dropdown');
    }

    return {
      restrict: 'E',
      scope: {
        startDate: '@',
        endDate: '@',
        title: '@',
        description: '@',
        location: '@',
        className: '@',
        btnText: '@',
        caret: '@',
        hoverText: '@',
        format: '@'
      },
      controller: 'AddtocalendarCtrl',
      template: resolveTemplate
    };

  });