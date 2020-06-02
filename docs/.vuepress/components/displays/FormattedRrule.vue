<template>
  <span>{{ JSON.stringify(data) }}</span>
</template>

<script>
export default {
  name: 'FormattedRrule',
  props: ['data']
}
</script>