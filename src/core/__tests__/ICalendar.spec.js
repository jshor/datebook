import moment from 'moment'
import { FORMAT } from '../../constants'
import { formatText, getUid, getRrule, download } from '../../utils/ics'
import { getTimeCreated } from '../../utils/time'
import CalendarBase from '../CalendarBase'
import ICalendar from '../ICalendar'

jest.mock('../../utils/ics')
jest.mock('../../utils/time')

describe('ICalendar', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('should be a subclass of CalendarBase', () => {
    const result = new ICalendar({})
    expect(result).toBeInstanceOf(CalendarBase)
  })
  describe('download()', () => {
    const obj = new ICalendar({
      title: 'fake title',
    })
    jest.spyOn(obj, 'render').mockReturnValue('renderedstring')
    obj.download()

    expect(obj.render).toHaveBeenCalledTimes(1)

    const rendered = obj.render.mock.results[0].value
    expect(download).toHaveBeenCalledTimes(1)
    expect(download).toHaveBeenCalledWith(obj.title, rendered)
  })
  describe('render()', () => {
    const originalWindow = global.window
    const testOpts = {
      title: 'Fun Party',
      description: 'BYOB',
      location: 'New York',
      start: '20190704T190000',
      end: '20190704T210000',
      recurrence: {},
    }
    const dtFormat = `${FORMAT.DATE}T${FORMAT.TIME}`
    beforeEach(() => {
      formatText.mockImplementation((...args) => args.join(' formatted '))
      getUid.mockReturnValue(24)
      getTimeCreated.mockReturnValue('20190502')
      getRrule.mockReturnValue('mockedRrule')
      Object.defineProperty(global, 'window', {
        value: {
          location: {
            host: 'foobar',
          },
        },
        writable: true,
      })
    })
    afterEach(() => {
      Object.defineProperty(global, 'window', {
        value: originalWindow,
        writable: true,
      })
    })
    it('should format and truncate the description, location, and text, to 62, 64, and 66 characters respectively', () => {
      const obj = new ICalendar(testOpts)

      obj.render()

      expect(formatText).toHaveBeenCalledTimes(3)
      expect(formatText.mock.calls).toEqual([
        [testOpts.description, 62],
        [testOpts.location, 64],
        [testOpts.title, 66],
      ])
    })
    it('should call getUid', () => {
      const obj = new ICalendar(testOpts)

      obj.render()

      expect(getUid).toHaveBeenCalledTimes(1)
    })
    it('should call getTimeCreated', () => {
      const obj = new ICalendar(testOpts)

      obj.render()

      expect(getTimeCreated).toHaveBeenCalledTimes(1)
    })
    it('should render an ICS Param string', () => {
      const obj = new ICalendar(testOpts)

      const rendered = obj.render()

      const expected = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'BEGIN:VEVENT',
        'CLASS:PUBLIC',
        `DESCRIPTION:${testOpts.description} formatted 62`,
        `DTSTART:${moment(testOpts.start).format(dtFormat)}`,
        `DTEND:${moment(testOpts.end).format(dtFormat)}`,
        `LOCATION:${testOpts.location} formatted 64`,
        `SUMMARY:${testOpts.title} formatted 66`,
        'TRANSP:TRANSPARENT',
        'RRULE:mockedRrule',
        'END:VEVENT',
        'END:VCALENDAR',
        'UID:24',
        'DTSTAMP:20190502',
        'PRODID:foobar',
      ].join('\n')
      expect(rendered).toBe(expected)
    })
  })
})
