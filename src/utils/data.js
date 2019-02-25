/**
 * Creates a query string from a flat key-value pair.
 *
 * @param {Object} params
 * @returns {String}
 */
export const toQueryString = (params) => {
  const queryString = []
  
  for (let key in params) {
    if (params.hasOwnProperty(key) && params[key] !== undefined) {
      queryString.push(`${key}=${encodeURIComponent(params[key])}`)
    }
  }
  
  return queryString.join('&')
}