import CalendarBase from '../CalendarBase'

describe('Calendar Base', () => {
  it('should be ok', () => {
    expect((new CalendarBase({}))).toBeTruthy()
  })
})