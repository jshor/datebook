<<<<<<< HEAD
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

=======
import { FORMAT } from '../../constants'
import time from '../time'

describe('time utils', () => {
>>>>>>> d8c964c... refactor: removes ability to specify time as strings
  describe('getTimeCreated()', () => {
    beforeEach(() => {
      jest.useFakeTimers()
    })

    afterEach(() => {
      jest.useRealTimers()
    })

<<<<<<< HEAD
    // xit('should get the current time in date time format', () => {
    //   const now = new moment()
    //   const expectedOutput = now.format(FORMAT.DATE)
=======
    it('should get the current time in date time format', () => {
      expect(time.getTimeCreated()).toBe(time.formatDate(new Date(), FORMAT.DATE))
    })
  })

  describe('formatDate()', () => {
    it('should format the timestamp with the given formats', () => {
      const timestamp = '2019-03-23T17:00:00-03:00'
      const actualDateOutput = time.formatDate(new Date(timestamp), FORMAT.DATE)

      expect(actualDateOutput).toBe('20190323')
    })
  })

  describe('incrementDate()', () => {
    it('should increment the date by one day', () => {
      const incrementedDate = time.incrementDate(new Date('2020-04-01'), 1)
      const formattedDate = time.formatDate(incrementedDate, 'YYYY-MM-DD')
>>>>>>> d8c964c... refactor: removes ability to specify time as strings

      expect(formattedDate).toEqual('2020-04-02')
    })
  })
})

