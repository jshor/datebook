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
  ]);