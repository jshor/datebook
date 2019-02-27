import Calendars from '../utils/calendars';
import bindings from './bindings';

export default class AddtocalendarCtrl {

  constructor ($attrs) {
    this.buildUrl.call(this);
    this.watchAttrs.call(this, $attrs);
  }

  watchAttrs ($attrs) {
    Object
      .keys($attrs)
      .forEach(key => {
        $attrs.$observe(key, this.buildUrl.bind(this));
      });
  }

  getData () {
    return {
      start: this.startDate,
      end: this.endDate,
      title: this.title,
      description: this.description,
      location: this.location,
      recurrence: {
        frequency: this.recurrenceFrequency,
        interval: this.recurrenceInterval,
        count: this.recurrenceCount,
        end: this.recurrenceEnd,
        weekdays: this.recurrenceWeekdays,
        monthdays: this.recurrenceMonthdays,
        weekStart: this.recurrenceWeekstart
      }
    };
  }

  buildUrl () {
    const data = this.getData()

    this.calendarUrl = {
      microsoft: Calendars.getMicrosoftCalendarUrl(data),
      google:    Calendars.getGoogleCalendarUrl(data),
      yahoo:     Calendars.getYahooCalendarUrl(data),
      dlIcal:    Calendars.downloadIcs(data)
    };
  }

  toggleMenu (isOpen) {
    if (isOpen === null) {
      this.isOpen = !this.isOpen;
      return;
    }
    this.isOpen = isOpen;
  }
}

AddtocalendarCtrl.$inject = ['$attrs'];
