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
