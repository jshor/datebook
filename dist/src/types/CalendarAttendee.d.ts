import ICSAttendeeOptions from './ICSAttendeeOptions';
/**
 * Basic Attendee Object
 */
type CalendarAttendee = {
    /** The attendee's email address */
    email: string;
    /** The attendee's name (optional) */
    name?: string;
    /** Advanced options for use with ics format (optional). See {@link ICSAttendeeOptions}. */
    icsOptions?: ICSAttendeeOptions;
};
export default CalendarAttendee;
