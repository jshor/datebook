import { FORMAT } from '../constants'
import { formatText, getUid, getProdId, download } from '../utils/ics'
import { formatTimestampString, getTimeCreated } from '../utils/time'
import CalendarBase from '../CalendarBase'
import ICalendar from '../ICalendar'

jest.mock('../utils/ics')

describe('ICalendar', () => {
  let baseOpts

  beforeEach(() => {
    baseOpts = {
      title: 'Fun Party',
      description: 'BYOB',
      location: 'New York',
      start: new Date('2019-07-04T19:00:00.000'),
      end: new Date('2019-07-04T21:00:00.000'),
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be a subclass of CalendarBase', () => {
    const result = new ICalendar(baseOpts)

    expect(result).toBeInstanceOf(CalendarBase)
  })

  describe('download()', () => {
    it('should call render and the download util', () => {
      const obj = new ICalendar(baseOpts)

      jest.spyOn(obj, 'render').mockReturnValue('renderedstring')
      obj.download()

      expect(obj.render).toHaveBeenCalledTimes(1)

      const rendered = obj.render.mock.results[0].value
      expect(download).toHaveBeenCalledTimes(1)
      expect(download).toHaveBeenCalledWith(obj.title, rendered)
    })
  })

  describe('render()', () => {
    const originalWindow = global.window
    const dtFormat = `${FORMAT.DATE}T${FORMAT.TIME}`

    beforeEach(() => {
      formatText.mockImplementation(s => s)
      getUid.mockReturnValue(24)
      getProdId.mockReturnValue('foobar')
    })

    afterEach(() => {
      Object.defineProperty(global, 'window', {
        value: originalWindow,
        writable: true,
      })
    })

    it('should format the description, location, and title with the sanitize function', () => {
      const obj = new ICalendar(baseOpts)

      obj.render()

      expect(formatText).toHaveBeenCalledTimes(3)
      expect(formatText.mock.calls).toEqual([
        [baseOpts.description],
        [baseOpts.location],
        [baseOpts.title]
      ])
    })

    it('should contain the RRULE parameter if a recurrence was specified', () => {
      const obj = new ICalendar({
        ...baseOpts,
        recurrence: {
          frequency: 'WEEKLY',
          interval: 2
        }
      })

      expect(obj.render()).toContain('RRULE:')
    })

    it('should call getUid', () => {
      const obj = new ICalendar(baseOpts)

      obj.render()

      expect(getUid).toHaveBeenCalledTimes(1)
    })

    it('should render an ICS Param string', () => {
      const obj = new ICalendar(baseOpts)

      const rendered = obj.render()

      const expected = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'BEGIN:VEVENT',
        'CLASS:PUBLIC',
        `DESCRIPTION:${baseOpts.description}`,
        `DTSTART:${formatTimestampString(new Date(baseOpts.start), dtFormat)}`,
        `DTEND:${formatTimestampString(new Date(baseOpts.end), dtFormat)}`,
        `LOCATION:${baseOpts.location}`,
        `SUMMARY:${baseOpts.title}`,
        'TRANSP:TRANSPARENT',
        'END:VEVENT',
        'END:VCALENDAR',
        'UID:24',
        `DTSTAMP:${getTimeCreated()}`,
        'PRODID:foobar'
      ].join('\n')
      expect(rendered).toBe(expected)
    })
  })
})
