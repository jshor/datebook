export const RECURRENCE = {
  FREQUENCY: {
    DAILY: 'DAILY',
    WEEKLY: 'WEEKLY',
    MONTHLY: 'MONTHLY',
    YEARLY: 'YEARLY'
  }
}

export const FORMAT = {
  DATE: 'YYYYMMDD',
  TIME: 'ThhmmssZ',
  FULL: 'YYYYMMDDThhmmssZ',
  NO_UTC_FULL: 'YYYYMMDDThhmmss',
  OUTLOOK_DATE: 'YYYY-MM-DD',
  OUTLOOK_TIME: 'Thh:mm:ssZ',
  OUTLOOK_FULL: 'YYYY-MM-DDThh:mm:ssZ'
}

export const URL = {
  YAHOO: 'https://calendar.yahoo.com/',
  GOOGLE: 'https://calendar.google.com/calendar/render',
  OUTLOOK: 'https://outlook.{{host}}.com/calendar/action/compose'
}
