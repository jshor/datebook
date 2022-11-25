<template>
  <div>
    Repeat every
    <select @input="update">
      <option
        v-for="n in range"
        :key="n"
        :value="n"
        :selected="modelValue === n">
        {{ n }}
      </option>
    </select>
    <span v-if="modelValue === 1">st</span>
    <span v-else-if="modelValue === 2">nd</span>
    <span v-else-if="modelValue === 3">rd</span>
    <span v-else>th</span>
    {{ type }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Nth',
  props: {
    modelValue: {
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
  setup (_, { emit }) {
    function update ({ target }) {
      emit('update:modelValue', target.value)
    }

    return { update }
  }
})
</script>
