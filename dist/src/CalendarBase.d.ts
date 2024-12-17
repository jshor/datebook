import ICalendarBase from './types/ICalendarBase';
import CalendarRecurrence from './types/CalendarRecurrence';
import CalendarOptions from './types/CalendarOptions';
import CalendarAttendee from './types/CalendarAttendee';
/**
 * Base calendar class. This class can be extended to add new calendar services.
 */
declare abstract class CalendarBase implements ICalendarBase {
    /** True if the event is one that spans the entire day. */
    protected isAllDay: boolean;
    /** Event description. */
    protected description: string;
    /** Event title. */
    protected title: string;
    /** Event physical location. */
    protected location: string;
    /** Start time of the event. */
    protected start: Date;
    /** End time of the event. */
    protected end: Date;
    /** Event recurrence specification. See {@link CalendarRecurrence} */
    protected recurrence?: CalendarRecurrence;
    /** Calendar service query string params. */
    protected params: Record<string, string | null>;
    /** Array of event attendees. See {@link CalendarAttendee} */
    protected attendees: CalendarAttendee[];
    /**
     * Constructor.
     *
     * @param {CalendarOptions} options
     */
    constructor(options: CalendarOptions);
    /**
     * Sets the description, title and location.
     *
     * @param {CalendarOptions} options
     */
    protected setText: (options: CalendarOptions) => void;
    /**
     * Sets the time and recurrence parameters.
     *
     * @param {CalendarOptions} options
     */
    protected setTimestamps: (options: CalendarOptions) => void;
    /**
     * Sets the attendees array if attendees are supplied.
     *
     * @param {CalendarOptions} options
     */
    protected setAttendees(options: CalendarOptions): void;
    /**
     * Sets additional calendar service properties.
     * May be used to override existing query string params if necessary.
     *
     * @param {string} key
     * @param {string | null} value
     * @returns {CalendarBase}
     */
    setParam: (key: string, value: string | null) => this;
    /** Sets base query string/ICS params. */
    protected abstract setInitialParams(): void;
    /** Renders the URL/ICS file data. */
    abstract render(): string;
}
export default CalendarBase;
