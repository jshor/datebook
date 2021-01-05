import data from '../data'

describe('DataUtil', () => {
  let params: Record<string, string>

  beforeEach(() => {
    params = {
      text: 'Birthday',
      dates: '20170508/20170509'
    }
  })

  afterEach(() => jest.resetAllMocks())

  describe('toIcsParamString()', () => {
    it('should create a semicolon-delimited string of params', () => {
      const icsParamString = data.toIcsParamString(params)
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
      delete params.foo
      const icsParamString = data.toIcsParamString(params)
      const icsParams = icsParamString.split(';')
      const icsParamKeys = icsParams.map(param => param.split('=')[0])

      expect(icsParamKeys).not.toContain('foo')
    })
  })

  describe('toParamString()', () => {
    describe('without optional params', () => {
      it('should create a semicolon-delimited string of params', () => {
        const paramString = data.toParamString(params)
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
        delete params.foo
        const paramString = data.toParamString(params)
        const parsedParams = paramString.split(';')
        const parsedParamKeys = parsedParams.map(param => param.split('=')[0])

        expect(parsedParamKeys).not.toContain('foo')
      })
    })

    describe('with defined delimiter', () => {
      const delimiter = '&&'

      it('should use the provided delimiter', () => {
        const paramString = data.toParamString(params, delimiter)
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
        const transform = (str: string) => str.split('').join('AAA')
        const untransform = (str: string) => str.split('AAA').join('')

        it('should use the provided delimiter and transformFn', () => {
          const paramString = data.toParamString(params, delimiter, transform)
          const parsedParams = paramString
            .split(delimiter)
            .reduce((acc, kv) => {
              const [k, v] = kv.split('=')
              return {
                ...acc,
                [k]: untransform(v)
              }
            }, {})

          expect(parsedParams).toEqual(params)
        })
      })
    })
  })

  describe('toMailtoList()', () => {
    it('should render a list of MAILTO URIs', () => {
      const mailtoList = data.toMailtoList([
        {
          name: 'John Doe',
          email: 'john@doe.com',
          icsOptions: {
            rsvp: true
          }
        },
        {
          name: 'Jane Doe',
          email: 'jane@doe.com'
        }
      ])

      expect(mailtoList).toHaveLength(2)
      expect(mailtoList).toContain('John Doe <john@doe.com>')
      expect(mailtoList).toContain('Jane Doe <jane@doe.com>')
    })

    it('should render an attendee as just the email if the name is not present', () => {
      const mailtoList = data.toMailtoList([
        {
          email: 'john@doe.com'
        },
        {
          name: 'Jane Doe',
          email: 'jane@doe.com'
        }
      ])

      expect(mailtoList).toContain('john@doe.com')
      expect(mailtoList).toContain('Jane Doe <jane@doe.com>')
    })
  })

  describe('toQueryString()', () => {

    it('should create a query string representation of the passed in object', () => {
      const queryString = data.toQueryString(params)
      const queryParams = queryString.split('&')
      const paramKeys = Object.keys(params).sort()
      const queryKeys = queryParams.map(param => param.split('=')[0])
      queryKeys.sort()
      expect(queryKeys).toEqual(paramKeys)
    })

    it('should URI encode params', () => {
      const queryString = data.toQueryString(params)
      const queryParams = queryString.split('&')
      for (const kv of queryParams) {
        const [key, queryValue] = kv.split('=')
        const uriEncodedValue = encodeURIComponent(params[key])

        expect(queryValue).toBe(uriEncodedValue)
      }
    })

    it('should ignore undefined values', () => {
      delete params.foo
      const queryString = data.toQueryString(params)
      const queryParams = queryString.split('&')
      const queryKeys = queryParams.map(param => param.split('=')[0])

      expect(queryKeys).not.toContain('foo')
    })
  })
})
