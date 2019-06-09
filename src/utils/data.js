const identity = str => str

/**
 * Creates a param string from a flat key-value pair.
 *
 * @param {Object} params
 * @param {String} [delimiter = ';']
 * @param {Function} [transformFn = identity] - transformation function to be
 * applied to each param. If omitted, no transform occurs
 * @returns {String}
 */
export const toParamString = (params, delimiter = ';', transformFn = identity) => {
  const paramString = []

  for (let key in params) {
    if (params.hasOwnProperty(key) && params[key] !== undefined) {
      paramString.push(`${key}=${transformFn(params[key])}`)
    }
  }

  return paramString.join(delimiter)
}

/**
 * Creates a query string from a flat key-value pair.
 *
 * @param {Object} params
 * @returns {String}
 */
export const toQueryString = params => toParamString(params, '&', encodeURIComponent)

/**
 * Creates an ICS param string from a flat key-value pair.
 *
 * @param {Object} params
 * @returns {String}
 */
export const toIcsParamString = params => toParamString(params, ';')
