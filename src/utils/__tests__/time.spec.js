import moment from 'moment'
import { FORMAT } from '../../constants'
import { formatTimestampString, getHoursDuration, getTimeCreated } from '../time'

describe('time util', () => {
  describe('formatTimestampString()', () => {
    it('should format the time with the passed-in format', () => {
      const time = '2019-03-23T17:00:00.000-05:00'
      const expectedDateOutput = moment(time).format(FORMAT.DATE)
      const expectedTimeOutput = moment(time).format(FORMAT.TIME)
      const actualDateOutput = formatTimestampString(time, FORMAT.DATE)
      const actualTimeOutput = formatTimestampString(time, FORMAT.TIME)

      expect(actualDateOutput).toBe(expectedDateOutput)
      expect(actualTimeOutput).toBe(expectedTimeOutput)
    })

    it('should default to date time format', () => {
      const time = '2019-03-23T17:00:00.000-05:00'
      const expectedOutput = moment(time).format(`${FORMAT.DATE}T${FORMAT.TIME}`)
      const actualOutput = formatTimestampString(time)

      expect(actualOutput).toBe(expectedOutput)
    })
  })

  describe('getHoursDuration()', () => {
    it('should get the duration between two datetimes', () => {
      const start = '2019-03-23T17:00:00.000-05:00'
      const end = '2019-03-23T20:23:00.000-05:00'
      const expectedDiff = '0323'
      const actualDiff = getHoursDuration(start, end)

      expect(actualDiff).toBe(expectedDiff)
    })
  })

  describe('getTimeCreated()', () => {
    beforeEach(() => {
      jest.useFakeTimers()
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    it('should get the current time in date time format', () => {
      const now = new moment()
      const expectedOutput = now.format(FORMAT.DATE)

      expect(getTimeCreated()).toBe(expectedOutput)
    })
  })
})

