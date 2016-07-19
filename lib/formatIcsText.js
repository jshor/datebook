/**
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
};