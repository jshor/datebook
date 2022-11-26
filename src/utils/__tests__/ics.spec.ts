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
})
