<template>
  <div>
    Repeat every

    <select
      v-if="multiple"
      v-model.number="recurrence.scalar"
      @change="change">
      <option value="1">first</option>
      <option value="-1">last</option>
    </select>

    <input
      v-if="multiple"
      v-model.number="recurrence.interval"
      @change="change"
      type="number"
      step="1"
      min="1"
      max="5"
      size="1"
    />

    <select
      v-model="recurrence.weekday"
      @change="change">
      <option
        v-for="weekday in weekdays"
        :value="weekday.substr(0, 2).toUpperCase()"
        :key="weekday">
        <plural
          :text="weekday"
          :n="recurrence.interval"
        />
      </option>
    </select>
  </div>
</template>

<script>
import Plural from '../displays/Plural.vue'

export default {
  name: 'Weekdays',
  components: {
    Plural
  },
  props: {
    value: {
      type: String,
      required: true
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      recurrence: {
        scalar: 1,
        interval: 1,
        weekday: 'SU'
      },
      weekdays: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ]
    }
  },
  methods: {
    change () {
      this.$emit('input', [
        this.recurrence.scalar * this.recurrence.interval,
        this.recurrence.weekday
      ].join(''))
    }
  },
  watch: {
    value: {
      handler (newValue) {
        const data = newValue.match(/^([\-0-9]+)?([A-Z]{2})$/)

        if (data.length) {
          const interval = parseInt(data[1], 10)

          this.recurrence = {
            scalar: interval < 0 ? -1 : 1,
            interval: Math.abs(interval || 1),
            weekday: data[2]
          }
        }
      },
      immediate: true
    }
  }
}
</script>