/**
 * Advanced attendee options for use with the ICS format.
 */
type ICSAttendeeOptions = {
    /** The participation status (RFC-2445 value) of the attendee. */
    partStat?: string;
    /** The participation role (RFC-2445 value) of the attendee. */
    role?: string;
    /** Whether or not the attendee is RSVP'd to the event. */
    rsvp?: boolean;
    /** The delegatee of the attendee request. See {@link https://www.kanzaki.com/docs/ical/delegatedFrom.html} for more info.  */
    delegatedFrom?: string;
    /** The event sender. See {@link https://www.kanzaki.com/docs/ical/sentBy.html} for more info. */
    sentBy?: string;
};
export default ICSAttendeeOptions;
