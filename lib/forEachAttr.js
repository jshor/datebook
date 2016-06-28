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
};