import CalendarBase from './CalendarBase';
import CalendarOptions from './types/CalendarOptions';
/**
 * Generates a Google Calendar url.
 */
export default class GoogleCalendar extends CalendarBase {
    constructor(opts: CalendarOptions);
    /**
     * Sets the basic properties for the calendar instance.
     */
    protected setInitialParams: () => void;
    /**
     * Generates the Google Calendar url.
     *
     * @returns {string}
     */
    render: () => string;
}
