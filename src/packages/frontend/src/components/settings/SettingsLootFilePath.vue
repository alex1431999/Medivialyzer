<script setup lang="ts">
import { VBtn, VTextField } from 'vuetify/components'
import { useConfigStore } from '../../stores/configStore.ts'
import { electron } from '../../utils/electron/electron.constants.ts'
import { ref, watch } from 'vue'

const configStore = useConfigStore()

const path = ref<string>(configStore.config.lootFilePath || '')

watch(path, () => {
  configStore.setLootFilePath(path.value)
})

async function selectLootFile() {
  const newPath = await electron.openFileDialog()

  if (newPath) {
    path.value = newPath
  }
}
</script>

<template>
  <div class="d-flex ga-2">
    <v-text-field
      persistent-placeholder
      label="Loot file path"
      v-model="path"
    />
    <v-btn @click="selectLootFile" icon="mdi-file-search" />
  </div>
</template>
