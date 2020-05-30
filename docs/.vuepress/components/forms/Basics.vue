<template>
  <div class="details">
    <div class="details__field">
      <label for="title">Event Title</label>
      <br />
      <input
        v-model="data.title"
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
        v-model="data.location"
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
        v-model="data.description"
        id="description"
        class="details__textarea"
        placeholder="Give some event details..."
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Basics',
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      data: {}
    }
  },
  watch: {
    value: {
      handler (value) {
        this.data = value
      },
      immediate: true,
      deep: true
    },
    data: {
      handler (value) {
        this.$emit('input', value)
      },
      immediate: true,
      deep: true
    }
  }
}
</script>

<style>
.details {

}

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