<template>
  <div>
    <h2>Event Details</h2>

    <basics v-model="model" />

    <dates
      v-model="model"
      :isAllDay="isAllDay"
    />
    <input
      v-model="isAllDay"
      type="checkbox"
      id="isAllDay"
      value="true"
    />
    <label for="isAllDay">This is an all-day event</label>

    <div>
      <h2>Recurrence</h2>

      <input
        v-model="isRecurring"
        type="checkbox"
        id="recurs"
        @change="onRecurrenceChange"
      />
      <label for="recurs">This event repeats</label>
    </div>

    <recurrence
      v-if="model.recurrence"
      v-model="model.recurrence"
      :isAllDay="isAllDay"
    />

    <h2>Result</h2>

    <div>
      <h3>Calendar Service Links</h3>
      <ul>
        <li
          v-for="(value, key) in serviceUrls"
          :key="key"
        >
          <a
            :href="value"
            target="_blank">
            {{ key }} Calendar
            <external-link-icon />
          </a>
        </li>
      </ul>
    </div>

    <hr />

    <div>
      <h3>iCalendar</h3>
      <a @click="ics.download()">
        Download <code>.ics</code> file ↓
      </a>
      <div class="language-typescript">
        <pre class="language-json">{{ ics.render() }}</pre>
      </div>
    </div>

    <hr />

    <div>
      <h3>Datebook Config Object</h3>
      <config-object :value="model" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import GoogleCalendar from '../../../src/GoogleCalendar'
import YahooCalendar from '../../../src/YahooCalendar'
import OutlookCalendar from '../../../src/OutlookCalendar'
import ICalendar from '../../../src/ICalendar'
import CalendarOptions from '../../../src/types/CalendarOptions'
import ConfigObject from './displays/ConfigObject.vue'
import Basics from './forms/Basics.vue'
import Dates from './forms/Dates.vue'
import Recurrence from './forms/Recurrence.vue'

export default defineComponent({
  name: 'Generator',
  components: {
    ConfigObject,
    Basics,
    Dates,
    Recurrence
  },
  setup () {
    const model = ref<CalendarOptions>({
      start: new Date(),
      location: '',
      title: '',
      description: '',
      recurrence: {}
    })
    const isAllDay = ref(true)
    const isRecurring = ref(true)
    const calendars = {
      'Google': GoogleCalendar,
      'Yahoo!': YahooCalendar,
      'Outlook': OutlookCalendar
    }

    const serviceUrls = computed((): Record<string, string> => {
      return Object
        .keys(calendars)
        .reduce((serviceUrls, serviceName) => ({
          ...serviceUrls,
          [serviceName]: (new calendars[serviceName](model.value)).render()
        }), {})
    })

    const ics = computed(() => new ICalendar(model.value))

    function onRecurrenceChange () {
      model.value.recurrence = isRecurring.value
        ? {}
        : undefined
    }

    return {
      isAllDay,
      isRecurring,
      model,
      serviceUrls,
      ics,
      onRecurrenceChange
    }
  }
})
</script>

<style>
input, select {
  font-family: var(--font-family);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
  text-align: center;
  padding: 0.25em;
}

input[type="checkbox"] {
  margin: 0 0.5em;
}

.input {
  max-width: 50px;
  margin: 0 0.5em;
  padding: 0;
}

select {
  background-color: var(--c-bg);
  border-color: var(--c-bg);
  box-sizing: border-box;
  text-align: left;
}

a {
  cursor: pointer;
}
</style>
