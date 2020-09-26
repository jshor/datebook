import { URL } from '../constants'
import CalendarBase from '../CalendarBase'
import OutlookCalendar from '../OutlookCalendar'
import queryStringToObj from '../../test_helpers/queryStringToObj'
import { formatTimestampString } from '../utils/time'

describe('Outlook Calendar', () => {
  it('should be a subclass of CalendarBase', () => {
    expect(new OutlookCalendar({
      title: 'Fun Party',
      description: 'BYOB',
      location: 'New York',
      start: '2019-07-04T19:00:00.000'
    })).toBeInstanceOf(CalendarBase)
  })

  describe('render()', () => {
    let testOpts = {}

    beforeEach(() => {
      testOpts.title = 'Music Concert'
      testOpts.location = 'New York'
      testOpts.description = 'a description'
      testOpts.start = new Date('2019-03-23T17:00:00.000')
      testOpts.end = new Date('2019-03-23T21:00:00.000')
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

    describe('when the event is not an all-day event', () => {
      it('should render the appropriate query string with timestamps formatted with time information, and allday = `false`', () => {
        const obj = new OutlookCalendar(testOpts)
        const result = obj.render()

        const queryString = result.split('?')[1]
        const paramsObj = queryStringToObj(queryString)

        expect(paramsObj).toMatchObject({
          path: '/calendar/action/compose',
          rru: 'addevent',
          startdt: formatTimestampString(obj.start, 'YYYY-MM-DDThh:mm:ss'),
          enddt: formatTimestampString(obj.end, 'YYYY-MM-DDThh:mm:ss'),
          subject: testOpts.title,
          body: testOpts.description,
          location: testOpts.location,
          allday: 'false'
        })
      })
    })

    describe('when the event is an all-day event', () => {
      it('should render the appropriate query string with timestamps only with their dates, and allday = `true`', () => {
        const obj = new OutlookCalendar({
          ...testOpts,
          end: undefined
        })
        const result = obj.render()

        const queryString = result.split('?')[1]
        const paramsObj = queryStringToObj(queryString)

        expect(paramsObj).toMatchObject({
          path: '/calendar/action/compose',
          rru: 'addevent',
          startdt: formatTimestampString(obj.start, 'YYYY-MM-DD'),
          enddt: formatTimestampString(obj.end, 'YYYY-MM-DD'),
          subject: testOpts.title,
          body: testOpts.description,
          location: testOpts.location,
          allday: 'true'
        })
      })
    })
  })
})
