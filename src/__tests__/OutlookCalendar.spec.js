import moment from 'moment'
import { FORMAT, URL } from '../constants'
import CalendarBase from '../CalendarBase'
import OutlookCalendar from '../OutlookCalendar'
import queryStringToObj from '../../test_helpers/queryStringToObj'

describe('Outlook Calendar', () => {
  it('should be a subclass of CalendarBase', () => {
    expect(new OutlookCalendar({
      title: 'Fun Party',
      description: 'BYOB',
      location: 'New York',
      start: '2019-07-04T19:00:00.000-05:00'
    })).toBeInstanceOf(CalendarBase)
  })

  describe('render()', () => {
    const dateTimeFormat = `${FORMAT.DATE}T${FORMAT.TIME}`
    let testOpts = {}

    beforeEach(() => {
      testOpts.title = 'Music Concert'
      testOpts.location = 'New York'
      testOpts.description = 'a description'
      testOpts.start = '2019-03-23T17:00:00.000-05:00'
      testOpts.end = '2019-03-23T21:00:00.000-05:00'
    })

    afterEach(() => {
      testOpts = {}
    })

    it('should use the proper base URL', () => {
      const obj = new OutlookCalendar(testOpts)
      const result = obj.render()
      const baseUrl = result.split('?')[0]

      expect(baseUrl).toBe(URL.OUTLOOK)
    })

    it('should render the appropriate query string', () => {
      const parsedStart = moment(testOpts.start).format(dateTimeFormat)
      const parsedEnd = moment(testOpts.end).format(dateTimeFormat)
      const expectedParams = {
        path: '/calendar/view/Month',
        rru: 'addevent',
        startdt: parsedStart,
        enddt: parsedEnd,
        subject: testOpts.title,
        body: testOpts.description,
        location: testOpts.location,
        allday: "false",
      }
      const obj = new OutlookCalendar(testOpts)
      const result = obj.render()

      const queryString = result.split('?')[1]
      const paramsObj = queryStringToObj(queryString)

      expect(paramsObj).toMatchObject(expectedParams)
      expect(expectedParams).toMatchObject(paramsObj)
    })
  })
})
