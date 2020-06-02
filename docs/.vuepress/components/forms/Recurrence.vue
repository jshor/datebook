<template>
  <div>
    <h2>Frequency</h2>

    <span>Repeat this event</span>

    <select v-model="recurrence.frequency">
      <option
        v-for="frequency in frequencies"
        :key="frequency"
        :value="frequency">
        {{ frequency.toLowerCase() }}
      </option>
    </select>

    <p v-if="recurrence.frequency !== 'DAILY'">
      <input
        v-model="recurrence.byType.weekdays"
        @change="changeByType('monthdays')"
        :value="true"
        type="checkbox"
        id="byWeekdays"
        value="1"
      />
      <label for="byWeekdays">By days of the week</label>

      <br />

      <input
        v-model="recurrence.byType.monthdays"
        @change="changeByType('weekdays')"
        :value="true"
        type="checkbox"
        id="byMonthdays"
        value="1"
      />
      <label for="byMonthdays">By days of the month</label>
    </p>

    <h2>Interval</h2>

    <span>Repeat every</span>
    <input
      v-model.number="recurrence.interval"
      type="number"
      min="1"
      step="1"
      size="1"
      class="input"
    />
    <plural
      :text="intervalType"
      :n="recurrence.interval"
    />

    <div v-if="recurrence.frequency === 'YEARLY'">
      <h2>Months of the year</h2>

      Repeat every <months v-model.number="recurrence.month" />
    </div>

    <div v-if="recurrence.frequency !== 'DAILY'">
      <div v-if="recurrence.byType.weekdays">
        <h2>Days of the week</h2>

        <row
          v-for="(weekday, key) in recurrence.weekdays"
          :key="key"
          @delete="remove('weekdays', key)">
          <weekdays
            v-model="recurrence.weekdays[key]"
            :multiple="recurrence.frequency !== 'WEEKLY'"
          />
        </row>

        <a @click="add('weekdays', 'SU')">+ Add a day of the week</a>
      </div>

      <div v-if="recurrence.byType.monthdays">
        <h2>Days of the month</h2>

        <row
          v-for="(monthday, key) in recurrence.monthdays"
          :key="key"
          @delete="remove('monthdays', key)">
          <nth
            v-model="recurrence.monthdays[key]"
            :range="31"
            type="day of the month"
          />
        </row>

        <a @click="add('monthdays', 1)">+ Add a day of the month</a>
      </div>
    </div>

    <h2>Repeats until</h2>

    <p>
      <input
        v-model="recurrence.byRepeat.untilDate"
        @change="changeByRepeat('count')"
        :value="true"
        type="checkbox"
        id="repeatUntilDate"
      />
      <label for="repeatUntilDate">A specific date</label>
      <input
        v-show="recurrence.byRepeat.untilDate"
        v-model="recurrence.until"
        :disabled="!recurrence.byRepeat.untilDate"
        type="date"
        placeholder="yyyy/mm/dd"
      />

      <br />

      <input
        v-model="recurrence.byRepeat.count"
        @change="changeByRepeat('untilDate')"
        :value="true"
        type="checkbox"
        id="repeatUntilcount"
      />
      <label for="repeatUntilcount">A number of occurrences</label>
      <input
        v-show="recurrence.byRepeat.count"
        v-model.number="recurrence.count"
        type="number"
        min="1"
        step="1"
        size="1"
        class="input"
      />
    </p>
  </div>
</template>

<script>
import Months from '../inputs/Months.vue'
import Nth from '../inputs/Nth.vue'
import Plural from '../displays/Plural.vue'
import Row from '../displays/Row.vue'
import Weekdays from './Weekdays.vue'

export default {
  name: 'Recurrence',
  components: {
    Months,
    Nth,
    Plural,
    Row,
    Weekdays
  },
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      frequencies: [
        'DAILY',
        'WEEKLY',
        'MONTHLY',
        'YEARLY'
      ],
      recurrence: {}
    }
  },
  computed: {
    intervalType () {
      return this.recurrence.frequency === 'DAILY'
        ? 'day'
        : this.recurrence.frequency
          .toLowerCase()
          .replace('ly', '')
    }
  },
  methods: {
    changeByType (type, value) {
      this.recurrence.byType[type] = false
    },
    changeByRepeat (type, value) {
      this.recurrence.byRepeat[type] = false
    },
    add (type, value) {
      this.recurrence[type].push(value)
    },
    remove (type, index) {
      this.recurrence[type].splice(index, 1)
    }
  },
  watch: {
    value: {
      handler (value) {
        this.recurrence = value
      },
      immediate: true,
      deep: true
    },
    recurrence: {
      handler (value) {
        this.$emit('input', value)
      },
      deep: true
    }
  }
}
</script>