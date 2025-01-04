<script setup lang="ts">
import { VTextField, VBtn } from 'vuetify/components'
import { useConfigStore } from '../stores/configStore.ts'
import { electron } from '../utils/electron/electron.constants.ts'

const configStore = useConfigStore()

async function selectLootFile() {
  const path = await electron.openFileDialog()

  if (path) {
    configStore.setLootFilePath(path)
  }
}
</script>

<template>
  <div>
    <div class="d-flex ga-2">
      <v-text-field
        label="Loot file path"
        :value="configStore.config.lootFilePath"
      />
      <v-btn @click="selectLootFile" icon="mdi-file-search" />
    </div>
  </div>
</template>
