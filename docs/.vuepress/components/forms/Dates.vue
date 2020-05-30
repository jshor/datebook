<template>
  <div class="dates">
    <div class="dates__field">
      <label for="start">Date start</label>
      <br />
      <input
        v-model="data.start"
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
        v-model="data.end"
        :disabled="allday"
        type="datetime-local"
        id="end"
        class="dates__input"
        placeholder="YYYY-MM-DDThh:mm:ss"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dates',
  props: {
    value: {
      type: Object,
      required: true
    },
    allday: {
      type: Boolean,
      default: true
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
    },
    allday: {
      handler () {
        this.data.end = ''
      },
      immediate: true
    }
  }
}
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