import { FORMAT, RECURRENCE, URL } from '../constants'
import CalendarBase from '../CalendarBase'
import YahooCalendar from '../YahooCalendar'
import queryStringToObj from '../../test_helpers/queryStringToObj'
import { formatTimestampString } from '../utils/time'

const { FREQUENCY: { DAILY, WEEKLY, MONTHLY, YEARLY } } = RECURRENCE
const yahooFreqMap = {
  [DAILY]: 'Dy',
  [WEEKLY]: 'Wk',
  [MONTHLY]: 'Mh',
  [YEARLY]: 'Yr',
}

const getFormattedDate = (s, f) => {
  return formatTimestampString(new Date(s), f)
}

describe('YahooCalendar', () => {
  let testOpts

  beforeEach(() => {
    testOpts = {
      title: 'Fun Party',
      description: 'BYOB',
      location: 'New York',
      start: '2019-07-04T19:00:00.000'
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
  
  describe('getDuration()', () => {
    it('should get the duration between two datetimes', () => {
      const calendar = new YahooCalendar(testOpts)
      const start = new Date('2019-03-23T17:00:00.000')
      const end = new Date('2019-03-23T20:23:00.000')
      const expectedDiff = '0323'
      const actualDiff = calendar.getDuration(start, end)

      expect(actualDiff).toBe(expectedDiff)
    })
  })
  
  describe('getHoursDuration()', () => {
    it('should get the duration between two datetimes', () => {
      const calendar = new YahooCalendar(testOpts)
      const start = new Date('2019-03-23T17:00:00.000')
      const end = new Date('2019-03-23T20:23:00.000') // 03:23:00 difference
      const actualDiff = calendar.getHoursDuration(start, end)

      expect(actualDiff).toBe(3)
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
        start: '2019-07-04T19:00:00.000'
      }

      describe('no recurrence', () => {
        it('should format the query string without an end time', () => {
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
            st: getFormattedDate(testOpts.start, FORMAT.DATE)
          }
          expect(params).toMatchObject(expectedObj)
          expect(expectedObj).toMatchObject(params)
        })
      })

      describe('recurrence', () => {
        it('should format the query string with start and end times containing only their dates', () => {
          const recurrenceEnd = '2019-07-10T19:00:00.000'
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
            dur: 'allday',
            st: getFormattedDate(testOpts.start, 'YYYYMMDD'),
            RPAT: '01Dy',
            REND: getFormattedDate(recurrenceEnd, 'YYYYMMDD')
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
        start: '2019-07-04T19:00:00.000',
        end: '2019-07-04T21:00:00.000' // two-hour long event (19h to 21h)
      }

      describe('no recurrence', () => {
        describe('when the duration of the event spans 99 hours or fewer', () => {
          it('should format the query string with the time parameters with the start time and duration of two hours', () => {
            const obj = new YahooCalendar(testOpts)
            const result = obj.render()

            const querystring = result.split('?')[1]
            const params = queryStringToObj(querystring)
            const expectedObj = {
              v: '60',
              title: 'Fun Party',
              desc: 'BYOB',
              in_loc: 'New York',
              st: getFormattedDate(testOpts.start, 'YYYYMMDDThhmmss'),
              dur: '0200'
            }
            expect(params).toMatchObject(expectedObj)
            expect(expectedObj).toMatchObject(params)
          })
        })
        
        describe('when the duration of the event spans longer than 99 hours', () => {
          it('should format the query string with the time parameters in start/end timestamps', () => {
            const start = '2019-07-04T19:00:00.000'
            const end = '2019-07-08T23:00:00.000' // one-hundred-hour long event, (four days, three hours)
            
            const obj = new YahooCalendar({ ...testOpts, start, end })
            const result = obj.render()

            const querystring = result.split('?')[1]
            const params = queryStringToObj(querystring)
            const expectedObj = {
              v: '60',
              title: 'Fun Party',
              desc: 'BYOB',
              in_loc: 'New York',
              st: getFormattedDate(start, 'YYYYMMDDThhmmss'),
              et: getFormattedDate(end, 'YYYYMMDDThhmmss')
            }
            expect(params).toMatchObject(expectedObj)
            expect(expectedObj).toMatchObject(params)
          })
        })
      })

      describe('recurrence', () => {
        it('should format the query string with RPAT and REND params', () => {
          const recurrenceEnd = '2019-07-10T19:00:00.000'
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
            st: getFormattedDate(testOpts.start, 'YYYYMMDDThhmmss'),
            RPAT: '01Dy',
            REND: getFormattedDate(recurrenceEnd, 'YYYYMMDD')
          }
          expect(params).toMatchObject(expectedObj)
        })
      })
    })
  })
})
