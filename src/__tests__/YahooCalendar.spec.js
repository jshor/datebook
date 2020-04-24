import moment from 'moment'
import { FORMAT, RECURRENCE, URL } from '../constants'
import CalendarBase from '../CalendarBase'
import YahooCalendar from '../YahooCalendar'
import queryStringToObj from '../../test_helpers/queryStringToObj'

const { FREQUENCY: { DAILY, WEEKLY, MONTHLY, YEARLY } } = RECURRENCE
const yahooFreqMap = {
  [DAILY]: 'Dy',
  [WEEKLY]: 'Wk',
  [MONTHLY]: 'Mh',
  [YEARLY]: 'Yr',
}

const dtFormat = `${FORMAT.DATE}T${FORMAT.TIME}`

describe('YahooCalendar', () => {
  let testOpts

  beforeEach(() => {
    testOpts = {
      title: 'Fun Party',
      description: 'BYOB',
      location: 'New York',
      start: '2019-07-04T19:00:00.000-05:00'
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be a subclass of CalendarBase', () => {
    const result = new YahooCalendar(testOpts)

    expect(result).toBeInstanceOf(CalendarBase)
  })

  describe('formatDay()', () => {
    it('should change the day to titlecase', () => {
      const obj = new YahooCalendar(testOpts)
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
        const obj = new YahooCalendar(testOpts)

        const result = obj.getFrequency(weekdayRecurrence)

        expect(result).toBe('SuTuWe')
      })
    })

    describe('if no weekdays', () => {
      it('should transform frequencies', () => {
        const obj = new YahooCalendar(testOpts)

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
      const obj = new YahooCalendar(testOpts)

      const recurrence = {
        interval: 3,
        frequency: DAILY,
      }
      obj.getRecurrence(recurrence)
      expect(obj.getFrequency).toHaveBeenCalledTimes(1)
      expect(obj.getFrequency).toHaveBeenCalledWith(recurrence)
    })

    it('should prepend single digit interval with 0', () => {
      const obj = new YahooCalendar(testOpts)
      const recurrence = {
        interval: 3,
        frequency: DAILY,
      }

      const result = obj.getRecurrence(recurrence)
      expect(result).toBe(`0${recurrence.interval}Dy`)
    })

    it('should return yahoo calendar rpat rule', () => {
      const obj = new YahooCalendar(testOpts)
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
      const obj = new YahooCalendar(testOpts)
      const result = obj.render()
      const baseUrl = result.split('?')[0]

      expect(baseUrl).toBe(URL.YAHOO)
    })

    describe('is all day event', () => {
      const testOpts = {
        title: 'Fun Party',
        description: 'BYOB',
        location: 'New York',
        start: '2019-07-04T19:00:00.000-05:00'
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
            st: moment(testOpts.start).format(FORMAT.DATE),
            et: moment(testOpts.start).add(1, 'days').format(FORMAT.DATE)
          }
          expect(params).toMatchObject(expectedObj)
          expect(expectedObj).toMatchObject(params)
        })
      })

      describe('recurrence', () => {
        it('should format the query string', () => {
          const recurrenceEnd = '2019-07-10T19:00:00.000-05:00'
          const obj = new YahooCalendar({
            ...testOpts,
            recurrence: {
              frequency: DAILY,
              interval: 1,
              end: recurrenceEnd
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
            dur: '2400',
            st: moment(testOpts.start).format(FORMAT.DATE),
            RPAT: '01Dy',
            REND: moment(recurrenceEnd).format(dtFormat)
          }
          expect(params).toMatchObject(expectedObj)
        })
      })
    })

    describe('is not all day event', () => {
      const testOpts = {
        title: 'Fun Party',
        description: 'BYOB',
        location: 'New York',
        start: '2019-07-04T19:00:00.000-05:00',
        end: '2019-07-04T21:00:00.000-05:00'
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
          const recurrenceEnd = '2019-07-10T19:00:00.000-05:00'
          const obj = new YahooCalendar({
            ...testOpts,
            recurrence: {
              frequency: DAILY,
              interval: 1,
              end: recurrenceEnd
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
            REND: moment(recurrenceEnd).format(dtFormat)
          }
          expect(params).toMatchObject(expectedObj)
        })
      })
    })
  })
})
