<<<<<<< HEAD
=======
// import * as moment from 'moment'
>>>>>>> 878ccf7... refactor(ts): adds ESLint, TypeDoc
import { FORMAT } from '../../constants'
import time from '../time'

describe('time util', () => {
  describe('formatTimestampString()', () => {
    it('should format the timestamp with the given formats', () => {
<<<<<<< HEAD
      const timestamp = new Date('2019-03-23T17:00:00-03:00')
      const actualDateOutput = time.formatTimestampDate(timestamp, FORMAT.DATE)
=======
      const date = new Date('2019-03-23T17:00:00-03:00')
      const actualDateOutput = time.formatTimestampDate(date, FORMAT.DATE)
>>>>>>> 878ccf7... refactor(ts): adds ESLint, TypeDoc

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

