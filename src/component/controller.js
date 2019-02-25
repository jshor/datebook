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
      recurrence: this.recurrence
    };
  }

  buildUrl () {
    const data = this.getData()
    
    this.calendarUrl = {
      microsoft: Calendars.getMicrosoftCalendarUrl(data),
      google:    Calendars.getGoogleCalendarUrl(data),
      yahoo:     Calendars.getYahooCalendarUrl(data),
      dlIcal:    this.dlIcal.bind(this)
    };
  }

  dlIcal () {
    Calendars.downloadIcs(this.getData());
  }

  toggleMenu (isOpen) {
    if (isOpen === null) {
      this.isOpen = !this.isOpen;
      return;
    }
    this.isOpen = isOpen;
  }
}

AddtocalendarCtrl.$inject = ['$attrs', 'FileSaver'];
