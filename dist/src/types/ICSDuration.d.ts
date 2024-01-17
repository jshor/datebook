/**
 * Represents timespans before or after an iCalendar event date.
 * They can be used to trigger alarms.
 */
type ICSDuration = {
    /** If `true`, sets the duration to be after the event date. Otherwise, it defaults to before the date (a negative duration). */
    after?: boolean;
    /** The number of weeks the duration spans. */
    weeks?: number;
    /** The number of days the duration spans. */
    days?: number;
    /** The number of hours the duration spans. */
    hours?: number;
    /** The number of minutes the duration spans. */
    minutes?: number;
    /** The number of seconds the duration spans. */
    seconds?: number;
};
export default ICSDuration;
