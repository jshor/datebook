<template>
  <div>
    Repeat every
    <select @input="update">
      <option
        v-for="n in range"
        :key="n"
        :value="n"
        :selected="value === n">
        {{ n }}
      </option>
    </select>
    <span v-if="value === 1">st</span>
    <span v-else-if="value === 2">nd</span>
    <span v-else-if="value === 3">rd</span>
    <span v-else>th</span>
    {{ type }}
  </div>
</template>

<script>
export default {
  name: 'Nth',
  props: {
    value: {
      type: Number,
      default: 1
    },
    range: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  methods: {
    update ({ target }) {
      this.$emit('input', parseInt(target.value, 10))
    }
  }
}
</script>