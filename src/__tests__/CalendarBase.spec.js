import CalendarBase from '../CalendarBase'
import { incrementDate } from '../utils/time'

describe('Calendar Base', () => {
  let baseOpts

  beforeEach(() => {
    baseOpts = {
      title: 'Test Event',
      start: new Date('2019-03-23T17:00:00.000'),
      end: new Date('2019-03-23T21:00:00.000')
    }
  })

  describe('constructor()', () => {
    let setTextSpy, setTimestampsSpy
    
    beforeEach(() => {
      setTextSpy = jest.spyOn(CalendarBase.prototype, 'setText')
      setTimestampsSpy = jest.spyOn(CalendarBase.prototype, 'setTimestamps')
    })

    afterEach(() => {
      setTextSpy.mockClear()
      setTimestampsSpy.mockClear()
    })

    it('should call setText and setTimestamps with passed in options', () => {
      const testObj = new CalendarBase(baseOpts)

      expect(testObj.setText).toHaveBeenCalledTimes(1)
      expect(testObj.setTimestamps).toHaveBeenCalledTimes(1)
    })
  })

  describe('setText()', () => {
    let calendarObj

    beforeEach(() => {
      calendarObj = new CalendarBase(baseOpts)
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
    const oneDay = 24 * 360 * 1000 // one day in UNIX time
    let calendarObj

    beforeEach(() => {
      calendarObj = new CalendarBase(baseOpts)
    })

    it('should set the recurrence', () => {
      const testOpts = {
        ...baseOpts,
        recurrence: {
          weekst: 'MO'
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

      it('should set the end using the start + 1 day', () => {
        const testOpts = {
          start: new Date('2019-03-23T17:00:00.000'),
          end: ''
        }

        calendarObj.setTimestamps(testOpts)

        expect(calendarObj.start.toString())
          .toEqual(testOpts.start.toString())
        expect(calendarObj.end.toString())
          .toEqual(incrementDate(testOpts.start, 1).toString())
      })

      it('should set the start and end without the time of day', () => {
        const testOpts = {
          start: new Date('2019-03-23T17:00:00.000'),
          end: ''
        }

        calendarObj.setTimestamps(testOpts)

        expect(calendarObj.start.toString())
          .toEqual(testOpts.start.toString())
        expect(calendarObj.end.toString())
          .toEqual(incrementDate(testOpts.start, 1).toString())
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
        const testOpts = {
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
