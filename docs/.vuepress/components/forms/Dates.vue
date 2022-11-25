<template>
  <div class="dates">
    <div class="dates__field">
      <label for="start">Date start</label>
      <br />
      <input
        v-model="start"
        type="datetime-local"
        id="start"
        class="dates__input"
        placeholder="YYYY-MM-DDThh:mm:ss"
      />
    </div>
    <div class="dates__field">
      <label for="end">Date end</label>
      <br />
      <input
        v-model="end"
        :disabled="allday"
        type="datetime-local"
        id="end"
        class="dates__input"
        placeholder="YYYY-MM-DDThh:mm:ss"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, watch, ref } from 'vue'
import CalendarOptions from '../../../../src/types/CalendarOptions'

export default defineComponent({
  name: 'Dates',
  props: {
    modelValue: {
      type: Object as PropType<CalendarOptions>,
      required: true
    },
    allday: {
      type: Boolean,
      default: true
    }
  },
  setup (props, { emit }) {
    const model = ref<CalendarOptions>()
    const start = ref('')
    const end = ref('')

    watch(() => props.allday, () => {
      end.value = ''
    }, { immediate: true })

    watch(props.modelValue, value => {
      start.value = (new Date(value.start)).toISOString()
      end.value = value.end
        ? (new Date(value.end)).toISOString()
        : ''
    }, {
      immediate: true,
      deep: true
    })

    watch(model, () => {
      emit('update:modelValue', {
        ...props.modelValue,
        start: new Date(start.value),
        end: end.value
          ? new Date(end.value)
          : undefined
      })
    }, {
      immediate: true,
      deep: true
    })

    return { start, end }
  }
})
</script>

<style>
.dates {
  display: flex;
  width: 100%;
}

.dates__field {
  flex: 1;
  padding: 0 1rem 0.5rem 0;
}

.dates__input {
  width: 100%;
}
</style>
