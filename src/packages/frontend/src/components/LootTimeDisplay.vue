<script setup lang="ts">
import { ref, watch } from 'vue'
import { defineProps, defineEmits } from 'vue'
import moment from 'moment'
import { useConfigStore } from '../stores/configStore.ts'

const props = defineProps<{ since: number }>()
const emit = defineEmits<{
  (e: 'update:since', value: number): void
}>()

const configStore = useConfigStore()

// Initialize date and time strings from props.since
const dateString = ref(moment(props.since).format('YYYY-MM-DD'))
const timeString = ref(moment(props.since).format('HH:mm'))

watch([dateString, timeString], ([d, t]) => {
  if (!d || !t) return
  const combined = moment(`${d}T${t}`)

  if (combined.isValid()) {
    configStore.setConfig({ since: combined.valueOf() })
  }
})
</script>

<template>
  <div class="d-flex gap-2 align-center">
    <input type="date" class="v-input__control" v-model="dateString" />
    <input
      type="time"
      class="v-input__control"
      v-model="timeString"
      step="60"
    />
  </div>
</template>
