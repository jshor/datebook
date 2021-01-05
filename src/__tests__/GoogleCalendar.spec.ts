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

  afterEach(() => jest.resetAllMocks())

  it('should extend CalendarBase', () => {
    expect(new GoogleCalendar(baseOpts)).toBeInstanceOf(CalendarBase)
  })

  describe('render()', () => {
    const FULL_DATE_FORMAT = `${FORMAT.DATE}${FORMAT.TIME}`

    it('should use the proper base URL', () => {
      const calendar = new GoogleCalendar(baseOpts)
      const result = calendar.render()
      const baseUrl = result.split('?')[0]

      expect(baseUrl).toBe(URL.GOOGLE)
    })

    it('should handle the text parts', () => {
      const calendar = new GoogleCalendar(baseOpts)
      const result = calendar.render()
      const params = queryString.parse(result.split('?')[1])

      expect(params).toMatchObject(baseParams)
    })

    describe('an event spanning multiple days', () => {
      it('should have start and end date formatted including time-of-day', () => {
        const opts = {
          ...baseOpts,
          start: new Date('2019-03-23T17:00:00.000'),
          end: new Date('2019-05-23T19:00:00.000')
        }
        const calendar = new GoogleCalendar(opts)
        const result = calendar.render()
        const params = queryString.parse(result.split('?')[1])
        const expectedDates = `${
          time.formatDate(opts.start, FULL_DATE_FORMAT)
        }/${
          time.formatDate(opts.end, FULL_DATE_FORMAT)
        }`

        expect(params.dates).toBe(expectedDates)
      })
    })

    describe('an event that lasts less than a day', () => {
      it('should have start and end date formatted including time-of-day', () => {
        const opts = {
          ...baseOpts,
          start: new Date('2019-03-23T17:00:00.000'),
          end: new Date('2019-03-23T19:00:00.000')
        }
        const calendar = new GoogleCalendar(opts)
        const result = calendar.render()
        const params = queryString.parse(result.split('?')[1])
        const expectedDates = `${
          time.formatDate(opts.start, FULL_DATE_FORMAT)
        }/${
          time.formatDate(opts.end, FULL_DATE_FORMAT)
        }`

        expect(params.dates).toBe(expectedDates)
      })
    })

    describe('an all-day event', () => {
      it('should have start and end date formatted without time-of-day', () => {
        const calendar = new GoogleCalendar(baseOpts)
        const result = calendar.render()
        const params = queryString.parse(result.split('?')[1])
        const expectedDates = `${
          time.formatDate(baseOpts.start, FORMAT.DATE)
        }/${
          time.formatDate(time.incrementDate(baseOpts.start, 1), FORMAT.DATE)
        }`

        expect(params.dates).toBe(expectedDates)
      })
    })

    describe('without recurrence', () => {
      it('should not include recur param', () => {
        const calendar = new GoogleCalendar(baseOpts)
        const result = calendar.render()
        const params = queryString.parse(result.split('?')[1])

        expect(params).not.toHaveProperty('recur')
      })
    })

    describe('with recurrence', () => {
      beforeEach(() => {
        jest
          .spyOn(ics, 'getRrule')
          .mockReturnValue('FREQ=DAILY;INTERVAL=1;COUNT=5')
      })

      it('should use the result of getRrule', () => {
        const calendar = new GoogleCalendar({
          ...baseOpts,
          recurrence: {
            frequency: DAILY,
            interval: 1,
            count: 5
          }
        })
        const result = calendar.render()
        const params = queryString.parse(result.split('?')[1])
        const { recur } = params

        expect(ics.getRrule).toHaveBeenCalledTimes(1)
        expect(recur).toBe('RRULE:FREQ=DAILY;INTERVAL=1;COUNT=5')
      })
    })
  })

  describe('attendees', () => {
    it('should render the `add` param with the value of the attendees as a list of mailtos', () => {
      const calendar = new GoogleCalendar({
        ...baseOpts,
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
      const result = calendar.render()
      const params = queryString.parse(result.split('?')[1])

      expect(params.add).toEqual('John Doe <john@doe.com>,Jane Doe <jane@doe.com>')
    })

    it('should not include the `add` param when no attendees are assigned', () => {
      const obj = new GoogleCalendar(baseOpts)
      const result = obj.render()
      const querystring = result.split('?')[1]
      const params = queryString.parse(querystring)

      expect(params).not.toHaveProperty('add')
    })
  })
})
