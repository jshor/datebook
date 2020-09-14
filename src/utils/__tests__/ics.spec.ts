import * as FileSaver from 'file-saver'
import ics from '../ics'
import safariFileSave from '../safariFileSave'
import { formatTimestampString } from '../time'
import { RECURRENCE } from '../../constants'

jest.mock('../safariFileSave')

const {
  FREQUENCY: { DAILY }
} = RECURRENCE

describe('IcsUtil', () => {
  afterEach(() => jest.resetAllMocks())

  describe('formatText()', () => {
    const str = 'foo\nbar\n\nbaz'

    it('should backslash escape newlines', () => {
      const formatted = ics.formatText(str)

      expect(formatted).toBe('foo\\nbar\\n\\nbaz')
    })

    it('should return the full string if maxLength is undefined', () => {
      const formatted = ics.formatText(str)

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
      const testTitle = 'abcdef_ABCDEF1234567890-.,/[]\)(!@*#$^%^'
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
        end: '2019-05-02',
        weekdays: 'MO',
        monthdays: '5',
      }
      const expectedRrule = [
        `FREQ=${DAILY}`,
        'INTERVAL=1',
        'COUNT=5',
        'WKST=MO',
        'BYDAY=MO',
        'BYMONTHDAY=5',
        `UNTIL=${formatTimestampString(recurrence.end, 'YYYYMMDDThhmmss')}`
      ].join(';')

      const actualRrule = ics.getRrule(recurrence)

      expect(actualRrule).toBe(expectedRrule)
    })
  })

  describe('download()', () => {
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

    describe('on non-Safari browsers', () => {
      it('should invoke FileSaver.saveAs()', () => {
        ics.download('july 4.ics', 'foobar')

        expect(FileSaver.saveAs).toHaveBeenCalledTimes(1)
        expect(safariFileSave).not.toHaveBeenCalled()
      })
    })

    describe('on Safari', () => {
      it('should invoke safariFileSave()', () => {
        Object.defineProperty(window, 'safari', {
          value: {
            window: true
          },
          writable: true
        })

        ics.download('july 4.ics', 'foobar')

        expect(FileSaver.saveAs).not.toHaveBeenCalled()
        expect(safariFileSave).toHaveBeenCalledTimes(1)
      })
    })
  })
})
