function formatTime(timestamp, format) {
  var formats = ['YYYYMMDD', 'HHmmss'];

  var date = (function() {
    if(format) {
      return new moment(timestamp, format);
    }
    return new moment(timestamp);
  })();

  return formats.map(function(format) {
    return date.format(format);
  }).join('T');
}