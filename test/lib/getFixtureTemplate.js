/**
 * angular-addtocalendar
 * An AngularJS directive for adding an event to calendar apps. 
 * 
 * Returns the angular html for the given addtocalendar fixture.
 */
'use strict';

function getFixtureTemplate(fixture, fixtureTag) {
  var el = [fixtureTag];
  forEachAttr(fixture, function(key, value) {
    var attr = key;
    if(value && value !== '') {
      attr += '="' + value + '"';
    }
    el.push(attr);
  });
  return '<' + el.join(' ') + '></' + fixtureTag + '>';
}