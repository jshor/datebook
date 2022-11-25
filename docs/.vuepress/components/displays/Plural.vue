<template>
  <span>
    {{ text }}{{ n > 1 ? 's' : '' }}
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Plural',
  props: {
    text: {
      type: String,
      required: true
    },
    n: {
      type: Number,
      default: 1
    }
  }
})
</script>
