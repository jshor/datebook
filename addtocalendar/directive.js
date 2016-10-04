/**
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
      <div class="btn-group dropdown" ' + prefix + ' on-toggle="toggled(open)">\
        <span\
          ng-class="className || \'btn btn-sm btn-default ' + prefix + '-toggle\'"\
          ' + prefix + '-toggle>\
          {{btnText}} <span class="caret"></span>\
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
        btnText: '@'
      },
      controller: 'AddtocalendarCtrl',
      template: resolveTemplate
    };

  });