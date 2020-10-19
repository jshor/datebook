import ICSAttachment from './ICSAttachment'
import ICSDuration from './ICSDuration'

type ICSAlarm = {
  action: string
  trigger: ICSDuration | Date,
  description?: string
  summary?: string
  repeat?: number
  duration?: ICSDuration
  attach?: ICSAttachment
}

export default ICSAlarm
