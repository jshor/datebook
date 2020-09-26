import { FORMAT } from '../../constants'
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

      expect(formattedDate).toEqual('2020-04-02')
    })
  })
})

