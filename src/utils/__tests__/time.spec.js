import moment from 'moment'
import { FORMAT } from '../../constants'
import { formatTime, getHoursDuration, getTimeCreated } from '../time'

describe('time util', () => {
  describe('formatTime()', () => {
    it('should format the time with the passed-in format', () => {
      const time = '2019-03-23 17:00-0500'
      const expectedDateOutput = moment(time).format(FORMAT.DATE)
      const expectedTimeOutput = moment(time).format(FORMAT.TIME)
      const actualDateOutput = formatTime(time, FORMAT.DATE)
      const actualTimeOutput = formatTime(time, FORMAT.TIME)

      expect(actualDateOutput).toBe(expectedDateOutput)
      expect(actualTimeOutput).toBe(expectedTimeOutput)
    })
    it('should default to date time format', () => {
      const time = '2019-03-23 17:00-0500'
      const expectedOutput = '20190323T170000'
      const actualOutput = formatTime(time)

      expect(actualOutput).toBe(expectedOutput)
    })
  })
  describe('getHoursDuration()', () => {
    it('should get the duration between two datetimes', () => {
      const start = '2019-03-23 17:00-0500'
      const end = '2019-03-23 20:23-0500'
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
      const expectedOutput = now.format(`${FORMAT.DATE}T${FORMAT.TIME}`)

      expect(getTimeCreated()).toBe(expectedOutput)
    })
  })
})

