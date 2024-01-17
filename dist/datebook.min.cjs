'use strict';

var RECURRENCE = {
    FREQUENCY: {
        DAILY: 'DAILY',
        WEEKLY: 'WEEKLY',
        MONTHLY: 'MONTHLY',
        YEARLY: 'YEARLY'
    }
};
var FORMAT = {
    DATE: 'YYYYMMDD',
    TIME: 'ThhmmssZ',
    FULL: 'YYYYMMDDThhmmssZ',
    NO_UTC_FULL: 'YYYYMMDDThhmmss',
    OUTLOOK_DATE: 'YYYY-MM-DD',
    OUTLOOK_TIME: 'Thh:mm:ssZ',
    OUTLOOK_FULL: 'YYYY-MM-DDThh:mm:ssZ'
};
var URL = {
    YAHOO: 'https://calendar.yahoo.com/',
    GOOGLE: 'https://calendar.google.com/calendar/render',
    OUTLOOK: 'https://outlook.{{host}}.com/calendar/action/compose'
};

/**
 * Adds a leading zero to a single-digit string and returns a two-digit string.
 *
 * @param {number | string} n
 * @returns {string}
 */
var addLeadingZero = function (n) {
    if (n === void 0) { n = ''; }
    return "0".concat(parseInt(n.toString(), 10)).slice(-2);
};
/**
 * Returns the duration between two given dates in hhmm format.
 *
 * @param {number} start
 * @param {number} end
 * @returns {string}
 */
var getDuration = function (start, end) {
    var seconds = Math.floor((end - start) / 1000);
    var hours = Math.floor(seconds / 3600);
    var mins = ((seconds / 3600) % 1) * 60;
    return "".concat(addLeadingZero(hours)).concat(addLeadingZero(mins));
};
/**
 * Returns the number of hours between two given dates.
 *
 * @param {number} start
 * @param {number} end
 * @returns {number}
 */
var getHoursDiff = function (start, end) {
    var seconds = Math.floor((end - start) / 1000);
    return Math.floor(seconds / 3600);
};
/**
 * Computes the number of days a recurrence will last.
 *
 * @param {CalendarRecurrence} recurrence
 * @returns {number}
 */
var getRecurrenceLengthDays = function (recurrence) {
    var frequency = recurrence.frequency, interval = recurrence.interval;
    var FREQUENCY = RECURRENCE.FREQUENCY;
    if (interval) {
        switch (frequency) {
            case FREQUENCY.YEARLY:
                return interval * 365.25;
            case FREQUENCY.MONTHLY:
                return interval * 30.42; // avg days in a year
            case FREQUENCY.WEEKLY:
                return interval * 7;
            default:
                return interval; // daily
        }
    }
    // if no frequency is specified, set an arbitrarily-long recurrence end
    return 365.25 * 100; // 100 years
};
/**
 * Formats the given JS Date() object to the given format.
 * Format defaults to: YYYYMMDDTHHMMss
 *
 * @param {Date} [d = new Date()]
 * @param {string} format
 * @returns {string}
 */
var formatDate = function (d, format) {
    if (d === void 0) { d = new Date(); }
    var dateValues = {
        YYYY: d.getUTCFullYear(),
        MM: addLeadingZero(d.getUTCMonth() + 1),
        DD: addLeadingZero(d.getUTCDate()),
        hh: addLeadingZero(d.getUTCHours()),
        mm: addLeadingZero(d.getUTCMinutes()),
        ss: addLeadingZero(d.getUTCSeconds())
    };
    return Object
        .keys(dateValues)
        .reduce(function (date, key) {
        return date.replace(key, dateValues[key].toString());
    }, format);
};
/**
 * Formats the given JS Date() object to the given format, not using UTC
 * Format defaults to: YYYYMMDDTHHMMss
 *
 * @param {Date} [d = new Date()]
 * @param {string} format
 * @returns {string}
 */
var formatDateNoUtc = function (d, format) {
    if (d === void 0) { d = new Date(); }
    var dateValues = {
        YYYY: d.getFullYear(),
        MM: addLeadingZero(d.getMonth() + 1),
        DD: addLeadingZero(d.getDate()),
        hh: addLeadingZero(d.getHours()),
        mm: addLeadingZero(d.getMinutes()),
        ss: addLeadingZero(d.getSeconds())
    };
    return Object
        .keys(dateValues)
        .reduce(function (date, key) {
        return date.replace(key, dateValues[key].toString());
    }, format);
};
/**
 * Returns the current timestamp.
 *
 * @returns {string}
 */
var getTimeCreated = function () {
    return formatDate(new Date(), FORMAT.FULL);
};
/**
 * Increments dates by the given number of days.
 * This will account for edge cases, such as leap years.
 *
 * @param {Date} dateInput - date to increment
 * @param {number} days - number of days
 * @returns {Date}
 */
var incrementDate = function (dateInput, days) {
    var additionalTime = days * 86400000;
    var newDate = new Date();
    newDate.setTime(dateInput.getTime() + additionalTime);
    return newDate;
};
var time = {
    addLeadingZero: addLeadingZero,
    getDuration: getDuration,
    getHoursDiff: getHoursDiff,
    getRecurrenceLengthDays: getRecurrenceLengthDays,
    formatDate: formatDate,
    formatDateNoUtc: formatDateNoUtc,
    getTimeCreated: getTimeCreated,
    incrementDate: incrementDate
};

/**
 * Base calendar class. This class can be extended to add new calendar services.
 */
var CalendarBase = /** @class */ (function () {
    /**
     * Constructor.
     *
     * @param {CalendarOptions} options
     */
    function CalendarBase(options) {
        var _this = this;
        /** True if the event is one that spans the entire day. */
        this.isAllDay = false;
        /** Event description. */
        this.description = '';
        /** Event title. */
        this.title = '';
        /** Event physical location. */
        this.location = '';
        /** Start time of the event. */
        this.start = new Date();
        /** End time of the event. */
        this.end = new Date();
        /** Calendar service query string params. */
        this.params = {};
        /** Array of event attendees. See {@link CalendarAttendee} */
        this.attendees = [];
        /**
         * Sets the description, title and location.
         *
         * @param {CalendarOptions} options
         */
        this.setText = function (options) {
            _this.description = options.description || '';
            _this.title = options.title || '';
            _this.location = options.location || '';
        };
        /**
         * Sets the time and recurrence parameters.
         *
         * @param {CalendarOptions} options
         */
        this.setTimestamps = function (options) {
            _this.isAllDay = !options.end;
            _this.start = options.start;
            // if no end date is specified, make the end date exactly 1 day from the start date
            _this.end = options.end || time.incrementDate(_this.start, 1);
            _this.recurrence = options.recurrence;
        };
        /**
         * Sets additional calendar service properties.
         * May be used to override existing query string params if necessary.
         *
         * @param {string} key
         * @param {string | null} value
         * @returns {CalendarBase}
         */
        this.setParam = function (key, value) {
            _this.params[key] = value;
            return _this;
        };
        this.setText(options);
        this.setTimestamps(options);
        this.setAttendees(options);
    }
    /**
     * Sets the attendees array if attendees are supplied.
     *
     * @param {CalendarOptions} options
     */
    CalendarBase.prototype.setAttendees = function (options) {
        this.attendees = Array.isArray(options.attendees) ? options.attendees : [];
    };
    return CalendarBase;
}());

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

/**
 * Creates a param string from a flat key-value pair.
 *
 * @param {Record<string, string>} params
 * @param {string} [delimiter = ';']
 * @param {Function} [transformFn] - transformation function to be applied to each param
 * @returns {string}
 */
var toParamString = function (params, delimiter, transformFn) {
    if (delimiter === void 0) { delimiter = ';'; }
    if (transformFn === void 0) { transformFn = function (s) { return s; }; }
    var paramString = [];
    for (var key in params) {
        if (params.hasOwnProperty(key) && params[key] !== undefined) {
            paramString.push("".concat(key, "=").concat(transformFn(params[key])));
        }
    }
    return paramString.join(delimiter);
};
/**
 * Creates a query string from a flat key-value pair.
 *
 * @param {Record<string, string | null>} params
 * @returns {string}
 */
var toQueryString = function (params) {
    // filter the record set to remove null values
    var filteredParams = Object
        .keys(params)
        .filter(function (p) { return params[p] !== null; })
        .reduce(function (p, k) {
        var _a;
        return (__assign(__assign({}, p), (_a = {}, _a[k] = params[k], _a)));
    }, {});
    return toParamString(filteredParams, '&', encodeURIComponent);
};
/**
 * Creates an ICS param string from a flat key-value pair.
 *
 * @param {Record<string, string>} params
 * @returns {string}
 */
var toIcsParamString = function (params) {
    return toParamString(params, ';');
};
/**
 * Renders a comma-separated string of mailto values.
 * (e.g., 'John Doe <john@doe.com>,Jane Doe <jane@doe.com>')
 *
 * @param {CalendarAttendee[]} attendees
 * @returns {string[]}
 */
var toMailtoList = function (attendees) {
    return attendees
        .map(function (_a) {
        var email = _a.email, name = _a.name;
        return name
            ? "".concat(name, " <").concat(email, ">")
            : email;
    });
};
/**
 * Converts the given string to ProperCase.
 *
 * @param {string} s
 * @returns {string}
 */
var toProperCase = function (s) {
    return [
        s[0].toUpperCase(),
        s.slice(-s.length + 1).toLowerCase()
    ].join('');
};
var data = {
    toParamString: toParamString,
    toQueryString: toQueryString,
    toIcsParamString: toIcsParamString,
    toMailtoList: toMailtoList,
    toProperCase: toProperCase
};

/**
 * Removes line breaks from a string. Returns an empty string if falsy.
 *
 * @param {string} [str = ''] - string to sanitize
 * @returns {string}
 */
var formatText = function (str) {
    if (str === void 0) { str = ''; }
    return str
        .replace(/\\/g, '\\\\')
        .replace(/\n/g, '\\n')
        .replace(/[,;]/g, '\\$&');
};
/**
 * Returns a random base 36 hash for iCal UID.
 *
 * @returns {string}
 */
var getUid = function () {
    return Math.random().toString(36).substr(2);
};
/**
 * Returns the hostname for usage in `PRODID`. Returns `datebook` in Node.js.
 *
 * @returns {string}
 */
var getProdId = function () {
    return typeof window !== 'undefined'
        ? window.location.host
        : 'datebook';
};
/**
 * Converts the given recurrence options to RFC????
 *
 * @param {CalendarRecurrence} recurrence
 * @returns {string}
 */
var getRrule = function (recurrence) {
    var _a, _b;
    var rrule = {
        FREQ: recurrence.frequency,
        INTERVAL: (_a = recurrence.interval) === null || _a === void 0 ? void 0 : _a.toString(),
        COUNT: (_b = recurrence.count) === null || _b === void 0 ? void 0 : _b.toString(),
        WKST: recurrence.weekstart,
        BYDAY: recurrence.weekdays,
        BYMONTHDAY: recurrence.monthdays
    };
    if (recurrence.end) {
        rrule.UNTIL = time.formatDate(recurrence.end, FORMAT.FULL);
    }
    return data.toIcsParamString(rrule);
};
var ics = {
    formatText: formatText,
    getUid: getUid,
    getProdId: getProdId,
    getRrule: getRrule
};

/**
 * Generates a Google Calendar url.
 */
var GoogleCalendar = /** @class */ (function (_super) {
    __extends(GoogleCalendar, _super);
    function GoogleCalendar(opts) {
        var _this = _super.call(this, opts) || this;
        /**
         * Sets the basic properties for the calendar instance.
         */
        _this.setInitialParams = function () {
            var timestampFormat = FORMAT.DATE;
            if (!_this.isAllDay) {
                timestampFormat += FORMAT.TIME;
            }
            var dates = [
                time.formatDate(_this.start, timestampFormat),
                time.formatDate(_this.end, timestampFormat)
            ].join('/');
            _this
                .setParam('action', 'TEMPLATE')
                .setParam('dates', dates)
                .setParam('text', _this.title)
                .setParam('details', _this.description)
                .setParam('location', _this.location)
                .setParam('allday', _this.isAllDay.toString());
            if (_this.recurrence) {
                _this.setParam('recur', "RRULE:".concat(ics.getRrule(_this.recurrence)));
            }
            if (_this.attendees.length > 0) {
                _this.setParam('add', data.toMailtoList(_this.attendees).join(','));
            }
        };
        /**
         * Generates the Google Calendar url.
         *
         * @returns {string}
         */
        _this.render = function () {
            var baseUrl = URL.GOOGLE;
            var queryString = data.toQueryString(_this.params);
            return "".concat(baseUrl, "?").concat(queryString);
        };
        _this.setInitialParams();
        return _this;
    }
    return GoogleCalendar;
}(CalendarBase));

/**
 * Generates a Yahoo! Calendar url.
 *
 * @remark Yahoo! Calendar's support for recurrence is limited to only the interval and frequency.
 */
var YahooCalendar = /** @class */ (function (_super) {
    __extends(YahooCalendar, _super);
    function YahooCalendar(opts) {
        var _this = _super.call(this, opts) || this;
        /**
         * Sets the basic properties for the calendar instance.
         */
        _this.setInitialParams = function () {
            _this
                .setParam('v', '60') // version number; must be 60
                .setParam('title', _this.title)
                .setParam('desc', _this.description)
                .setParam('in_loc', _this.location);
            _this.setTimeParams();
            if (_this.attendees.length > 0) {
                _this.setParam('inv_list', data.toMailtoList(_this.attendees).join(','));
            }
        };
        /**
         * Sets the start/end/allday parameters.
         */
        _this.setTimeParams = function () {
            if (_this.isAllDay) {
                _this
                    .setParam('dur', 'allday')
                    .setParam('st', time.formatDateNoUtc(_this.start, FORMAT.DATE));
            }
            else {
                _this.setParam('st', time.formatDateNoUtc(_this.start, FORMAT.NO_UTC_FULL));
                if (time.getHoursDiff(_this.start.getTime(), _this.end.getTime()) > 99) {
                    // Yahoo only supports up to 99 hours, so we are forced to specify the end time instead of the duration
                    _this.setParam('et', time.formatDateNoUtc(_this.end, FORMAT.NO_UTC_FULL));
                }
                else {
                    // we prefer specifying duration in lieu of end time, because apparently Yahoo's end time is buggy w.r.t. timezones
                    _this.setParam('dur', time.getDuration(_this.start.getTime(), _this.end.getTime()));
                }
            }
        };
        /**
         * Generates the Yahoo! Calendar data.
         *
         * @returns {string}
         */
        _this.render = function () {
            var baseUrl = URL.YAHOO;
            var queryString = data.toQueryString(_this.params);
            return "".concat(baseUrl, "?").concat(queryString);
        };
        _this.setInitialParams();
        return _this;
    }
    return YahooCalendar;
}(CalendarBase));

/**
 * Generates an Outlook Calendar url.
 *
 * @remark Outlook Calendar's query string params do not support recurrence.
 */
var OutlookCalendar = /** @class */ (function (_super) {
    __extends(OutlookCalendar, _super);
    function OutlookCalendar(opts) {
        var _this = _super.call(this, opts) || this;
        /** Base URL for the host service. */
        _this.baseUrl = URL.OUTLOOK;
        /**
         * Sets the basic properties for the calendar instance.
         */
        _this.setInitialParams = function () {
            var timestampFormat = FORMAT.OUTLOOK_DATE;
            if (!_this.isAllDay) {
                timestampFormat += FORMAT.OUTLOOK_TIME;
            }
            _this
                .setParam('rru', 'addevent')
                .setParam('path', '/calendar/action/compose')
                .setParam('startdt', time.formatDate(_this.start, timestampFormat))
                .setParam('enddt', time.formatDate(_this.end, timestampFormat))
                .setParam('subject', _this.title)
                .setParam('body', _this.description)
                .setParam('location', _this.location)
                .setParam('allday', _this.isAllDay.toString());
            if (_this.attendees.length > 0) {
                _this.setParam('to', data.toMailtoList(_this.attendees).join(','));
            }
        };
        /**
         * Sets the host service type. The default host for Outlook is **`live`**.
         *
         * @param {string} host - `live` (for personal accounts) or `office` (for Office365)
         * @returns {OutlookCalendar}
         */
        _this.setHost = function (host) {
            if (['live', 'office'].includes(host)) {
                _this.baseUrl = URL.OUTLOOK.replace('{{host}}', host);
            }
            return _this;
        };
        /**
         * Generates the Outlook url.
         *
         * @returns {string}
         */
        _this.render = function () {
            var queryString = data.toQueryString(_this.params);
            return "".concat(_this.baseUrl, "?").concat(queryString);
        };
        _this.setInitialParams();
        _this.setHost('live');
        return _this;
    }
    return OutlookCalendar;
}(CalendarBase));

/**
 * Renders ICS file content.
 */
var ICalendar = /** @class */ (function (_super) {
    __extends(ICalendar, _super);
    function ICalendar(opts) {
        var _this = _super.call(this, opts) || this;
        /** List of additional ICalendar events to add. */
        _this.additionalEvents = [];
        /** List of VEVENT property-value entries */
        _this.properties = [];
        /** Key-value pair of basic calendar properties. */
        _this.meta = {};
        /**
         * Sets the basic properties for the calendar instance.
         */
        _this.setInitialParams = function () {
            _this
                .setMeta('UID', ics.getUid())
                .setMeta('DTSTAMP', time.getTimeCreated())
                .addProperty('CLASS', 'PUBLIC')
                .addProperty('DESCRIPTION', ics.formatText(_this.description))
                .addProperty('LOCATION', ics.formatText(_this.location))
                .addProperty('SUMMARY', ics.formatText(_this.title))
                .addProperty('TRANSP', 'TRANSPARENT');
            if (_this.isAllDay) {
                // for all-day events, omit the time and just place dates
                _this
                    .addProperty('DTSTART;VALUE=DATE', time.formatDateNoUtc(_this.start, FORMAT.DATE))
                    .addProperty('DTEND;VALUE=DATE', time.formatDateNoUtc(time.incrementDate(_this.start, 1), FORMAT.DATE));
            }
            else {
                // otherwise, set the full start and end dates
                _this
                    .addProperty('DTSTART', time.formatDate(_this.start, FORMAT.FULL))
                    .addProperty('DTEND', time.formatDate(_this.end, FORMAT.FULL));
            }
            if (_this.recurrence) {
                _this.addProperty('RRULE', ics.getRrule(_this.recurrence));
            }
            if (_this.attendees.length > 0) {
                _this
                    .attendees
                    .forEach(function (_a) {
                    var email = _a.email, name = _a.name, _b = _a.icsOptions, icsOptions = _b === void 0 ? {} : _b;
                    var params = _this.getAttendeeParams(icsOptions, name);
                    var mailto = "MAILTO:".concat(email);
                    _this.addProperty(params, mailto);
                });
            }
        };
        /**
         * Generates the ATTENDEE property param based on user-specified options and the attendee name.
         *
         * @param {ICSAttendeeOptions} options
         * @param {string} name
         * @returns {string}
         */
        _this.getAttendeeParams = function (options, name) {
            var params = {};
            if (name)
                params['CN'] = name;
            if (options.delegatedFrom)
                params['DELEGATED-FROM'] = options.delegatedFrom;
            if (options.partStat)
                params['PARTSTAT'] = options.partStat;
            if (options.role)
                params['ROLE'] = options.role;
            if (options.sentBy)
                params['SENT-BY'] = options.sentBy;
            params['RSVP'] = options.rsvp ? 'TRUE' : 'FALSE';
            var paramString = data.toParamString(params, ';');
            return "ATTENDEE;".concat(paramString);
        };
        /**
         * Generates a valid ICS alarm duration.
         *
         * @example getAlarmDuration({ minutes: 3, seconds: 2 }) -> PT3M2S
         * @param {ICSDuration} duration
         * @returns {string}
         */
        _this.getAlarmDuration = function (duration) {
            var features = [
                "".concat(duration.weeks, "W"),
                "".concat(duration.days, "D"),
                "".concat(duration.hours, "H"),
                "".concat(duration.minutes, "M"),
                "".concat(duration.seconds, "S")
            ].filter(function (s) { return /^[0-9]+[A-Z]$/.exec(s); }); // exclude zero-duration features
            features.unshift(duration.after ? 'PT' : '-PT');
            return features.join('');
        };
        /**
         * Returns the iCalendar meta properties, formatted as VEVENT entry lines.
         *
         * @returns {string[]}
         */
        _this.getMeta = function () {
            return Object
                .keys(_this.meta)
                .map(function (key) {
                return "".concat(key, ":").concat(_this.meta[key]);
            });
        };
        /**
         * Sets iCalendar meta properties, such as UID, DTSTAMP, etc.
         *
         * @param {string} key
         * @param {string} value
         * @returns {ICalendar}
         */
        _this.setMeta = function (key, value) {
            _this.meta[key] = value;
            return _this;
        };
        /**
         * Adds the given event to the same `.ics` file instance.
         *
         * @param {ICalendar} event
         * @returns {ICalendar}
         */
        _this.addEvent = function (event) {
            _this.additionalEvents.push(event);
            return _this;
        };
        /**
         * Adds any additional desired iCalendar property having the given key-value pair to the instance.
         *
         * @param {Alarm} alarm
         * @returns {ICalendar}
         */
        _this.addProperty = function (key, value) {
            if (typeof value === 'object') {
                _this.properties.push("BEGIN:".concat(key));
                for (var k in value) {
                    _this.addProperty(k, value[k]);
                }
                _this.properties.push("END:".concat(key));
            }
            else {
                _this.properties.push("".concat(key, ":").concat(value.toString()));
            }
            return _this;
        };
        /**
         * Adds an alarm. Multiple different alarms may be added to a single instance.
         *
         * @param {Alarm} alarm
         * @returns {ICalendar}
         */
        _this.addAlarm = function (alarm) {
            var value = {
                ACTION: alarm.action
            };
            if (alarm.description)
                value.DESCRIPTION = ics.formatText(alarm.description);
            if (alarm.summary)
                value.SUMMARY = ics.formatText(alarm.summary);
            if (alarm.duration)
                value.DURATION = _this.getAlarmDuration(alarm.duration);
            if (alarm.repeat)
                value.REPEAT = alarm.repeat;
            if (alarm.attach) {
                var key = alarm.attach.params
                    ? "ATTACH;".concat(alarm.attach.params)
                    : 'ATTACH';
                value[key] = alarm.attach.url;
            }
            if (alarm.trigger instanceof Date) {
                value['TRIGGER;VALUE=DATE-TIME'] = time.formatDate(alarm.trigger, FORMAT.FULL);
            }
            else {
                value['TRIGGER'] = _this.getAlarmDuration(alarm.trigger);
            }
            return _this.addProperty('VALARM', value);
        };
        /**
         * Generates the iCalendar data.
         *
         * @returns {string}
         */
        _this.render = function () {
            var events = __spreadArray([
                _this
            ], _this.additionalEvents, true);
            var vEvents = events.reduce(function (properties, calendar) { return __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], properties, true), [
                'BEGIN:VEVENT'
            ], false), calendar.properties, true), calendar.getMeta(), true), [
                'END:VEVENT'
            ], false); }, []);
            return __spreadArray(__spreadArray([
                'BEGIN:VCALENDAR',
                'VERSION:2.0'
            ], vEvents, true), [
                "PRODID:".concat(ics.getProdId()),
                'END:VCALENDAR'
            ], false).join('\n');
        };
        _this.setInitialParams();
        return _this;
    }
    return ICalendar;
}(CalendarBase));

exports.CalendarBase = CalendarBase;
exports.GoogleCalendar = GoogleCalendar;
exports.ICalendar = ICalendar;
exports.OutlookCalendar = OutlookCalendar;
exports.YahooCalendar = YahooCalendar;
//# sourceMappingURL=datebook.min.cjs.map
