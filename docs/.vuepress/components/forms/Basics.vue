<template>
  <div class="details">
    <div class="details__field">
      <label for="title">Event Title</label>
      <br />
      <input
        v-model="model.title"
        type="text"
        id="title"
        class="details__input"
        placeholder="A quick summary of the event"
      />
    </div>
    <div class="details__field">
      <label for="location">Location</label>
      <br />
      <input
        v-model="model.location"
        type="text"
        id="location"
        class="details__input"
        placeholder="Where does this event take place?"
      />
    </div>
    <div class="details__field">
      <label for="description">Details</label>
      <br />
      <textarea
        v-model="model.description"
        id="description"
        class="details__textarea"
        placeholder="Give some event details..."
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, watch, ref } from 'vue'
import CalendarOptions from '../../../../src/types/CalendarOptions'

export default defineComponent({
  name: 'Basics',
  props: {
    modelValue: {
      type: Object as PropType<CalendarOptions>,
      required: true
    }
  },
  setup (props, { emit }) {
    const model = ref<CalendarOptions>({
      title: '',
      description: '',
      location: '',
      start: new Date()
    })

    watch(props.modelValue, value => {
      model.value = value
    }, {
      immediate: true,
      deep: true
    })

    watch(model, value => {
      emit('update:modelValue', value)
    }, {
      immediate: true,
      deep: true
    })

    return { model }
  }
})
</script>

<style>
.details__field {
  margin-bottom: 1rem;
}

.details__textarea {
  width: 100%;
  height: 10rem;
}

.details__input {
  width: 100%;
  text-align: left;
}
</style>
