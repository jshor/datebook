/* universal timestamp format */
const dateRegex = '[0-9]{8}T[0-9]{6}';

/* military hours format */
const militaryHoursRegex = '(0[0-9]|1([0-2]))([0-9]{2})';

/**
 * Escapes a string so it is treated literally in regex.
 * 
 * @param  {String} s  string to escape
 * @return {String}    escape string
 */
const escapeRegex = s => {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

/**
 * Returns a regular expression for a calendar service url.
 * 
 * @param  {String} baseUrl   the host name of the calendar service
 * @param  {Object} urlParams query string parameters to send
 * @return {RegExp}           regular expression of cal. service url
 */
const getUrlRegex = (baseUrl, urlParams) => {

  var regex = 'http(s?)\\:\\/\\/' + escapeRegex(baseUrl) + '\\?';
  var params = [];

  for(var key in urlParams) { 
    params.push(key + '\=' + urlParams[key]);
  }

  regex += params.join('\\&');

  return new RegExp(regex, 'g');

}

/**
 * Renders the regex for testing a .ics and its download prefix.
 * 
 * @return {RegExp} regex of ics
 */
const getIcsCalendarRegex = () => {

  const regex = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    'CLASS:PUBLIC',
    'DESCRIPTION:(.*)',
    'DTSTART:' + dateRegex,
    'DTEND:' + dateRegex,
    'LOCATION:(.*)',
    'SUMMARY:(.*)',
    'TRANSP:TRANSPARENT',
    'END:VEVENT',
    'END:VCALENDAR',
    'UID:[A-Za-z0-9]+',
    'DTSTAMP:' + dateRegex,
    'PRODID:angular-addtocalendar'
  ].join('\n');

  return new RegExp(regex, 'g');
}

const CalendarRegex = {
  dateRegex,
  militaryHoursRegex,
  getUrlRegex,
  getIcsCalendarRegex
}

export default CalendarRegex;