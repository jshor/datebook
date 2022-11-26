import * as FileSaver from 'file-saver'
import ics from '../ics'
import time from '../time'
import { FORMAT, RECURRENCE } from '../../constants'

const {
  FREQUENCY: { DAILY }
} = RECURRENCE

describe('IcsUtil', () => {
  afterEach(() => jest.resetAllMocks())

  describe('formatText()', () => {
    it('should backslash escape newlines', () => {
      const formatted = ics.formatText('foo\nbar\n\nbaz')

      expect(formatted).toBe('foo\\nbar\\n\\nbaz')
    })

    it('should backslash escape special characters', () => {
      const formatted = ics.formatText('foo, bar, baz; qux\\ quux')

      expect(formatted).toBe('foo\\, bar\\, baz\\; qux\\\\ quux')
    })

    it('should return the full string if maxLength is undefined', () => {
      const formatted = ics.formatText('foo\nbar\n\nbaz')

      expect(formatted).toBe('foo\\nbar\\n\\nbaz')
    })
  })

  describe('getBlob()', () => {
    it('should set the MIME type as `application/octet-stream`', () => {
      const icsData = 'foobar'
      const blob: Blob = ics.getBlob(icsData)

      expect(blob.type).toEqual('application/octet-stream')
    })
  })

  describe('getFileName()', () => {
    it('should return event.ics if no title is specified', () => {
      expect(ics.getFileName('')).toBe('event.ics')
    })

    it('should remove all non-alphanumeric except underscore', () => {
      const testTitle = 'abcdef_ABCDEF1234567890-.,/[])(!@*#$^%^'
      const expectedFileName = 'abcdef_ABCDEF1234567890.ics'
      const filename = ics.getFileName(testTitle)

      expect(filename).toBe(expectedFileName)
    })
  })

  describe('getUid()', () => {
    it('should return a base-32 random UID', () => {
      jest
        .spyOn(Math, 'random')
        .mockReturnValue(0.123456)

      expect(ics.getUid()).toBe('4fzyo82mvyq')
    })
  })

  describe('getProdId()', () => {
    it('should return `datebook` in a non-browser context', () => {
      Object.defineProperty(global, 'window', {
        value: undefined,
        writable: true
      })

      expect(ics.getProdId()).toEqual('datebook')
    })

    it('should return the window host in the browser context', () => {
      const host = 'mydomain.com'

      Object.defineProperty(global, 'window', {
        value: {
          location: { host }
        },
        writable: true
      })

      expect(ics.getProdId()).toEqual(host)
    })
  })

  describe('getRrule()', () => {
    it('should transform the object into an ICS param string', () => {
      const recurrence = {
        frequency: DAILY,
        interval: 1,
        count: 5,
        weekstart: 'MO',
        end: new Date('2019-05-02'),
        weekdays: ['MO'],
        monthdays: [5]
      }
      const expectedRrule = [
        `FREQ=${DAILY}`,
        'INTERVAL=1',
        'COUNT=5',
        'WKST=MO',
        'BYDAY=MO',
        'BYMONTHDAY=5',
        `UNTIL=${time.formatDate(recurrence.end, FORMAT.FULL)}`
      ].join(';')

      const actualRrule = ics.getRrule(recurrence)

      expect(actualRrule).toBe(expectedRrule)
    })
  })

  describe.skip('download()', () => {
    beforeEach(() => {
      jest
        .spyOn(FileSaver, 'saveAs')
        .mockImplementation(jest.fn())
    })

    afterEach(() => {
      Object.defineProperty(window, 'navigator', {
        value: {
          userAgent: 'trident'
        },
        writable: true
      })
    })

    it('should invoke FileSaver.saveAs() on iOS Chrome', () => {
      Object.defineProperty(navigator, 'userAgent', {
        value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1',
        writable: true
      })

      ics.download('july 4.ics', 'foobar')

      expect(FileSaver.saveAs).toHaveBeenCalledTimes(1)
    })

    it('should invoke FileSaver.saveAs() on iOS Firefox', () => {
      Object.defineProperty(navigator, 'userAgent', {
        value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/11.0b9935 Mobile/15E216 Safari/605.1.15',
        writable: true
      })

      ics.download('july 4.ics', 'foobar')

      expect(FileSaver.saveAs).toHaveBeenCalledTimes(1)
    })

    it('should invoke FileSaver.saveAs() on non-iOS browsers', () => {
      Object.defineProperty(navigator, 'userAgent', {
        value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.74 Safari/537.36 Edg/79.0.309.43',
        writable: true
      })

      ics.download('july 4.ics', 'foobar')

      expect(FileSaver.saveAs).toHaveBeenCalledTimes(1)
    })
  })
})
