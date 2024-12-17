import CalendarRecurrence from '../types/CalendarRecurrence';
declare const _default: {
    addLeadingZero: (n?: string | number) => string;
    getDuration: (start: number, end: number) => string;
    getHoursDiff: (start: number, end: number) => number;
    getRecurrenceLengthDays: (recurrence: CalendarRecurrence) => number;
    formatDate: (d: Date | undefined, format: string) => string;
    formatDateNoUtc: (d: Date | undefined, format: string) => string;
    getTimeCreated: () => string;
    incrementDate: (dateInput: Date, days: number) => Date;
};
export default _default;
