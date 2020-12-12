import { RECURRENCE } from '../../constants'
import yahoo from '../yahoo'

const { FREQUENCY } = RECURRENCE

describe('Yahoo Calendar utils', () => {
  describe('getWeekdays()', () => {
    it('should return a string of all weekdays joined', () => {
      const result = yahoo.getWeekdays(['SU', 'MO'])

      expect(result).toEqual('SuMo')
    })

    it('should strip out any non-alphanumeric chars', () => {
      const result = yahoo.getWeekdays(['3SU', '-2MO'])

      expect(result).toEqual('SuMo')
    })
  })

  describe('getFrequency()', () => {
    it('should return `Yr` for yearly recurrences', () => {
      expect(yahoo.getFrequency(FREQUENCY.YEARLY)).toEqual('Yr')
    })

    it('should return `Mh` for monthly recurrences', () => {
      expect(yahoo.getFrequency(FREQUENCY.MONTHLY)).toEqual('Mh')
    })

    it('should return `Wk` for monthly recurrences', () => {
      expect(yahoo.getFrequency(FREQUENCY.WEEKLY)).toEqual('Wk')
    })

    it('should default to daily recurrences', () => {
      expect(yahoo.getFrequency(FREQUENCY.DAILY)).toEqual('Dy')
    })
  })

  describe('getRecurrence()', () => {
    it('should prepend single digit interval with 0', () => {
      const recurrence = {
        interval: 3,
        frequency: FREQUENCY.DAILY
      }

      const result = yahoo.getRecurrence(recurrence)
      expect(result).toBe('03Dy')
    })

    it('should return yahoo calendar rpat rule', () => {
      const recurrence = {
        interval: 10,
        frequency: FREQUENCY.DAILY
      }

      const result = yahoo.getRecurrence(recurrence)
      expect(result).toBe('10Dy')
    })

    it('should append the weekdays, prefixed with `1`, to the recurrence', () => {
      const recurrence = {
        interval: 10,
        frequency: FREQUENCY.MONTHLY,
        weekdays: ['SU', 'MO']
      }

      const result = yahoo.getRecurrence(recurrence)
      expect(result).toBe('10Mh1SuMo')
    })

    it('should return the weekdays with the first weekdays\' count for monthly recurrences', () => {
      const recurrence = {
        interval: 10,
        frequency: FREQUENCY.MONTHLY,
        weekdays: ['2SU', '3MO']
      }

      const result = yahoo.getRecurrence(recurrence)
      expect(result).toBe('10Mh2SuMo')
    })

    it('should return the weekdays\' counts for weekly recurrences', () => {
      const recurrence = {
        interval: 10,
        frequency: FREQUENCY.WEEKLY,
        weekdays: ['2SU', '3MO']
      }

      const result = yahoo.getRecurrence(recurrence)
      expect(result).toBe('10WkSuMo')
    })

    it('should fall back to days if no frequency is specified', () => {
      const recurrence = {
        interval: 3
      }

      const result = yahoo.getRecurrence(recurrence)

      expect(result).toBe('03Dy')
    })

    it('should fall back to one day if no interval is specified', () => {
      const recurrence = {
        frequency: FREQUENCY.DAILY
      }

      const result = yahoo.getRecurrence(recurrence)

      expect(result).toBe('01Dy')
    })
  })
})
