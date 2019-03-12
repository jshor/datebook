import CalendarBase from '../CalendarBase'
import GoogleCalendar from '../GoogleCalendar'

import { FORMAT, URL } from '../../constants'
import { formatTime } from '../../utils/time'
import { getRrule } from '../../utils/ics'

import queryStringToObj from '../../../test_helpers/queryStringToObj'

describe('GoogleCalendar', () => {
  const baseOpts = {
    title: 'Test Event',
    description: 'Test Description',
    location: 'Rockefeller Center',
    start: '20150704T190000'
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
  })

  it('should be a subclass of CalendarBase', () => {
    expect(new GoogleCalendar({})).toBeInstanceOf(CalendarBase)
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
          formatTime(testObj.start, FORMAT.DATE)
        }/${
          formatTime(testObj.end, FORMAT.DATE)
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
  })
})
