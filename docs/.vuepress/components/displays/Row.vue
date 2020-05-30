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

<script>
export default {
  name: 'Row'
}
</script>

<style>
.row {
  background-color: #e8e8e8;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  vertical-align: middle;
  margin-bottom: 0.5rem;
  border-radius: 6px;
}

.row__delete {
  color: #A63232;
  margin-right: 0.5rem;
  font-weight: bold;
  font-size: 1.5rem;
  cursor: pointer;
  font-family: monospace;
}

.row__delete:hover {
  color: red;
}
</style>