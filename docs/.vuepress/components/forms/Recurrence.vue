<template>
  <div>
    <h3>Frequency</h3>

    <span>Repeat this event</span>

    <select v-model="model.frequency">
      <option
        v-for="frequency in frequencies"
        :key="frequency"
        :value="frequency">
        {{ frequency.toLowerCase() }}
      </option>
    </select>

    <p v-if="model.frequency !== 'DAILY'">
      <input
        v-model="options.hasWeekdays"
        @change="options.hasMonthdays = false"
        type="checkbox"
        id="byWeekdays"
      />
      <label for="byWeekdays">By days of the week</label>

      <br />

      <input
        v-model="options.hasMonthdays"
        @change="options.hasWeekdays = false"
        type="checkbox"
        id="byMonthdays"
      />
      <label for="byMonthdays">By days of the month</label>
    </p>


    <div>
      <h3>Interval</h3>

      <span>Repeat every</span>
      <input
        v-model.number="model.interval"
        type="number"
        min="1"
        step="1"
        :size="1"
        class="input"
      />
      <plural
        :text="intervalType"
        :n="model.interval"
      />
    </div>

    <div v-if="model.frequency === 'YEARLY'">
      <h3>Months of the year</h3>

      <input
        v-model="options.byMonth"
        type="checkbox"
        id="byWeekdays"
      />
      <label for="byMonth">
        Repeat every <months v-model.number="months" />
      </label>
    </div>

    <div v-if="model.frequency !== 'DAILY'">
      <div v-if="options.hasWeekdays">
        <h3>Days of the week</h3>

        <row
          v-for="(_, key) in weekdays"
          :key="key"
          @delete="weekdays.splice(key, 1)">
          <weekdays
            v-model="weekdays[key]"
            :multiple="model.frequency !== 'WEEKLY'"
          />
        </row>

        <a @click="weekdays.push('SU')">+ Add a day of the week</a>
      </div>

      <div v-if="options.hasMonthdays">
        <h3>Days of the month</h3>

        <row
          v-for="(_, key) in monthdays"
          :key="key"
          @delete="monthdays.splice(key, 1)">
          <nth
            v-model="monthdays[key]"
            :range="31"
            type="day of the month"
          />
        </row>

        <a @click="monthdays.push(1)">+ Add a day of the month</a>
      </div>
    </div>

    <h3>Repeats until</h3>

    <p>
      <input
        v-model="options.hasEndDate"
        @change="options.hasCount = false"
        type="checkbox"
        id="repeatUntilDate"
      />
      <label for="repeatUntilDate">A specific date</label>
      <input
        v-show="options.hasEndDate"
        v-model="until"
        :disabled="!options.hasEndDate"
        type="date"
        placeholder="yyyy/mm/dd"
      />

      <br />

      <input
        v-model="options.hasCount"
        @change="options.hasEndDate = false"
        type="checkbox"
        id="repeatUntilcount"
      />
      <label for="repeatUntilcount">A number of occurrences</label>
      <input
        v-show="options.hasCount"
        v-model.number="model.count"
        type="number"
        min="1"
        step="1"
        :size="1"
        class="input"
      />
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, watch, ref } from 'vue'
import CalendarRecurrence from '../../../../src/types/CalendarRecurrence'
import Months from '../inputs/Months.vue'
import Nth from '../inputs/Nth.vue'
import Plural from '../displays/Plural.vue'
import Row from '../displays/Row.vue'
import Weekdays from './Weekdays.vue'

export default defineComponent({
  name: 'Recurrence',
  components: {
    Months,
    Nth,
    Plural,
    Row,
    Weekdays
  },
  props: {
    modelValue: {
      type: Object as PropType<CalendarRecurrence>,
      required: true
    }
  },
  setup (_, { emit }) {
    const frequencies = [
      'DAILY',
      'WEEKLY',
      'MONTHLY',
      'YEARLY'
    ]
    const model = ref<CalendarRecurrence>({
      interval: 1,
      count: 1,
      frequency: 'DAILY'
    })
    const months = ref(1)
    const options = ref({
      hasEndDate: false,
      hasCount: false,
      byMonth: false,
      hasWeekdays: false,
      hasMonthdays: false
    })
    const monthdays = ref<number[]>([])
    const weekdays = ref<string[]>([])
    const until = ref('')
    const refs = [
      model,
      months,
      options,
      monthdays,
      weekdays,
      until
    ]

    const intervalType = computed(() => {
      return model.value.frequency!
        .toLowerCase()
        .replace('ly', '')
        .replace('dai', 'day')
    })

    function getRecurrence (): CalendarRecurrence {
      const recurrence: CalendarRecurrence = { ...model.value }

      if (model.value.frequency !== 'DAILY' && weekdays.value.length) {
        if (options.value.hasWeekdays && weekdays.value.length) {
          recurrence.weekdays = weekdays.value
        }

        if (options.value.hasMonthdays && monthdays.value.length) {
          recurrence.monthdays = monthdays.value
        }
      }

      if (model.value.frequency === 'YEARLY' && options.value.byMonth) {
        recurrence.month = months.value
      }

      if (options.value.hasEndDate && until.value) {
        recurrence.end = new Date(until.value)
      }

      if (!options.value.hasCount) {
        delete recurrence.count
      }

      return recurrence
    }

    refs.forEach(ref => watch(ref, () => {
      emit('update:modelValue', getRecurrence())
    }, {
      immediate: true,
      deep: true
    }))

    return {
      frequencies,
      model,
      options,
      months,
      monthdays,
      weekdays,
      until,
      intervalType
    }
  }
})
</script>
