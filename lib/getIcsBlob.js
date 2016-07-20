/**
 * The name of the file will be the event title with alphanumeric chars
 * having the extension `.ics`.
 */
function getIcsBlob(icsData) {
  return new Blob([icsData], {
    type: 'application/octet-stream'
  });
}