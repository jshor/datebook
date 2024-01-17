import CalendarRecurrence from './CalendarRecurrence';
import CalendarAttendee from './CalendarAttendee';
/**
 * Basic config options.
 */
type CalendarOptions = {
    /** The event description. */
    description?: string;
    /** The event title (i.e., summary). */
    title?: string;
    /** A summary description of the event location. */
    location?: string;
    /** The event start timestamp. */
    start: Date;
    /** The event end timestamp. For all-day events, this field should be omitted. */
    end?: Date;
    /** The recurrence of an event is how often the event is supposed to occur. See {@link CalendarRecurrence}. */
    recurrence?: CalendarRecurrence;
    /** An array of attendee objects, representing people who will be invited to the event (optional). See {@link CalendarAttendee}.  */
    attendees?: Array<CalendarAttendee>;
};
export default CalendarOptions;
