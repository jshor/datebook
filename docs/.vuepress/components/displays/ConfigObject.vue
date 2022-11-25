<template>
  <div class="language-typescript">
    <pre class="language-typescript">{{ data }}</pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import CalendarOptions from '../../../../src/types/CalendarOptions'

export default defineComponent({
  name: 'ConfigObject',
  props: {
    value: {
      type: Object as PropType<CalendarOptions>,
      required: true
    }
  },
  setup (props) {
    const data = computed(() => {
      return JSON
        .stringify(props.value, null, 2)
        .replace(/"([a-z]+)":/gi, '$1:')
        .replace(/"/g, '\'')
        .replace(/(start|end):\s+'([^']+)'/ig, '$1: new Date(\'$2\')')
    })

    return { data }
  }
})
</script>
