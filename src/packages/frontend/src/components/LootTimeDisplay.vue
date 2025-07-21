<script setup lang="ts">
import { ref, watch } from 'vue'
import { defineProps } from 'vue'
import moment from 'moment'
import { useConfigStore } from '../stores/configStore.ts'
import { VTextField } from 'vuetify/components'

const props = defineProps<{ since: number }>()

const configStore = useConfigStore()

const dateString = ref(moment(props.since).format('YYYY-MM-DD'))
const timeString = ref(moment(props.since).format('HH:mm'))

watch([dateString, timeString], ([d, t]) => {
  if (!d || !t) return
  const combined = moment(`${d}T${t}`)
  if (combined.isValid()) {
    configStore.setConfig({ since: combined.valueOf() })
  }
})

// Watch for external prop changes
watch(
  () => props.since,
  (newSince) => {
    dateString.value = moment(newSince).format('YYYY-MM-DD')
    timeString.value = moment(newSince).format('HH:mm')
  },
)
</script>

<template>
  <div class="d-flex gap-4 align-center" style="max-width: 300px">
    <v-text-field
      v-model="dateString"
      label="Date"
      type="date"
      density="compact"
      variant="solo"
      rounded
      hide-details
      class="flex-grow-1"
    />
    <v-text-field
      v-model="timeString"
      label="Time"
      type="time"
      step="60"
      density="compact"
      variant="solo"
      rounded
      hide-details
      class="flex-grow-1 ml-2"
    />
  </div>
</template>
