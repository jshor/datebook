<template>
  <span>{{ rrule }}</span>
</template>

<script>
export default {
  name: 'RRuleText',
  props: ['data'],
  computed: {
    rrule () {
      return Object
        .keys(this.data)
        .reduce((rrule, key) => {
          const value = Array.isArray(this.data[key])
            ? this.data[key].join(',')
            : this.data[key]

          return rrule.concat(`${key}=${value}`)
        }, [])
        .join(';')
        .toUpperCase()
    }
  }
}
</script>