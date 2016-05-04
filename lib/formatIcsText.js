/**
 * angular-addtocalendar
 * An AngularJS directive for adding an event to calendar apps.
 *
 * Controller and directive.
 */
'use strict';

var formatIcsText = (function(s, maxLength) {
  function _wrap(s) {
    if (s.length <= maxLength) {
      return s;
    }
    return s.substring(0, maxLength).replace(/\n/g, '\\n') + "\r\n " + _wrap(s.substring(maxLength), 75);
  }
  return _wrap(s.replace(/\n/g, '\\n'), maxLength);
});