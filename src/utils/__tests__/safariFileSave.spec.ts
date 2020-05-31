import safariFileSave from '../safariFileSave'
import { mocked } from 'ts-jest/utils'

const documentMock = {
  createElement: mocked(tagName => {
    const tag = {
      tagName,
      attrs: {},
      click: jest.fn(),
      dispatchEvent: jest.fn()
    }
    tag.setAttribute = (key, val) => {
      tag.attrs[key] = val
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
  let fakeDocument
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
      value: originalDocument,
    })
  })

  it('should create an anchor tag with the passed in params', () => {
    safariFileSave(data, fileName)
    expect(document.createElement).toHaveBeenCalledTimes(1)
    const anchor = document.createElement.mock.results[0].value

    expect(anchor.attrs.href).toBe(`data:text/calendar;charset=utf-8,${
      encodeURIComponent(data)
    }`)
    expect(anchor.attrs.download).toBe(fileName)
  })

  describe('if document.createEvent is defined', () => {
    it('should download the file using the createEvent method', () => {
      safariFileSave(data, fileName)
      const anchor = document.createElement.mock.results[0].value

      expect(document.createEvent).toHaveBeenCalledTimes(1)
      const event = document.createEvent.mock.results[0].value

      expect(event.namespace).toBe('MouseEvents')
      expect(event.initEvent).toHaveBeenCalledTimes(1)
      expect(event.initEvent).toHaveBeenCalledWith('click', true, true)

      expect(anchor.dispatchEvent).toHaveBeenCalledTimes(1)
      expect(anchor.dispatchEvent).toHaveBeenCalledWith(event)
      expect(anchor.click).not.toHaveBeenCalled()
    })
  })

  describe('if document.createEvent is not defined', () => {
    it('should download the file using anchor.click', () => {
      global.document.createEvent = false
      safariFileSave(data, fileName)
      const anchor = document.createElement.mock.results[0].value

      expect(anchor.click).toHaveBeenCalledTimes(1)
    })
  })
})
