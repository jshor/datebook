import { toIcsParamString, toParamString, toQueryString } from '../data';

describe('DataUtil', () => {
  let params;

  beforeEach(() => {
    params = {
      text: 'Birthday',
      dates: '20170508/20170509'
    }
  })

  describe('toIcsParamString()', () => {
    it('should create a semicolon-delimited string of params', () => {
      const icsParamString = toIcsParamString(params)
      const icsParams = icsParamString
        .split(';')
        .reduce((acc, kv) => {
          const [k, v] = kv.split('=')
          return {
            ...acc,
            [k]: v
          }
        }, {})

      expect(icsParams).toEqual(params)
    })

    it('should ignore undefined values', () => {
      params.foo = undefined
      const icsParamString = toIcsParamString(params)
      const icsParams = icsParamString.split(';')
      const icsParamKeys = icsParams.map(param => param.split('=')[0])

      expect(icsParamKeys).not.toContain('foo')
    })
  })

  describe('toParamString()', () => {
    describe('without optional params', () => {
      it('should create a semicolon-delimited string of params', () => {
        const paramString = toParamString(params)
        const parsedParams = paramString
          .split(';')
          .reduce((acc, kv) => {
            const [k, v] = kv.split('=')
            return {
              ...acc,
              [k]: v
            }
          }, {})

        expect(parsedParams).toEqual(params)
      })

      it('should ignore undefined values', () => {
        params.foo = undefined
        const paramString = toParamString(params)
        const parsedParams = paramString.split(';')
        const parsedParamKeys = parsedParams.map(param => param.split('=')[0])

        expect(parsedParamKeys).not.toContain('foo')
      })
    })

    describe('with defined delimiter', () => {
      const delimiter = '&&'

      it('should use the provided delimiter', () => {
        const paramString = toParamString(params, delimiter)
        const parsedParams = paramString
          .split(delimiter)
          .reduce((acc, kv) => {
            const [k, v] = kv.split('=')
            return {
              ...acc,
              [k]: v
            }
          }, {})

        expect(parsedParams).toEqual(params)
      })

      describe('with defined transformFn', () => {
        const sillyTransform = str => str.split('').join('AAA')
        const sillyUntransform = str => str.split('AAA').join('')

        it('should use the provided delimiter and transformFn', () => {
          const paramString = toParamString(params, delimiter, sillyTransform)
          const parsedParams = paramString
            .split(delimiter)
            .reduce((acc, kv) => {
              const [k, v] = kv.split('=')
              return {
                ...acc,
                [k]: sillyUntransform(v)
              }
            }, {})

          expect(parsedParams).toEqual(params)
        })
      })
    })
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
