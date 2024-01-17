import CalendarBase from './CalendarBase';
import CalendarOptions from './types/CalendarOptions';
/**
 * Generates an Outlook Calendar url.
 *
 * @remark Outlook Calendar's query string params do not support recurrence.
 */
export default class OutlookCalendar extends CalendarBase {
    /** Base URL for the host service. */
    private baseUrl;
    constructor(opts: CalendarOptions);
    /**
     * Sets the basic properties for the calendar instance.
     */
    protected setInitialParams: () => void;
    /**
     * Sets the host service type. The default host for Outlook is **`live`**.
     *
     * @param {string} host - `live` (for personal accounts) or `office` (for Office365)
     * @returns {OutlookCalendar}
     */
    setHost: (host: string) => this;
    /**
     * Generates the Outlook url.
     *
     * @returns {string}
     */
    render: () => string;
}
