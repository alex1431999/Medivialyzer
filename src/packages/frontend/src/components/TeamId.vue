<script setup lang="ts">
import { VBtn, VIcon, VTextField } from 'vuetify/components'

const props = defineProps<{ id: string }>()

const handleCopy = async () => {
  await navigator.clipboard.writeText(props.id)
}
</script>

<template>
  <div class="d-flex ga-2">
    <v-text-field
      disabled
      hide-details
      label="Team ID"
      :model-value="props.id"
    />

    <v-btn icon variant="text" color="primary" @click="handleCopy">
      <v-icon color="secondary"> mdi-content-copy </v-icon>
    </v-btn>
  </div>
</template>
