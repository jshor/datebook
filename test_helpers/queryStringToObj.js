/*
 * Converts a query string to an object representation
 * @param {string} queryString
 * @returns {object}
 */

const queryStringToObj = (queryString) => {
  const params = {}
  const splitQuery = queryString.split('&')

  for (let queryParam of splitQuery) {
    const [ key, val ] = queryParam.split('=')
    if (!params.hasOwnProperty(key) || params[key] !== undefined) {
      params[key] = decodeURIComponent(val)
    }
  }

  return params
}

export default queryStringToObj
