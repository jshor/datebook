<template>
  <select @change="update">
    <option
      v-for="(month, index) in months"
      :selected="(index + 1) === modelValue"
      :key="index"
      :value="(index + 1)">
      {{ month }}
    </option>
  </select>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Months',
  props: {
    modelValue: {
      type: Number,
      default: 1
    }
  },
  setup (_, { emit }) {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]

    function update ({ target }) {
      emit('update:modelValue', target.value)
    }

    return {
      months,
      update
    }
  }
})
</script>
