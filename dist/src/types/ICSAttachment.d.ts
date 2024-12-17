/**
 * Optional file to attach to the alarm.
 * See {@link https://www.kanzaki.com/docs/ical/attach.html} for more info.
 */
type ICSAttachment = {
    /** iCalendar file attachment properties. */
    params?: string;
    /** URL to the file attachment. */
    url: string;
};
export default ICSAttachment;
