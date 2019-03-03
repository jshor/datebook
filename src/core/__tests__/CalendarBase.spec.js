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

  describe('setTimestamps', () => {
  })
})
