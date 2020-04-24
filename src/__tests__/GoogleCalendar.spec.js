import CalendarBase from '../CalendarBase'
import GoogleCalendar from '../GoogleCalendar'
import { FORMAT, RECURRENCE, URL } from '../constants'
import { formatTimestampString } from '../utils/time'
import * as Ics from '../utils/ics'
import queryStringToObj from '../../test_helpers/queryStringToObj'

jest.mock('../utils/ics')

const { FREQUENCY: { DAILY } } = RECURRENCE

describe('GoogleCalendar', () => {
  const baseOpts = {
    title: 'Test Event',
    description: 'Test Description',
    location: 'Rockefeller Center',
    start: '2019-03-23T17:00:00.000-05:00'
  }
  const baseParams = {
    text: 'Test Event',
    details: 'Test Description',
    location: 'Rockefeller Center',
    action: 'TEMPLATE'
  }
  let testObj

  afterEach(() => {
    testObj = undefined
    jest.resetAllMocks()
  })

  it('should be a subclass of CalendarBase', () => {
    expect(new GoogleCalendar(baseOpts)).toBeInstanceOf(CalendarBase)
  })

  describe('render()', () => {
    let result;

    afterEach(() => {
      result = undefined
    })

    it('should use the proper base URL', () => {
      testObj = new GoogleCalendar(baseOpts)

      result = testObj.render()
      let baseUrl = result.split('?')[0]

      expect(baseUrl).toBe(URL.GOOGLE)
    })

    it('should handle the text parts', () => {
      testObj = new GoogleCalendar(baseOpts)

      result = testObj.render()
      let queryString = result.split('?')[1]
      let paramsObj = queryStringToObj(queryString)

      expect(paramsObj).toMatchObject(baseParams)
    })

    describe('an all-day event', () => {
      it('should have start and end date formatted without time-of-day', () => {
        testObj = new GoogleCalendar(baseOpts)

        result = testObj.render()
        let queryString = result.split('?')[1]
        let paramsObj = queryStringToObj(queryString)

        let expectedDates = `${
          formatTimestampString(testObj.start, FORMAT.DATE)
        }/${
          formatTimestampString(testObj.end, FORMAT.DATE)
        }`

        expect(paramsObj.dates).toBe(expectedDates)
      })
    })

    describe('without recurrence', () => {
      it('should not include recur param', () => {
        testObj = new GoogleCalendar(baseOpts)

        result = testObj.render()
        let queryString = result.split('?')[1]
        let paramsObj = queryStringToObj(queryString)

        expect(paramsObj).not.toHaveProperty('recur')
      })
    })

    describe('with recurrence', () => {
      beforeEach(() => {
        Ics.getRrule.mockReturnValue('FREQ=DAILY;INTERVAL=1;COUNT=5')
      })

      it('should use the result of getRrule', () => {
        testObj = new GoogleCalendar({
          ...baseOpts,
          recurrence: {
            frequency: DAILY,
            interval: 1,
            count: 5,
          },
        })
        result = testObj.render()
        let queryString = result.split('?')[1]
        let paramsObj = queryStringToObj(queryString)
        let { recur } = paramsObj
        expect(Ics.getRrule).toHaveBeenCalledTimes(1)
        expect(Ics.getRrule).toHaveBeenCalledWith(testObj.recurrence)
        expect(recur).toBe('RRULE:FREQ=DAILY;INTERVAL=1;COUNT=5')
      })
    })
  })
})
