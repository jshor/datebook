import moment from 'moment'
import { FORMAT } from '../constants'

class CalendarBase {
  constructor (options) {
    this.setText(options)
    this.setTimestamps(options)
  }
  
  /**
   * Sets the description, title and location.
   * 
   * @private
   * @param {Object} options
   * @param {String} [description = ''] - event description
   * @param {String} [title = ''] - event description
   * @param {String} [location = ''] - event description 
   */
  setText (options) {
    this.description = options.description || ''
    this.title = options.title || ''
    this.location = options.location || ''
  }
  
  /**
   * Sets the time and recurrence parameters.
   * 
   */
  setTimestamps (options) {
    let format = FORMAT.DATE
    
    this.allday = !options.end
    
    if (this.allday) {
      this.end = moment(options.start)
        .add(1, 'days')
        .format(format)
    } else {
      format += `T${FORMAT.TIME}`
      this.end = moment(options.end).format(format)
    }
    
    this.start = moment(options.start).format(format)
    this.recurrence = options.recurrence
  }
}

export default CalendarBase