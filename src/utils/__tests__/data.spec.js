import { toQueryString } from '../data';

describe('DataUtil', () => {
  let params;
  beforeEach(() => {
    params = {
      text: 'Birthday',
      dates: '20170508/20170509'
    }
  })
  describe('toQueryString()', () => {

    it('should create a query string representation of the passed in object', () => {
      const queryString = toQueryString(params)
      const queryParams = queryString.split('&')
      const paramKeys = Object.keys(params).sort()
      const queryKeys = queryParams.map(param => param.split('=')[0])
      queryKeys.sort()
      expect(queryKeys).toEqual(paramKeys)
    })

    it('should URI encode params', () => {
      const queryString = toQueryString(params)
      const queryParams = queryString.split('&')
      for (let kv of queryParams) {
        const [key, queryValue] = kv.split('=')
        const uriEncodedValue = encodeURIComponent(params[key])

        expect(queryValue).toBe(uriEncodedValue)
      }
    })

    it('should ignore undefined values', () => {
      params.foo = undefined
      const queryString = toQueryString(params)
      const queryParams = queryString.split('&')
      const queryKeys = queryParams.map(param => param.split('=')[0])

      expect(queryKeys).not.toContain('foo')
    })
  })
})
