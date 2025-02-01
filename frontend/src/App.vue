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

setInterval(() => {
  lootDataStore.update()
}, FIVE_SECONDS)

watch(
  () => configStore.config.lootFilePath,
  () => {
    lootDataStore.update()
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
