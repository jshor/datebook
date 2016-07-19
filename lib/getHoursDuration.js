function getMilitaryHours(hours) {
  if(hours < 10) {
    hours = '0' + hours;
  }
  return hours + '00';
}

function getHoursDuration(startDate, endDate, timezone) {
  var start = new moment(startDate);
  var end = new moment(endDate);

  if(timezone) {
    start.utcOffset(timezone);
    end.utcOffset(timezone);
  }

  var hours = moment
    .duration(end.diff(start))
    .asHours();

  return getMilitaryHours(hours);
}