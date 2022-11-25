import { FORMAT, RECURRENCE } from '../../constants'
import time from '../time'

describe('time utils', () => {
  describe('getTimeCreated()', () => {
    beforeEach(() => {
      jest.useFakeTimers()
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    it('should get the current time in date time format', () => {
      expect(time.getTimeCreated()).toBe(time.formatDate(new Date(), FORMAT.FULL))
    })
  })


  describe('getRecurrenceLengthDays()', () => {
    const { FREQUENCY } = RECURRENCE

    describe('when the interval is specified in a recurrence', () => {
      const interval = 10

      it('should return (interval * 365.25) days for a yearly recurrence', () => {
        expect(time.getRecurrenceLengthDays({
          frequency: FREQUENCY.YEARLY,
          interval
        })).toEqual(365.25 * interval)
      })

      it('should return (interval * 30.42) days for a monthly recurrence', () => {
        expect(time.getRecurrenceLengthDays({
          frequency: FREQUENCY.MONTHLY,
          interval
        })).toEqual(30.42 * interval)
      })

      it('should return (interval * 7) days for a weekly recurrence', () => {
        expect(time.getRecurrenceLengthDays({
          frequency: FREQUENCY.WEEKLY,
          interval
        })).toEqual(7 * interval)
      })

      it('should return the interval itself as the number of days if no frequency is specified', () => {
        expect(time.getRecurrenceLengthDays({ interval })).toEqual(interval)
      })
    })

    it('should return the number of days in 100 years', () => {
      expect(time.getRecurrenceLengthDays({})).toEqual(36525)
    })
  })

  describe('getDuration()', () => {
    it('should get the duration between two datetimes', () => {
      const start = new Date('2019-03-23T17:00:00.000')
      const end = new Date('2019-03-23T20:23:00.000')
      const expectedDiff = '0323'
      const actualDiff = time.getDuration(start.getTime(), end.getTime())

      expect(actualDiff).toBe(expectedDiff)
    })
  })

  describe('getHoursDiff()', () => {
    it('should get the duration between two datetimes', () => {
      const start = new Date('2019-03-23T17:00:00.000')
      const end = new Date('2019-03-23T20:23:00.000') // 03:23:00 difference
      const actualDiff = time.getHoursDiff(start.getTime(), end.getTime())

      expect(actualDiff).toBe(3)
    })
  })

  describe('formatDate()', () => {
    it('should format the timestamp with the given formats', () => {
      const timestamp = '2019-03-23T17:00:00-03:00'
      const actualDateOutput = time.formatDate(new Date(timestamp), FORMAT.DATE)

      expect(actualDateOutput).toBe('20190323')
    })
  })

  describe('formatDateNoUTC()', () => {
    it('should format the timestamp with the given formats, without Z at the end', () => {
      const timestamp = '2019-03-23T17:00:00-03:00'
      const actualDateOutput = time.formatDateNoUtc(new Date(timestamp), FORMAT.DATE)

      expect(actualDateOutput).toBe('20190323')
    })
  })

  describe('incrementDate()', () => {
    it('should increment the date by one day', () => {
      const incrementedDate = time.incrementDate(new Date('2020-04-01'), 1)
      const formattedDate = time.formatDate(incrementedDate, 'YYYY-MM-DD')

      expect(formattedDate).toEqual('2020-04-02')
    })
  })
})

