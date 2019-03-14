import moment from 'moment'
import { FORMAT, RECURRENCE, URL } from '../../constants'
import { formatTime, getHoursDuration } from '../../utils/time'
import { toQueryString } from '../../utils/data'
import CalendarBase from '../CalendarBase'
import YahooCalendar from '../YahooCalendar'

import queryStringToObj from '../../../test_helpers/queryStringToObj'

const { FREQUENCY: { DAILY, WEEKLY, MONTHLY, YEARLY } } = RECURRENCE
const yahooFreqMap = {
  [DAILY]: 'Dy',
  [WEEKLY]: 'Wk',
  [MONTHLY]: 'Mh',
  [YEARLY]: 'Yr',
}

const dateFormat = FORMAT.DATE
const dtFormat = `${dateFormat}T${FORMAT.TIME}`
describe('YahooCalendar', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('should be a subclass of CalendarBase', () => {
    const result = new YahooCalendar({})

    expect(result).toBeInstanceOf(CalendarBase)
  })
  describe('formatDay()', () => {
    it('should change the day to titlecase', () => {
      const obj = new YahooCalendar({})
      const day = 'sUnDAy'

      const result = obj.formatDay(day)

      expect(result).toBe('su')
    })
  })
  describe('getFrequency()', () => {
    describe('if weekdays', () => {
      const weekdayRecurrence = {
        weekdays: 'SUNDAY,TUESDAY,WEDNESDAY'
      }
      it('should format weekdays only', () => {
        const obj = new YahooCalendar({})

        const result = obj.getFrequency(weekdayRecurrence)

        expect(result).toBe('SuTuWe')
      })
    })
    describe('if no weekdays', () => {
      it('should transform frequencies', () => {
        const obj = new YahooCalendar({})
        for (let freq of [ DAILY, WEEKLY, MONTHLY, YEARLY, 'foobar' ]) {
          const result = obj.getFrequency({
            frequency: freq,
          })
          const expected = yahooFreqMap[freq] || yahooFreqMap[WEEKLY]
          expect(result).toBe(expected)
        }
      })
    })
  })
  describe('getRecurrence()', () => {
    it('should call getFrequency with the recurrence', () => {
      jest.spyOn(YahooCalendar.prototype, 'getFrequency').mockReturnValueOnce('mockRrule')
      const obj = new YahooCalendar({})

      const recurrence = {
        interval: 3,
        frequency: DAILY,
      }
      obj.getRecurrence(recurrence)
      expect(obj.getFrequency).toHaveBeenCalledTimes(1)
      expect(obj.getFrequency).toHaveBeenCalledWith(recurrence)
    })
    it('should prepend single digit interval with 0', () => {
      const obj = new YahooCalendar({})
      const recurrence = {
        interval: 3,
        frequency: DAILY,
      }

      const result = obj.getRecurrence(recurrence)
      expect(result).toBe(`0${recurrence.interval}Dy`)
    })
    it('should return yahoo calendar rpat rule', () => {
      const obj = new YahooCalendar({})
      const recurrence = {
        interval: 10,
        frequency: DAILY,
      }

      const result = obj.getRecurrence(recurrence)
      expect(result).toBe(`${recurrence.interval}Dy`)
    })
  })
  describe('render()', () => {
    it('should use the correct baseUrl', () => {
      const obj = new YahooCalendar({})
      const result = obj.render()
      const baseUrl = result.split('?')[0]

      expect(baseUrl).toBe(URL.YAHOO)
    })
    describe('is all day event', () => {
      const testOpts = {
        title: 'Fun Party',
        description: 'BYOB',
        location: 'New York',
        start: '20190704T190000',
      }
      describe('no recurrence', () => {
        it('should format the query string', () => {
          const obj = new YahooCalendar(testOpts)
          const result = obj.render()

          const querystring = result.split('?')[1]
          const params = queryStringToObj(querystring)
          const expectedObj = {
            v: '60',
            title: 'Fun Party',
            desc: 'BYOB',
            in_loc: 'New York',
            dur: 'allday',
            st: moment(testOpts.start).format(dateFormat),
            et: moment('20190705').format(dateFormat),
          }
          expect(params).toMatchObject(expectedObj)
          expect(expectedObj).toMatchObject(params)
        })
      })
      describe('recurrence', () => {
        it('should format the query string', () => {
          const obj = new YahooCalendar({
            ...testOpts,
            recurrence: {
              frequency: DAILY,
              interval: 1,
              end: '20190710',
            }
          })
          const result = obj.render()

          const querystring = result.split('?')[1]
          const params = queryStringToObj(querystring)
          const expectedObj = {
            v: '60',
            title: 'Fun Party',
            desc: 'BYOB',
            in_loc: 'New York',
            dur: '0000',
            st: moment(testOpts.start).format(dateFormat),
            RPAT: '01Dy',
            REND: '20190710T000000',
          }
          expect(expectedObj).toMatchObject(params)
          expect(params).toMatchObject(expectedObj)
        })
      })
    })
    describe('is not all day event', () => {
      const testOpts = {
        title: 'Fun Party',
        description: 'BYOB',
        location: 'New York',
        start: '20190704T190000',
        end: '20190704T210000',
      }
      describe('no recurrence', () => {
        it('should format the query string', () => {
          const obj = new YahooCalendar(testOpts)
          const result = obj.render()

          const querystring = result.split('?')[1]
          const params = queryStringToObj(querystring)
          const expectedObj = {
            v: '60',
            title: 'Fun Party',
            desc: 'BYOB',
            in_loc: 'New York',
            st: moment(testOpts.start).format(dtFormat),
            et: moment(testOpts.end).format(dtFormat),
          }
          expect(params).toMatchObject(expectedObj)
          expect(expectedObj).toMatchObject(params)
        })
      })
      describe('recurrence', () => {
        it('should format the query string', () => {
          const obj = new YahooCalendar({
            ...testOpts,
            recurrence: {
              frequency: DAILY,
              interval: 1,
              end: '20190710',
            }
          })
          const result = obj.render()

          const querystring = result.split('?')[1]
          const params = queryStringToObj(querystring)
          const expectedObj = {
            v: '60',
            title: 'Fun Party',
            desc: 'BYOB',
            in_loc: 'New York',
            dur: '0200',
            st: moment(testOpts.start).format(dtFormat),
            RPAT: '01Dy',
            REND: '20190710T000000',
          }
          expect(expectedObj).toMatchObject(params)
          expect(params).toMatchObject(expectedObj)
        })
      })
    })
  })
})
