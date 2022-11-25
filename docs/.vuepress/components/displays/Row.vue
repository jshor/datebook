<template>
  <div class="row">
    <div
      class="row__delete"
      @click="$emit('delete')">
      &times;
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Row',
  emits: ['delete']
})
</script>

<style>
.row {
  background-color: var(--c-bg-lighter);
  padding: 0.5rem;
  display: flex;
  align-items: center;
  vertical-align: middle;
  margin-bottom: 0.5rem;
  border-radius: 6px;
}

.row__delete {
  color: var(--c-danger);
  margin-right: 0.5rem;
  font-weight: bold;
  font-size: 1.5rem;
  cursor: pointer;
  font-family: monospace;
}

.row__delete:hover {
  color: var(--c-danger-text);
}
</style>
