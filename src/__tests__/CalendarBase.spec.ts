import CalendarBase from '../CalendarBase'
import time from '../utils/time'
import CalendarOptions from '../types/CalendarOptions'

class ExtendedCalendar extends CalendarBase {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setInitialParams = () => {}
  render = () => ''
  getParams = () => ({
    title: this.title,
    location: this.location,
    description: this.description,
    start: this.start,
    end: this.end,
    isAllDay: this.isAllDay,
    recurrence: this.recurrence
  })
}

describe('Calendar Base', () => {
  const baseOpts: CalendarOptions = {
    title: 'Test Event',
    start: new Date('2019-03-23T17:00:00.000'),
    end: new Date('2019-03-23T21:00:00.000')
  }

  afterEach(() => jest.clearAllMocks())

  describe('setText()', () => {
    it('should default to a blank string if options are falsey', () => {
      const testOpts: CalendarOptions = {
        ...baseOpts,
        title: undefined
      }
      const resultParams = (new ExtendedCalendar(testOpts)).getParams()

      expect(resultParams.description).toBe('')
      expect(resultParams.title).toBe('')
      expect(resultParams.location).toBe('')
    })

    it('should set the description', () => {
      const testOpts: CalendarOptions = {
        ...baseOpts,
        description: 'Descriptive Text'
      }
      const resultParams = (new ExtendedCalendar(testOpts)).getParams()

      expect(resultParams.description).toBe(testOpts.description)
    })

    it('should set the title', () => {
      const testOpts: CalendarOptions = {
        ...baseOpts,
        title: 'Meeting with Jeff'
      }
      const resultParams = (new ExtendedCalendar(testOpts)).getParams()

      expect(resultParams.title).toBe(testOpts.title)
    })

    it('should set the location', () => {
      const testOpts: CalendarOptions = {
        ...baseOpts,
        location: 'New York'
      }
      const resultParams = (new ExtendedCalendar(testOpts)).getParams()

      expect(resultParams.location).toBe(testOpts.location)
    })

    it('should set all texts', () => {
      const testOpts: CalendarOptions = {
        ...baseOpts,
        description: 'Descriptive Text',
        title: 'Meeting with Jeff',
        location: 'New York'
      }
      const resultParams = (new ExtendedCalendar(testOpts)).getParams()

      expect(resultParams.description).toBe(testOpts.description)
      expect(resultParams.title).toBe(testOpts.title)
      expect(resultParams.location).toBe(testOpts.location)
    })
  })

  describe('setTimestamps()', () => {
    it('should set the recurrence', () => {
      const testOpts: CalendarOptions = {
        ...baseOpts,
        recurrence: {
          weekstart: 'MO'
        }
      }
      const resultParams = (new ExtendedCalendar(testOpts)).getParams()

      expect(resultParams.recurrence).toBe(testOpts.recurrence)
    })

    describe('when options has no end', () => {
      it('should set `isAllDay` to true', () => {
        const testOpts = {
          ...baseOpts,
          start: new Date('2019-03-23T17:00:00.000'),
          end: undefined
        }
        const resultParams = (new ExtendedCalendar(testOpts)).getParams()

        expect(resultParams.isAllDay).toBe(true)
      })

      it('should set the end using the start + 1 day', () => {
        const testOpts: CalendarOptions = {
          ...baseOpts,
          start: new Date('2019-03-23T17:00:00.000'),
          end: undefined
        }
        const resultParams = (new ExtendedCalendar(testOpts)).getParams()

        expect(resultParams.start.toString())
          .toEqual(testOpts.start.toString())
        expect(resultParams.end.toString())
          .toEqual(time.incrementDate(testOpts.start, 1).toString())
      })
    })

    describe('when options has an end', () => {
      it('should set allday to false', () => {
        const testOpts = {
          start: new Date('2019-03-23T17:00:00.000'),
          end: new Date('2019-03-23T21:00:00.000')
        }
        const resultParams = (new ExtendedCalendar(testOpts)).getParams()

        expect(resultParams.isAllDay).toBe(false)
      })

      it('should set the start and end including the time of day', () => {
        const testOpts: CalendarOptions = {
          start: new Date('2019-03-23T17:00:00.000'),
          end: new Date('2019-03-23T21:00:00.000')
        }
        const resultParams = (new ExtendedCalendar(testOpts)).getParams()

        expect(resultParams.start).toEqual(testOpts.start)
        expect(resultParams.end).toEqual(testOpts.end)
      })
    })
  })
})
