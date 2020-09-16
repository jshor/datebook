import CalendarBase from '../CalendarBase'
import ICalendar from '../ICalendar'
import IOptions from '../interfaces/IOptions'
import ics from '../utils/ics'
import time  from '../utils/time'
import { FORMAT } from '../constants'

describe('ICalendar', () => {
  const baseOpts: IOptions = {
    title: 'Fun Party',
    description: 'BYOB',
    location: 'New York',
    start: new Date('2019-07-04T19:00:00.000'),
    end: new Date('2019-07-04T21:00:00.000')
  }

  afterEach(() => jest.resetAllMocks())

  it('should be a subclass of CalendarBase', () => {
    const result = new ICalendar(baseOpts)

    expect(result).toBeInstanceOf(CalendarBase)
  })

  describe('download()', () => {
    it('should call render and the download util', () => {
      const obj = new ICalendar(baseOpts)
      const mockRender = 'renderedstring'

      jest
        .spyOn(ics, 'download')
        .mockImplementation(jest.fn())
      jest
        .spyOn(obj, 'render')
        .mockReturnValue(mockRender)

      obj.download()

      expect(obj.render).toHaveBeenCalledTimes(1)
      expect(ics.download).toHaveBeenCalledTimes(1)
      expect(ics.download).toHaveBeenCalledWith(obj.title, mockRender)
    })
  })

  describe('render()', () => {
    const mockUuid = 'mock-uuid-1234'

    beforeEach(() => {
      jest
        .spyOn(ics, 'formatText')
        .mockImplementation(s => s || '')
      jest
        .spyOn(ics, 'getUid')
        .mockReturnValue(mockUuid)
      jest
        .spyOn(ics, 'getProdId')
        .mockReturnValue('foobar')
    })

    afterEach(() => {
      Object.defineProperty(global, 'window', {
        writable: true
      })
    })

    it('should format the description, location, and title with the sanitize function', () => {
      const obj = new ICalendar(baseOpts)

      obj.render()

      expect(ics.formatText).toHaveBeenCalledTimes(3)
      expect(ics.formatText).toHaveBeenCalledWith(baseOpts.description)
      expect(ics.formatText).toHaveBeenCalledWith(baseOpts.location)
      expect(ics.formatText).toHaveBeenCalledWith(baseOpts.title)
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

      expect(ics.getUid).toHaveBeenCalledTimes(1)
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
        `DTSTART:${time.formatTimestampString(new Date(baseOpts.start), FORMAT.FULL)}`,
        `DTEND:${time.formatTimestampString(new Date(baseOpts.end), FORMAT.FULL)}`,
        `LOCATION:${baseOpts.location}`,
        `SUMMARY:${baseOpts.title}`,
        'TRANSP:TRANSPARENT',
        'END:VEVENT',
        'END:VCALENDAR',
        `UID:${mockUuid}`,
        `DTSTAMP:${time.getTimeCreated()}`,
        'PRODID:foobar'
      ].join('\n')

      expect(rendered).toBe(expected)
    })
  })
})
