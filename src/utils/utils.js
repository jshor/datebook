import moment from 'moment';

export default class Utils {
  /**
   * Return 12-hour format to 24-hour.
   * TODO: use momentjs for this?
   * 
   * @param  {Number} hours
   * @return {String}
   */
  static getMilitaryHours(hours) {
    if(hours < 10) {
      hours = '0' + hours;
    }
    return hours + '00';
  }

  /**
   * Gets the duration between dates.
   * 
   * @param  {String} startDate
   * @param  {String} endDate
   * @param  {Number} timezone
   * @return {String}
   */
  static getHoursDuration(startDate, endDate, timezone) {
    var start = new moment(startDate);
    var end = new moment(endDate);

    if(timezone) {
      start.utcOffset(timezone);
      end.utcOffset(timezone);
    }

    var hours = moment
      .duration(end.diff(start))
      .asHours();

    return this.getMilitaryHours(hours);
  }

  /**
   * Removes line breaks and ensures that the string is no
   * longer than maxLength chars (or 75 chars if none specified).
   *
   * @param  {String} s         string to sanitize
   * @param  {Number} maxLength index of string to truncate at
   * @return {String}
   */
  static formatIcsText(str, maxLength) {
    if(!str) {
      return '';
    }
    str = str.replace(/\n/g, '\\n');
    str = str.substring(0, maxLength);

    return str;
  }

  /**
   * Loop through attributes, excluding ones starting with `$`, and call cb() on entry.
   * 
   * @param  {Object}   attrs
   * @param  {Function} cb
   */
  static forEachAttr(attrs, cb) {
    // for(key in attrs) {
    //   if(attrs.hasOwnProperty(key) && key.indexOf('$') === -1) {
    //     cb(key, attrs[key]);
    //   }
    // }
  }

  /**
   * Format time in given format.
   * 
   * @param  {String} timestamp
   * @param  {String} inputFormat
   * @return {String}
   */
  static formatTime(timestamp, inputFormat) {
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

  /**
   * The name of the file will be the event title with alphanumeric chars
   * having the extension `.ics`.
   *
   * @param  {String} icsData
   * @return {Blob}
   */
  static getIcsBlob(icsData) {
    return new Blob([icsData], {
      type: 'application/octet-stream'
    });
  }

  /**
   * Transforms given string to be valid file name.
   * 
   * @param  {String} title
   * @return {String}
   */
  static getIcsFileName(title) {
    return title.replace(/[^\w ]+/g, '') + '.ics';
  }
}