<script setup lang="ts">
import { VTextField } from 'vuetify/components'
import { useConfigStore } from '../stores/configStore.ts'

const configStore = useConfigStore()
</script>

<template>
  <div>
    <v-text-field
      label="Loot file path"
      :value="configStore.config.lootFilePath"
    />
  </div>
</template>
