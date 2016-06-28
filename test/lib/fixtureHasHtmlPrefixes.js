/**
 * angular-addtocalendar
 * An AngularJS directive for adding an event to calendar apps. 
 * 
 * Checks the parent (menu) container and child span (dropdown-toggle)
 * to ensure that they exist in the compiled html and that the given
 * prefix is set.
 */
'use strict';

function fixtureHasHtmlPrefixes(compiled, prefix) {
  var menu = compiled.children();
  var toggle = menu.children();

  var menuAttr = menu.attr(prefix + 'dropdown');
  var toggleAttr = toggle.attr(prefix + 'dropdown-toggle');
  
  function isUndef(v) {
    return typeof v === 'undefined';
  }

  if(isUndef(menuAttr) || isUndef(toggleAttr)) {
    return false;
  }
  return true;
}