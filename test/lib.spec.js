/**
 * angular-addtocalendar
 * An AngularJS directive for adding an event to calendar apps. 
 * 
 * Library functions test suite.
 */
'use strict';

describe('library functions', function() {
  describe('forEachAttr', function() {

    it('should loop through all non-angular attrs and exec function', function() {

      var sample = {
        '$scope': {},
        'foo': 'bar'
      };

      forEachAttr(sample, function(key) {
        expect(key.indexOf('$')).toEqual(-1);
        expect(key).toEqual('foo');
        expect(sample[key]).toEqual('bar');
      });

    });
  });

  describe('formatIcsText', function() {

    var n = 10;
    var longTitle = "Lorem ipsum dolor sit amet\
      line break here";
    var shortTitle = "Lorem";

    var formattedLongText = formatIcsText(longTitle, n);
    var formattedShortText = formatIcsText(shortTitle, n);

    it('should not return text longer than 75 chars', function() {
      expect(formattedLongText.length <= 75).toBeTruthy();
    });

    it('should return itself if strlen less than n', function() {
      expect(formattedShortText.length).toEqual(shortTitle.length);
      expect(formattedShortText).toEqual(shortTitle);
    });
  });

  // describe('formatTime', function() {

  //   var sampleTimestamp = '07/04/2017 08:00:00';

  //   it('should return a universal timestamp format', function() {
  //     var dateRegex = CalendarRegex.dateRegex;
  //     var dateTime = formatTime(dateTime);
  //     var isValid = new RegExp(dateRegex, 'g').test(sampleTimestamp);

  //     expect(isValid).toEqual(true);
  //   });
  // });
});



















