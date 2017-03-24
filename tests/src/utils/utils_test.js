import Utils from '../../../src/utils/utils';
import CalendarRegex from '../../helpers/regex';
import { longText, shortText } from '../../fixtures/text.fixture';

let expect = chai.expect;

describe('Utility functions', function() {

  describe('formatIcsText', () => {

    it('should return a blank string if string is undefined', () => {
      let result = Utils.formatIcsText(undefined, 5);

      expect(result).to.be.a.string;
      expect(result).to.be.empty;
    });

    it('should return a blank string if string is null', () => {
      let result = Utils.formatIcsText(null, 5);

      expect(result).to.be.a.string;
      expect(result).to.be.empty;
    });

    it('should truncate remaining text if string longer than 75 chars', () => {
      let result = Utils.formatIcsText(longText, 75);

      expect(result).to.be.a.string;
      expect(result).not.to.have.length.above(75);
    });

    it('should not return the same string if invalid chars exist', () => {
      let result = Utils.formatIcsText(shortText, 75);

      expect(result).to.be.a.string;
      expect(result).not.to.equal(shortText.length);
      expect(result).not.to.equal(shortText);
    });
    
  });

  describe('getIcsFileName', () => {

    it('should return a default name if title not defined', () => {
      let result = Utils.getIcsFileName();

      expect(result).to.be.a.string;
      expect(result).to.not.be.empty;
      expect(result).to.equal('event.ics');
    });

    it('should strip non-alphanumeric chars and end with .ics', () => {
      let result = Utils.getIcsFileName('some##*$# invalid filename');

      expect(result).to.be.a.string;
      expect(result).to.not.be.empty;
      expect(result).to.match(/^[\w ]+\.ics$/);
      expect(result).to.contain('some invalid filename');
    });

  });

  describe('getUid', () => {

    it('should return a string of only numbers and letters', () => {
      let result = Utils.getUid();

      expect(result).to.be.a.string;
      expect(result).to.match(/^[A-z0-9]+$/);
    });

  });

  describe('getTimeCreated', () => {

    it('should call momentjs with YYYYMMDDTHHmmss format', () => {

      let result = Utils.getTimeCreated();

      expect(result).to.be.a.string;
      expect(result).to.match(new RegExp(CalendarRegex.dateRegex));
    });
  });

});
