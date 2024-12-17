import CalendarBase from './CalendarBase';
import CalendarOptions from './types/CalendarOptions';
/**
 * Generates a Yahoo! Calendar url.
 *
 * @remark Yahoo! Calendar's support for recurrence is limited to only the interval and frequency.
 */
export default class YahooCalendar extends CalendarBase {
    constructor(opts: CalendarOptions);
    /**
     * Sets the basic properties for the calendar instance.
     */
    protected setInitialParams: () => void;
    /**
     * Sets the start/end/allday parameters.
     */
    private setTimeParams;
    /**
     * Generates the Yahoo! Calendar data.
     *
     * @returns {string}
     */
    render: () => string;
}
