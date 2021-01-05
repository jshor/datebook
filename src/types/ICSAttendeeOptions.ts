/**
 * advanced attendee options for use with the ics format
 */

 // TODO comments on props
 // TODO: Consult @jshor about modifications to this hierarchy to accommodate OWA
type ICSAttendeeOptions = {
    partStat?: string
    role?: string
    rsvp?: boolean
    delegatedFrom?: string
    sentBy?: string
}

export default ICSAttendeeOptions