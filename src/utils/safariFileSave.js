/**
 * Downloads the given ics. Meant to be used only for Safari.
 *
 * @param {String} data - ics data
 * @param {String} fileName - file name to save, ending in .ics
 */
const safariFileSave = (data, fileName) => {
  const anchor = document.createElement('a');
  const encodedData = encodeURIComponent(data)

  anchor.setAttribute('href', `data:text/calendar;charset=utf-8,${encodedData}`)
  anchor.setAttribute('download', fileName)

  if (document.createEvent) {
    const event = document.createEvent('MouseEvents')

    event.initEvent('click', true, true)
    anchor.dispatchEvent(event)
  } else {
    anchor.click()
  }
}

export default safariFileSave
