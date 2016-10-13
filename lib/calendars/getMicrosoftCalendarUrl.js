function getMicrosoftCalendarUrl(data) {
  var microsoftCalendarUrl = 'http://calendar.live.com/calendar/calendar.aspx?rru=addevent';
  microsoftCalendarUrl += '&summary=' + data.title;
  microsoftCalendarUrl += '&dtstart=' + data.startDate + '&dtend=' + data.endDate;
  microsoftCalendarUrl += '&description=' + data.description;
  microsoftCalendarUrl += '&location=' + data.location;

  return microsoftCalendarUrl;
}