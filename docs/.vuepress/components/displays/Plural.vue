<template>
  <span>
    {{ text }}{{ n > 1 ? 's' : '' }}
  </span>
</template>

<script>
export default {
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
}
</script>