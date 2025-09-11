<script setup lang="ts">
import { VBtn, VIcon, VTextField } from 'vuetify/components'
import { useNotifications } from '../composables/useNotifications.ts'

const props = defineProps<{ id: string }>()
const { notify } = useNotifications()

const handleCopy = async () => {
  await navigator.clipboard.writeText(props.id)
  notify('Copied to clipboard')
}
</script>

<template>
  <div class="d-flex ga-2 align-center">
    <v-text-field
      disabled
      hide-details
      label="Team ID"
      :model-value="props.id"
    />

    <v-btn icon variant="text" color="primary" @click="handleCopy" size="small">
      <v-icon color="secondary"> mdi-content-copy </v-icon>
    </v-btn>
  </div>
</template>
