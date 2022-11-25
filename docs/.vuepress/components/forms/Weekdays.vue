<template>
  <div>
    Repeat every

    <select
      v-if="multiple"
      v-model.number="scalar"
      @change="change">
      <option value="1">first</option>
      <option value="-1">last</option>
    </select>

    <input
      v-if="multiple"
      v-model.number="interval"
      @change="change"
      type="number"
      step="1"
      min="1"
      max="5"
      :size="1"
    />

    <select
      v-model="weekday"
      @change="change">
      <option
        v-for="weekday in weekdays"
        :value="weekday.substr(0, 2).toUpperCase()"
        :key="weekday">
        <plural
          :text="weekday"
          :n="interval"
        />
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from 'vue'
import Plural from '../displays/Plural.vue'

export default defineComponent({
  name: 'Weekdays',
  components: {
    Plural
  },
  props: {
    modelValue: {
      type: String,
      required: true
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const weekdays = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ]
    const scalar = ref(1)
    const interval = ref(1)
    const weekday = ref('SU')

    watch(() => props.modelValue, newValue => {
      const data = newValue.match(/^([\-0-9]+)?([A-Z]{2})$/)

      if (data?.length) {
        const i = parseInt(data[1], 10)

        scalar.value = i < 0 ? -1 : 1
        interval.value = Math.abs(i || 1)
        weekday.value = data[2]
      }
    }, { immediate: true })

    function change () {
      emit('update:modelValue', [
        scalar.value * interval.value,
        weekday.value
      ].join(''))
    }

    return {
      weekdays,
      scalar,
      interval,
      weekday,
      change
    }
  }
})
</script>
