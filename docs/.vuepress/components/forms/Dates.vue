<template>
  <div class="dates">
    <div class="dates__field">
      <label for="start">Date start</label>
      <br />
      <input
        v-model="model.start"
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
        v-model="model.end"
        :disabled="isAllDay"
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
    isAllDay: {
      type: Boolean,
      default: true
    }
  },
  setup (props, { emit }) {
    const model = ref({
      start: (new Date()).toISOString(),
      end: ''
    })

    watch(props.modelValue, value => {
      model.value.start = (new Date(value.start)).toISOString()
      model.value.end = value.end
        ? (new Date(value.end)).toISOString()
        : ''
    }, {
      immediate: true,
      deep: true
    })

    watch(() => props.isAllDay, update, { immediate: true })

    watch(model, update, {
      immediate: true,
      deep: true
    })

    function update () {
      emit('update:modelValue', {
        ...props.modelValue,
        start: new Date(model.value.start),
        end: model.value.end && !props.isAllDay
          ? new Date(model.value.end)
          : undefined
      })
    }

    return { model }
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
