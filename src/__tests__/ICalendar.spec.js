import moment from 'moment'
import { FORMAT } from '../constants'
import { formatText, getUid, getRrule, download } from '../utils/ics'
import { getTimeCreated } from '../utils/time'
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
      start: '2019-07-04T19:00:00.000-05:00',
      end: '2019-07-04T21:00:00.000-05:00',
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
      formatText.mockImplementation((...args) => args.join(' formatted '))
      getUid.mockReturnValue(24)
      
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
      const obj = new ICalendar(baseOpts)

      obj.render()

      expect(formatText).toHaveBeenCalledTimes(3)
      expect(formatText.mock.calls).toEqual([
        [baseOpts.description, 62],
        [baseOpts.location, 64],
        [baseOpts.title, 66],
      ])
    })

    it('should call getUid', () => {
      const obj = new ICalendar(baseOpts)

      obj.render()

      expect(getUid).toHaveBeenCalledTimes(1)
    })

    it('should call getTimeCreated', () => {
      const obj = new ICalendar(baseOpts)

      obj.render()

      expect(getTimeCreated).toHaveBeenCalledTimes(1)
    })

    it.only('should render an ICS Param string', () => {
      const obj = new ICalendar(baseOpts)

      const rendered = obj.render()

      const expected = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'BEGIN:VEVENT',
        'CLASS:PUBLIC',
        `DESCRIPTION:${baseOpts.description} formatted 62`,
        `DTSTART:${moment(baseOpts.start).format(dtFormat)}`,
        `DTEND:${moment(baseOpts.end).format(dtFormat)}`,
        `LOCATION:${baseOpts.location} formatted 64`,
        `SUMMARY:${baseOpts.title} formatted 66`,
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
