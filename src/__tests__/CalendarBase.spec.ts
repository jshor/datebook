import CalendarBase from '../CalendarBase'
import time from '../utils/time'
import IOptions from '../interfaces/IOptions'

describe('Calendar Base', () => {
  let baseOpts: IOptions

  beforeEach(() => {
    baseOpts = {
      title: 'Test Event',
      start: new Date('2019-03-23T17:00:00.000'),
      end: new Date('2019-03-23T21:00:00.000')
    }
  })

  // afterEach(() => jest.resetAllMocks()) // TODO: need this, but it breaks tests... code smell

  describe('constructor()', () => {
    it('should call setText and setTimestamps with passed in options', () => {
      jest.spyOn(CalendarBase.prototype, 'setText')
      jest.spyOn(CalendarBase.prototype, 'setTimestamps')

      const testObj = new CalendarBase(baseOpts)

      expect(testObj.setText).toHaveBeenCalledTimes(1)
      expect(testObj.setTimestamps).toHaveBeenCalledTimes(1)
    })
  })

  describe('setText()', () => {
    let calendarObj: CalendarBase

    beforeEach(() => {
      calendarObj = new CalendarBase(baseOpts)
    })

    it('should default to a blank string if options are falsey', () => {
      calendarObj.setText({
        start: baseOpts.start
      })

      expect(calendarObj.description).toBe('')
      expect(calendarObj.title).toBe('')
      expect(calendarObj.location).toBe('')
    })

    it('should set the description', () => {
      const testOpts: IOptions = {
        ...baseOpts,
        description: 'Descriptive Text'
      }
      calendarObj.setText(testOpts)

      expect(calendarObj.description).toBe(testOpts.description)
    })

    it('should set the title', () => {
      const testOpts: IOptions = {
        ...baseOpts,
        title: 'Meeting with Jeff'
      }
      calendarObj.setText(testOpts)

      expect(calendarObj.title).toBe(testOpts.title)
    })

    it('should set the location', () => {
      const testOpts: IOptions = {
        ...baseOpts,
        location: 'New York'
      }
      calendarObj.setText(testOpts)

      expect(calendarObj.location).toBe(testOpts.location)
    })

    it('should set all texts', () => {
      const testOpts: IOptions = {
        ...baseOpts,
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
    let calendarObj: CalendarBase

    beforeEach(() => {
      calendarObj = new CalendarBase(baseOpts)
    })

    it('should set the recurrence', () => {
      const testOpts: IOptions = {
        ...baseOpts,
        recurrence: {
          weekstart: 'MO'
        }
      }

      calendarObj.setTimestamps(testOpts)

      expect(calendarObj.recurrence).toBe(testOpts.recurrence)
    })

    describe('when options has no end', () => {

      it('should set allday to true', () => {
        calendarObj.setTimestamps({
          start: new Date('2019-03-23T17:00:00.000'),
          end: ''
        })

        expect(calendarObj.allday).toBe(true)
      })

      xit('should set the end using the start + 1 day', () => {
        const testOpts: IOptions = {
          start: new Date('2019-03-23T17:00:00.000')
        }

        calendarObj.setTimestamps(testOpts)

        expect(calendarObj.start.toString())
          .toEqual(testOpts.start.toString())
        expect(calendarObj.end.toString())
          .toEqual(time.incrementDate(testOpts.start, 1).toString())
      })
    })

    describe('when options has an end', () => {
      it('should set allday to false', () => {
        calendarObj.setTimestamps({
          start: new Date('2019-03-23T17:00:00.000'),
          end: new Date('2019-03-23T21:00:00.000')
        })

        expect(calendarObj.allday).toBe(false)
      })

      it('should set the start and end including the time of day', () => {
        const testOpts: IOptions = {
          start: new Date('2019-03-23T17:00:00.000'),
          end: new Date('2019-03-23T21:00:00.000')
        }

        calendarObj.setTimestamps(testOpts)

        expect(calendarObj.start).toEqual(testOpts.start)
        expect(calendarObj.end).toEqual(testOpts.end)
      })
    })
  })
})
