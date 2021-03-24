import * as queryString from 'query-string'
import CalendarBase from '../CalendarBase'
import OutlookCalendar from '../OutlookCalendar'
import time from '../utils/time'
import CalendarOptions from '../types/CalendarOptions'
import { FORMAT } from '../constants'

describe('Outlook Calendar', () => {
  it('should be a subclass of CalendarBase', () => {
    expect(new OutlookCalendar({
      title: 'Fun Party',
      description: 'BYOB',
      location: 'New York',
      start: new Date('2019-07-04T19:00:00.000')
    })).toBeInstanceOf(CalendarBase)
  })

  describe('setHost()', () => {
    let outlookCalendar: OutlookCalendar

    beforeEach(() => {
      outlookCalendar = new OutlookCalendar({
        title: 'Fun Party',
        description: 'BYOB',
        location: 'New York',
        start: new Date('2019-07-04T19:00:00.000')
      })
    })

    it('should render the base URL as outlook.office.com if `office` is passed', () => {
      const url = outlookCalendar
        .setHost('office')
        .render()

      expect(url.substring(0, 26)).toEqual('https://outlook.office.com')
    })

    it('should render the base URL as outlook.live.com if `live` is passed', () => {
      const url = outlookCalendar
        .setHost('live')
        .render()

      expect(url.substring(0, 24)).toEqual('https://outlook.live.com')
    })

    it('should render the base URL as outlook.live.com if an invalid host is passed', () => {
      const url = outlookCalendar
        .setHost('some_invalid_host')
        .render()

      expect(url.substring(0, 24)).toEqual('https://outlook.live.com')
    })
  })

  describe('render()', () => {
    const testOpts: CalendarOptions = {
      start: new Date('2019-03-23T17:00:00.000')
    }

    beforeEach(() => {
      testOpts.title = 'Music Concert'
      testOpts.location = 'New York'
      testOpts.description = 'a description'
      testOpts.start = new Date('2019-03-23T17:00:00.000')
      testOpts.end = new Date('2019-03-23T21:00:00.000')
    })

    describe('when the event is not an all-day event', () => {
      it('should render the appropriate query string with timestamps formatted with time information, and allday = `false`', () => {
        const obj = new OutlookCalendar(testOpts)
        const result = obj.render()
        const paramsObj = queryString.parse(result.split('?')[1])

        expect(paramsObj).toMatchObject({
          path: '/calendar/action/compose',
          rru: 'addevent',
          startdt: time.formatDate(testOpts.start, FORMAT.OUTLOOK_FULL),
          enddt: time.formatDate(testOpts.end, FORMAT.OUTLOOK_FULL),
          subject: testOpts.title,
          body: testOpts.description,
          location: testOpts.location,
          allday: 'false'
        })
      })
    })

    describe('when the event is an all-day event', () => {
      it('should render with date-only timestamps for an all-day event', () => {
        const obj = new OutlookCalendar({
          ...testOpts,
          end: undefined
        })
        const result = obj.render()
        const paramsObj = queryString.parse(result.split('?')[1])
        const endDate = time.incrementDate(testOpts.start, 1)

        expect(paramsObj).toMatchObject({
          path: '/calendar/action/compose',
          rru: 'addevent',
          startdt: time.formatDate(testOpts.start, FORMAT.OUTLOOK_DATE),
          enddt: time.formatDate(endDate, FORMAT.OUTLOOK_DATE),
          subject: testOpts.title,
          body: testOpts.description,
          location: testOpts.location,
          allday: 'true'
        })
      })
    })

    describe('attendees', () => {
      it('should render the `to` param with the value of the attendees as a list of mailtos', () => {
        const obj = new OutlookCalendar({
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
        const paramsObj = queryString.parse(result.split('?')[1])

        expect(paramsObj).toMatchObject({
          path: '/calendar/action/compose',
          rru: 'addevent',
          startdt: time.formatDate(testOpts.start, FORMAT.OUTLOOK_FULL),
          enddt: time.formatDate(testOpts.end, FORMAT.OUTLOOK_FULL),
          subject: testOpts.title,
          body: testOpts.description,
          location: testOpts.location,
          allday: 'false',
          to: 'John Doe <john@doe.com>,Jane Doe <jane@doe.com>'
        })
      })

      it('should not include the `to` param when no attendees are assigned', () => {
        const obj = new OutlookCalendar(testOpts)
        const result = obj.render()
        const querystring = result.split('?')[1]
        const params = queryString.parse(querystring)

        expect(params).not.toHaveProperty('to')
      })
    })
  })
})
