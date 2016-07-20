function getGoogleCalendarUrl(data) {
  var googleCalendarUrl = 'https://www.google.com/calendar/render?action=TEMPLATE';
  googleCalendarUrl += '&text=' + data.title;
  googleCalendarUrl += '&dates=' + data.startDate + '/' + data.endDate;
  googleCalendarUrl += '&details=' + data.description;
  googleCalendarUrl += '&location=' + data.location;

  return googleCalendarUrl;
}