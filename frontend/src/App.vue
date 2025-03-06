<script setup lang="ts">
import LootList from './components/LootList.vue'
import Header from './components/Header.vue'
import UpgradeNotification from './components/UpgradeNotification.vue'
import { FIVE_SECONDS } from './constants/time.ts'
import { watch } from 'vue'
import { useLootDataStore } from './stores/lootDataStore.ts'
import { useConfigStore } from './stores/configStore.ts'

const lootDataStore = useLootDataStore()
const configStore = useConfigStore()

lootDataStore.update({ since: configStore.config.since })

setInterval(() => {
  lootDataStore.update({ since: configStore.config.since })
}, FIVE_SECONDS)

// Update when the loot path changes
watch(
  () => configStore.config.lootFilePath,
  () => {
    lootDataStore.update({ since: configStore.config.since })
  },
)

// Update when since changes
watch(
  () => configStore.config.since,
  () => {
    lootDataStore.update({ since: configStore.config.since })
  },
)
</script>

<template>
  <Header class="app__header" />
  <LootList />
  <UpgradeNotification />
</template>

<style scoped>
.app__header {
  margin-bottom: 16px;
}
</style>
