import ICSAttachment from './ICSAttachment';
import ICSDuration from './ICSDuration';
/**
 * Event alarm/reminder configuration.
 */
type ICSAlarm = {
    /** Determines how the alarm will behave. */
    action: string;
    /** When to trigger the alarm. This can be an {@link ICSDuration} object representing the time to display before or after an event, or a valid Date reference. */
    trigger: ICSDuration | Date;
    /** The full description for the alarm. */
    description?: string;
    /** The short summary for the alarm. */
    summary?: string;
    /** The number of times to repeat the alarm. */
    repeat?: number;
    /** How long the alarm should be present for. */
    duration?: ICSDuration;
    /** Optional file to attach to the alarm. See {@link https://www.kanzaki.com/docs/ical/attach.html} for more info. */
    attach?: ICSAttachment;
};
export default ICSAlarm;
