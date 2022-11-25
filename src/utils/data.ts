import CalendarAttendee from '../types/CalendarAttendee'

/**
 * Creates a param string from a flat key-value pair.
 *
 * @param {Record<string, string>} params
 * @param {string} [delimiter = ';']
 * @param {Function} [transformFn] - transformation function to be applied to each param
 * @returns {string}
 */
const toParamString = (
  params: Record<string, string>,
  delimiter = ';',
  transformFn: (s: string) => string = s => s
): string => {
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
 * Renders a comma-separated string of mailto values.
 * (e.g., 'John Doe <john@doe.com>,Jane Doe <jane@doe.com>')
 *
 * @param {CalendarAttendee[]} attendees
 * @returns {string[]}
 */
const toMailtoList = (attendees: CalendarAttendee[]): string[] => {
  return attendees
    .map(({ email, name }) => {
      return name
        ? `${name} <${email}>`
        : email
    })
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
  toMailtoList,
  toProperCase
}
