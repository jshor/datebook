<template>
  <div>
    <recurrence v-model="config.recurrence" />
    
    <h2>Result</h2>

    <h3>iCalendar <code>RRULE</code></h3>

    <pre class="language-js"><RRuleText :data="datebookConfig" /></pre>
    
    <h3>Datebook Recurrence Config Object</h3>

    <pre class="language-js">{{ JSON.stringify(datebookConfig, null, 2) }}</pre>
  </div>
</template>

<script>
import Recurrence from '../forms/Recurrence.vue'
import RRuleText from '../displays/RRuleText.vue'
import getFilteredRecurrence from '../../utils/getFilteredRecurrence'

export default {
  name: 'RRule',
  components: {
    Recurrence,
    RRuleText
  },
  data () {
    return {
      config: {
        recurrence: {
          frequency: 'DAILY',
          interval: 1,
          month: 1,
          weekdays: [],
          monthdays: [],
          until: '',
          count: 1,
          byType: {
            weekdays: false,
            monthdays: false
          },
          byRepeat: {
            untilDate: false,
            count: false
          }
        }
      }
    }
  },
  computed: {
    datebookConfig () {
      return getFilteredRecurrence(this.config.recurrence)
    }
  }
}
</script>