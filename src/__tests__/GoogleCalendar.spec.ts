import * as queryString from 'query-string'
import CalendarBase from '../CalendarBase'
import GoogleCalendar from '../GoogleCalendar'
import CalendarOptions from '../types/CalendarOptions'
import ics from '../utils/ics'
import time from '../utils/time'
import { FORMAT, RECURRENCE, URL } from '../constants'

const { FREQUENCY: { DAILY } } = RECURRENCE

describe('GoogleCalendar', () => {
  const baseOpts: CalendarOptions = {
    title: 'Test Event',
    description: 'Test Description',
    location: 'Rockefeller Center',
    start: new Date('2019-03-23T17:00:00.000')
  }
  const baseParams: Record<string, string> = {
    text: 'Test Event',
    details: 'Test Description',
    location: 'Rockefeller Center',
    action: 'TEMPLATE'
  }
  let testObj

  afterEach(() => jest.resetAllMocks())

  it('should extend CalendarBase', () => {
    expect(new GoogleCalendar(baseOpts)).toBeInstanceOf(CalendarBase)
  })

  describe('render()', () => {
    let result

    it('should use the proper base URL', () => {
      testObj = new GoogleCalendar(baseOpts)

      result = testObj.render()
      const baseUrl = result.split('?')[0]

      expect(baseUrl).toBe(URL.GOOGLE)
    })

    it('should handle the text parts', () => {
      testObj = new GoogleCalendar(baseOpts)

      result = testObj.render()

      const paramsObj = queryString.parse(result.split('?')[1])

      expect(paramsObj).toMatchObject(baseParams)
    })

    describe('an all-day event', () => {
      it('should have start and end date formatted without time-of-day', () => {
        testObj = new GoogleCalendar(baseOpts)

        result = testObj.render()

        const paramsObj = queryString.parse(result.split('?')[1])
        const expectedDates = `${
          time.formatDate(testObj.start, FORMAT.DATE)
        }/${
          time.formatDate(testObj.end, FORMAT.DATE)
        }`

        expect(paramsObj.dates).toBe(expectedDates)
      })
    })

    describe('without recurrence', () => {
      it('should not include recur param', () => {
        testObj = new GoogleCalendar(baseOpts)

        result = testObj.render()

        const paramsObj = queryString.parse(result.split('?')[1])

        expect(paramsObj).not.toHaveProperty('recur')
      })
    })

    describe('with recurrence', () => {
      beforeEach(() => {
        jest
          .spyOn(ics, 'getRrule')
          .mockReturnValue('FREQ=DAILY;INTERVAL=1;COUNT=5')
      })

      it('should use the result of getRrule', () => {
        testObj = new GoogleCalendar({
          ...baseOpts,
          recurrence: {
            frequency: DAILY,
            interval: 1,
            count: 5
          }
        })

        result = testObj.render()

        const paramsObj = queryString.parse(result.split('?')[1])
        const { recur } = paramsObj

        expect(ics.getRrule).toHaveBeenCalledTimes(1)
        expect(ics.getRrule).toHaveBeenCalledWith(testObj.recurrence)
        expect(recur).toBe('RRULE:FREQ=DAILY;INTERVAL=1;COUNT=5')
      })
    })
  })
})
