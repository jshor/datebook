import { formatText, getBlob, getFileName, getUid, getRrule, safariFileSave, download } from '../ics'
import { formatTime } from '../time'

describe('IcsUtil', () => {
  describe('formatText()', () => {
    const str = 'foo\nbar\n\nbaz'
    it('should return an empty string if it is falsey', () => {
      expect(formatText()).toBe('')
      expect(formatText(false)).toBe('')
      expect(formatText(null)).toBe('')
      expect(formatText(undefined)).toBe('')
      expect(formatText('')).toBe('')
      expect(formatText(0)).toBe('')
    })
    it('should backslash escape newlines', () => {
      const formatted = formatText(str)

      expect(formatted).toBe('foo\\nbar\\n\\nbaz')
    })
    it('should return the full string if maxLength is undefined', () => {
      const formatted = formatText(str)

      expect(formatted).toBe('foo\\nbar\\n\\nbaz')
    })
    it('should truncate the string after backslash escaping newlines', () => {
      const formatted = formatText(str, 10)

      expect(formatted).toBe('foo\\nbar\\n')
    })
  })

  describe('getBlob()', () => {
  })

  describe('getFileName()', () => {
    it('should return event.ics if no title', () => {
      expect(getFileName()).toBe('event.ics')
      expect(getFileName(false)).toBe('event.ics')
      expect(getFileName(null)).toBe('event.ics')
      expect(getFileName(undefined)).toBe('event.ics')
      expect(getFileName('')).toBe('event.ics')
      expect(getFileName(0)).toBe('event.ics')
    })

    it('should remove all non-alphanumeric except underscore', () => {
      const testTitle = 'abcdef_ABCDEF1234567890-.,/[]\)(!@*#$^%^'
      const expectedFileName = 'abcdef_ABCDEF1234567890.ics'
      const filename = getFileName(testTitle)

      expect(filename).toBe(expectedFileName)
    })
  })

  describe('getUid()', () => {
  })
  describe('getRrule()', () => {
  })
  describe('safariFileSave()', () => {
  })
  describe('download()', () => {
  })
})
