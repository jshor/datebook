import CalendarAttendee from '../types/CalendarAttendee';
declare const _default: {
    toParamString: (params: Record<string, string>, delimiter?: string, transformFn?: (s: string) => string) => string;
    toQueryString: (params: Record<string, string | null>) => string;
    toIcsParamString: (params: Record<string, string>) => string;
    toMailtoList: (attendees: CalendarAttendee[]) => string[];
    toProperCase: (s: string) => string;
};
export default _default;
