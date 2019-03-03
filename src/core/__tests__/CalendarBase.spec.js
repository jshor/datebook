import moment from 'moment'
import { FORMAT } from '../../constants'
import CalendarBase from '../CalendarBase'

describe('Calendar Base', () => {
  it('should be ok', () => {
    expect((new CalendarBase({}))).toBeTruthy()
  })

  describe('setText()', () => {
    let calendarObj

    beforeEach(() => {
      calendarObj = new CalendarBase({})
    })

    it('should default to a blank string if options are falsey', () => {
      calendarObj.setText({})

      expect(calendarObj.description).toBe('')
      expect(calendarObj.title).toBe('')
      expect(calendarObj.location).toBe('')
    })

    it('should set the description', () => {
      const testOpts = {
        description: 'Descriptive Text'
      }
      calendarObj.setText(testOpts)

      expect(calendarObj.description).toBe(testOpts.description)
    })

    it('should set the title', () => {
      const testOpts = {
        title: 'Meeting with Jeff'
      }
      calendarObj.setText(testOpts)

      expect(calendarObj.title).toBe(testOpts.title)
    })

    it('should set the location', () => {
      const testOpts = {
        location: 'New York'
      }
      calendarObj.setText(testOpts)

      expect(calendarObj.location).toBe(testOpts.location)
    })

    it('should set all texts', () => {
      const testOpts = {
        description: 'Descriptive Text',
        title: 'Meeting with Jeff',
        location: 'New York'
      }
      calendarObj.setText(testOpts)

      expect(calendarObj.description).toBe(testOpts.description)
      expect(calendarObj.title).toBe(testOpts.title)
      expect(calendarObj.location).toBe(testOpts.location)
    })
  })

  describe('setTimestamps()', () => {
    const dateFormat = FORMAT.DATE
    let calendarObj

    beforeEach(() => {
      calendarObj = new CalendarBase({})
    })

    it('should set the recurrence', () => {
      const testOpts = {
        recurrence: {}
      }

      calendarObj.setTimestamps(testOpts)

      expect(calendarObj.recurrence).toBe(testOpts.recurrence)
    })

    describe('when options has no end', () => {

      it('should set allday to true', () => {
        calendarObj.setTimestamps({
          start: '20150704T190000',
          end: ''
        });

        expect(calendarObj.allday).toBe(true);
      })

      it('should set the end using the start + 1 day', () => {
        const testOpts = {
          start: '20150704T190000',
          end: ''
        }

        const expectedEnd = moment(testOpts.start)
          .add(1, 'days')
          .format(dateFormat)

        calendarObj.setTimestamps(testOpts)
        expect(calendarObj.end).toBe(expectedEnd)
      })

      it('should set the start and end without the time of day', () => {
        const dateTimeFormat = `${dateFormat}T${FORMAT.TIME}`
        const testOpts = {
          start: '20150704T190000',
          end: ''
        }

        const expectedStart = moment(testOpts.start).format(dateFormat)
        const expectedEnd = moment(testOpts.start)
          .add(1, 'days')
          .format(dateFormat)

        calendarObj.setTimestamps(testOpts)

        expect(calendarObj.start).toBe(expectedStart)
        expect(calendarObj.end).toBe(expectedEnd)
      })
    })

    describe('when options has an end', () => {

      it('should set allday to false', () => {
        calendarObj.setTimestamps({
          start: '20150704T190000',
          end: '20150704T200000'
        });

        expect(calendarObj.allday).toBe(false);
      })

      it('should set the start and end including the time of day', () => {
        const dateTimeFormat = `${dateFormat}T${FORMAT.TIME}`
        const testOpts = {
          start: '20150704T190000',
          end: '20150704T220000'
        }

        const expectedStart = moment(testOpts.start).format(dateTimeFormat)
        const expectedEnd = moment(testOpts.end).format(dateTimeFormat)

        calendarObj.setTimestamps(testOpts)

        expect(calendarObj.start).toBe(expectedStart)
        expect(calendarObj.end).toBe(expectedEnd)
      })
    })
  })
})
