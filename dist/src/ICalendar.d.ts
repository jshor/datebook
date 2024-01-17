import CalendarBase from './CalendarBase';
import CalendarOptions from './types/CalendarOptions';
import ICSAlarm from './types/ICSAlarm';
import ICSPropertyValue from './types/ICSPropertyValue';
/**
 * Renders ICS file content.
 */
export default class ICalendar extends CalendarBase {
    /** List of additional ICalendar events to add. */
    private additionalEvents;
    /** List of VEVENT property-value entries */
    properties: string[];
    /** Key-value pair of basic calendar properties. */
    private meta;
    constructor(opts: CalendarOptions);
    /**
     * Sets the basic properties for the calendar instance.
     */
    protected setInitialParams: () => void;
    /**
     * Generates the ATTENDEE property param based on user-specified options and the attendee name.
     *
     * @param {ICSAttendeeOptions} options
     * @param {string} name
     * @returns {string}
     */
    private getAttendeeParams;
    /**
     * Generates a valid ICS alarm duration.
     *
     * @example getAlarmDuration({ minutes: 3, seconds: 2 }) -> PT3M2S
     * @param {ICSDuration} duration
     * @returns {string}
     */
    private getAlarmDuration;
    /**
     * Returns the iCalendar meta properties, formatted as VEVENT entry lines.
     *
     * @returns {string[]}
     */
    getMeta: () => string[];
    /**
     * Sets iCalendar meta properties, such as UID, DTSTAMP, etc.
     *
     * @param {string} key
     * @param {string} value
     * @returns {ICalendar}
     */
    setMeta: (key: string, value: string) => this;
    /**
     * Adds the given event to the same `.ics` file instance.
     *
     * @param {ICalendar} event
     * @returns {ICalendar}
     */
    addEvent: (event: ICalendar) => this;
    /**
     * Adds any additional desired iCalendar property having the given key-value pair to the instance.
     *
     * @param {Alarm} alarm
     * @returns {ICalendar}
     */
    addProperty: (key: string, value: ICSPropertyValue) => this;
    /**
     * Adds an alarm. Multiple different alarms may be added to a single instance.
     *
     * @param {Alarm} alarm
     * @returns {ICalendar}
     */
    addAlarm: (alarm: ICSAlarm) => this;
    /**
     * Generates the iCalendar data.
     *
     * @returns {string}
     */
    render: () => string;
}
