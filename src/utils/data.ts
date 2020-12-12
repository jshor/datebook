const identity = (str: string): string => str

type Identity = (str: string) => string

/**
 * Creates a param string from a flat key-value pair.
 *
 * @param {Record<string, string>} params
 * @param {string} [delimiter = ';']
 * @param {Function} [transformFn = identity] - transformation function to be applied to each param
 * @returns {string}
 */
const toParamString = (params: Record<string, string>, delimiter = ';', transformFn: Identity = identity): string => {
  const paramString = []

  for (const key in params) {
    if (params.hasOwnProperty(key) && params[key] !== undefined) {
      paramString.push(`${key}=${transformFn(params[key])}`)
    }
  }

  return paramString.join(delimiter)
}

/**
 * Creates a query string from a flat key-value pair.
 *
 * @param {Record<string, string | null>} params
 * @returns {string}
 */
const toQueryString = (params: Record<string, string | null>): string => {
  // filter the record set to remove null values
  const filteredParams = Object
    .keys(params)
    .filter(p => params[p] !== null)
    .reduce((p: Record<string, string>, k: string) => ({
      ...p,
      [k]: params[k] as string
    }), {})

  return toParamString(filteredParams, '&', encodeURIComponent)
}

/**
 * Creates an ICS param string from a flat key-value pair.
 *
 * @param {Record<string, string>} params
 * @returns {string}
 */
const toIcsParamString = (params: Record<string, string>): string => {
  return toParamString(params, ';')
}

/**
 * Converts the given string to ProperCase.
 *
 * @param {string} s
 * @returns {string}
 */
const toProperCase = (s: string): string => {
  return [
    s[0].toUpperCase(),
    s.slice(-s.length + 1).toLowerCase()
  ].join('')
}

export default {
  toParamString,
  toQueryString,
  toIcsParamString,
  toProperCase
}
