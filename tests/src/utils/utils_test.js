import Utils from '../../../src/utils/utils';
import CalendarRegex from '../../helpers/regex';
import { longText, shortText } from './fixtures/text.fixture';

describe('Utility functions', function() {

  describe('forEachAttr', function() {

    it('should loop through all non-angular attrs and exec function', function() {

      var sample = {
        '$scope': {},
        'foo': 'bar'
      };

      Utils.forEachAttr(sample, key => {
        expect(key.indexOf('$')).toEqual(-1);
        expect(key).toEqual('foo');
        expect(sample[key]).toEqual('bar');
      });

    });
  });

  describe('formatIcsText', () => {

    it('should return a blank string if string is undefined', () => {
      let result = Utils.formatIcsText(undefined, 5);

      expect(typeof result).toBe('string');
      expect(result).toEqual('');
    });

    it('should return a blank string if string is null', () => {
      let result = Utils.formatIcsText(null, 5);

      expect(typeof result).toBe('string');
      expect(result).toEqual('');
    });

    it('should truncate remaining text if string longer than 75 chars', () => {
      let result = Utils.formatIcsText(longText, 75);

      expect(typeof result).toBe('string');
      expect(result.length).toBeLessThanOrEqual(75);
    });

    it('should not return the same string if invalid chars exist', () => {
      let result = Utils.formatIcsText(shortText, 75);

      expect(typeof result).toBe('string');
      expect(result.length).not.toEqual(shortText.length);
      expect(result).not.toEqual(shortText);
    });
    
  });

  describe('formatTime', function() {

    // var sampleTimestamp = '07/04/2017 08:00:00';

    // it('should return a universal timestamp format', () => {
    //   let dateTime = 'mm/dd/yyyy hh:mm:ss';
    //   let dateRegex = CalendarRegex.dateRegex;
    //   let dateTime = Utils.formatTime(format);
    //   let isValid = new RegExp(dateRegex, 'g').test(sampleTimestamp);

    //   expect(result).to.be.a.string;
    //   expect(result).to.not.be.null;
    //   expect(isValid).toEqual(true);
    // });

  });

});
