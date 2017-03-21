import 'angular-file-saver';
import '@iamadamjowett/angular-click-outside';

import Utils from '../utils/utils';
import Calendars from '../utils/calendars';
import bindings from './bindings';

export default class AddtocalendarCtrl {

  constructor($attrs, FileSaver) {
    this.FileSaver = FileSaver;
    this.dates = {};
    this.init.call(this);

    Object
      .keys($attrs)
      .forEach(key => {
        $attrs.$observe(key, this.init.bind(this));
      });
  }

  setTimesFromFormat() {
    let format   = this.format,
        timezone = this.timezone;

    ['startDate', 'endDate']
      .forEach(t => {
        this.dates[t] = Utils.formatTime(this[t], format, timezone);
      });
  }

  getSanitizedData() {
    let urlData = {};

    Object
      .keys(bindings)
      .forEach(key => {
        urlData[key] = encodeURIComponent(this[key] || '');
      });
    return urlData;
  }

  buildUrl() {
    let urlData = angular.extend(this.getSanitizedData.call(this), this.dates),
        icsData = angular.extend({}, this, this.dates);

    this.calendarUrl = {
      microsoft: Calendars.getMicrosoftCalendarUrl(urlData),
      google:    Calendars.getGoogleCalendarUrl(urlData),
      yahoo:     Calendars.getYahooCalendarUrl(urlData),
      icalendar: Calendars.getIcsCalendar(icsData),
      dlIcal:    this.dlIcal.bind(this)
    };
  }

  dlIcal() {
    let fileName = Utils.getIcsFileName(this.title),
        icsData = this.calendarUrl.icalendar,
        icsBlob = Utils.getIcsBlob(icsData);

    this.FileSaver.saveAs(icsBlob, fileName);
  }

  toggleMenu(isOpen) {
    if(!this.useBootstrap) {
      this.isOpen = isOpen;
    }
  }

  init() {
    this.setTimesFromFormat.call(this);
    this.buildUrl.call(this);
  }
}

AddtocalendarCtrl.$inject = ['$attrs', 'FileSaver'];