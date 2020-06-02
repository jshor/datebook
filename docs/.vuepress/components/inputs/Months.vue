<template>
  <select @change="change">
    <option
      v-for="(month, index) in months"
      :selected="(index + 1) === value"
      :key="index"
      :value="(index + 1)">
      {{ month }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'Months',
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      months: [
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
    }
  },
  methods: {
    change ({ target }) {
      this.$emit('input', target.value)
    }
  }
}
</script>