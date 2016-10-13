function formatTime(timestamp, inputFormat) {
  var formats = ['YYYYMMDD', 'HHmmss'];

  var date = (function() {
    if(inputFormat) {
      return new moment(timestamp, inputFormat);
    }
    return new moment(timestamp);
  })();

  return formats.map(function(format) {
    return date.format(format);
  }).join('T');
}