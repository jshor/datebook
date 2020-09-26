import safariFileSave from '../safariFileSave'

const documentMock = {
  createElement: jest.fn().mockImplementation(tagName => {
    const tag: any = {
      tagName,
      attrs: {},
      click: jest.fn(),
      dispatchEvent: jest.fn(),
      setAttribute: (key: any, val: any) => {
        tag.attrs[key] = val
      }
    }
    return tag
  }),
  createEvent: jest.fn().mockImplementation(eventNS => ({
      namespace: eventNS,
      initEvent: jest.fn()
    }))
}

const fileName = 'event.ics'
const data = 'FOO=BAR;UNTIL=2019-05-23T18:00:00'

describe('safariFileSave()', () => {
  const originalDocument = global.document

  beforeEach(() => {
    Object.defineProperty(global, 'document', {
      writable: true,
      value: {...documentMock}
    })
  })

  afterEach(() => {
    documentMock.createElement.mockClear()
    documentMock.createEvent.mockClear()
    Object.defineProperty(global, 'document', {
      writable: true,
      value: originalDocument
    })
  })

  it('should create an anchor tag with the passed in params', () => {
    const createElement = document.createElement as any

    safariFileSave(data, fileName)

    expect(document.createElement).toHaveBeenCalledTimes(1)

    const anchor = createElement.mock.results[0].value

    expect(anchor.attrs.href).toBe(`data:text/calendar;charset=utf-8,${
      encodeURIComponent(data)
    }`)
    expect(anchor.attrs.download).toBe(fileName)
  })

  describe('if document.createEvent is defined', () => {
    it('should download the file using the createEvent method', () => {
      const createElement = document.createElement as any
      const createEvent = document.createEvent as any

      safariFileSave(data, fileName)
      const anchor = createElement.mock.results[0].value

      expect(document.createEvent).toHaveBeenCalledTimes(1)
      const event = createEvent.mock.results[0].value

      expect(event.namespace).toBe('MouseEvents')
      expect(event.initEvent).toHaveBeenCalledTimes(1)
      expect(event.initEvent).toHaveBeenCalledWith('click', true, true)

      expect(anchor.dispatchEvent).toHaveBeenCalledTimes(1)
      expect(anchor.dispatchEvent).toHaveBeenCalledWith(event)
      expect(anchor.click).not.toHaveBeenCalled()
    })
  })
})
