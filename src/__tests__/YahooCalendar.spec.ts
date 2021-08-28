import * as queryString from 'query-string'
import { FORMAT, URL } from '../constants'
import CalendarBase from '../CalendarBase'
import YahooCalendar from '../YahooCalendar'
import time from '../utils/time'
import CalendarOptions from '../types/CalendarOptions'

describe('YahooCalendar', () => {
  let testOpts: CalendarOptions

  beforeEach(() => {
    testOpts = {
      title: 'Fun Party',
      description: 'BYOB',
      location: 'New York',
      start: new Date('2019-07-04T19:00:00.000')
    }
  })

  afterEach(() => jest.clearAllMocks())

  it('should be a subclass of CalendarBase', () => {
    const result = new YahooCalendar(testOpts)

    expect(result).toBeInstanceOf(CalendarBase)
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
        start: new Date('2019-07-04T19:00:00.000')
      }

      it('should format the query string without an end time', () => {
        const obj = new YahooCalendar(testOpts)
        const result = obj.render()

        const querystring = result.split('?')[1]
        const params = queryString.parse(querystring)
        const expectedObj = {
          v: '60',
          title: 'Fun Party',
          desc: 'BYOB',
          in_loc: 'New York',
          dur: 'allday',
          st: time.formatDate(testOpts.start, FORMAT.DATE)
        }
        expect(params).toMatchObject(expectedObj)
        expect(expectedObj).toMatchObject(params)
      })
    })

    describe('is not all day event', () => {
      const testOpts = {
        title: 'Fun Party',
        description: 'BYOB',
        location: 'New York',
        start: new Date('2019-07-04T19:00:00.000'),
        end: new Date('2019-07-04T21:00:00.000') // two-hour long event (19h to 21h)
      }

      describe('when the duration of the event spans 99 hours or fewer', () => {
        it('should format the query string with the time parameters with the start time and duration of two hours', () => {
          const obj = new YahooCalendar(testOpts)
          const result = obj.render()

          const querystring = result.split('?')[1]
          const params = queryString.parse(querystring)
          const expectedObj = {
            v: '60',
            title: 'Fun Party',
            desc: 'BYOB',
            in_loc: 'New York',
            st: time.formatDateNoUtc(testOpts.start, FORMAT.NO_UTC_FULL),
            dur: '0200'
          }
          expect(params).toMatchObject(expectedObj)
          expect(expectedObj).toMatchObject(params)
        })
      })

      describe('when the duration of the event spans longer than 99 hours', () => {
        it('should format the query string with the time parameters in start/end timestamps', () => {
          const start = new Date('2019-07-04T19:00:00.000')
          const end = new Date('2019-07-08T23:00:00.000') // one-hundred-hour long event, (four days, three hours)

          const obj = new YahooCalendar({ ...testOpts, start, end })
          const result = obj.render()

          const querystring = result.split('?')[1]
          const params = queryString.parse(querystring)
          const expectedObj = {
            v: '60',
            title: 'Fun Party',
            desc: 'BYOB',
            in_loc: 'New York',
            st: time.formatDateNoUtc(start, FORMAT.NO_UTC_FULL),
            et: time.formatDateNoUtc(end, FORMAT.NO_UTC_FULL)
          }
          expect(params).toMatchObject(expectedObj)
          expect(expectedObj).toMatchObject(params)
        })
      })
    })

    describe('attendees', () => {
      it('should render the `inv_list` param with the value of the attendees as a list of mailtos', () => {
        const obj = new YahooCalendar({
          ...testOpts,
          attendees: [
            {
              name: 'John Doe',
              email: 'john@doe.com',
              icsOptions: {
                rsvp: true
              }
            },
            {
              name: 'Jane Doe',
              email: 'jane@doe.com'
            }
          ]
        })
        const result = obj.render()
        const querystring = result.split('?')[1]
        const params = queryString.parse(querystring)
        const expectedObj = {
          v: '60',
          title: 'Fun Party',
          desc: 'BYOB',
          in_loc: 'New York',
          dur: 'allday',
          st: time.formatDateNoUtc(testOpts.start, FORMAT.DATE),
          inv_list: 'John Doe <john@doe.com>,Jane Doe <jane@doe.com>'
        }

        expect(params).toMatchObject(expectedObj)
      })

      it('should not include the `inv_list` param when no attendees are assigned', () => {
        const obj = new YahooCalendar(testOpts)
        const result = obj.render()
        const querystring = result.split('?')[1]
        const params = queryString.parse(querystring)

        expect(params).not.toHaveProperty('inv_list')
      })
    })
  })
})
