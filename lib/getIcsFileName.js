function getIcsFileName(title) {
  return title.replace(/[^\w ]+/g, '') + '.ics';
}