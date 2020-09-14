import { FORMAT } from '../../constants'
import time from '../time'

describe('time util', () => {
  describe('formatTimestampString()', () => {
    it('should format the timestamp with the given formats', () => {
      const timestamp = new Date('2019-03-23T17:00:00-03:00')
      const actualDateOutput = time.formatTimestampDate(timestamp, FORMAT.DATE)

      expect(actualDateOutput).toBe('20190323')
    })
  })

  describe('getTimeCreated()', () => {
    beforeEach(() => {
      jest.useFakeTimers()
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    // xit('should get the current time in date time format', () => {
    //   const now = new moment()
    //   const expectedOutput = now.format(FORMAT.DATE)

    //   expect(getTimeCreated()).toBe(expectedOutput)
    // })
  })
})

