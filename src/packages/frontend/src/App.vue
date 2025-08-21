<script setup lang="ts">
import LootList from './components/LootList.vue'
import Header from './components/Header.vue'
import UpgradeNotification from './components/UpgradeNotification.vue'
import { FIVE_SECONDS } from './constants/time.ts'
import { watch } from 'vue'
import { useLootDataStore } from './stores/lootDataStore.ts'
import { useConfigStore } from './stores/configStore.ts'
import { getAllItems } from './utils/item/item.helpers.ts'
import { baserowPing } from './utils/baserow/baserow.requests.ts'
import { useClientStore } from './stores/clientStore.ts'
import { useTeamStore } from './stores/teamStore.ts'

const lootDataStore = useLootDataStore()
const configStore = useConfigStore()
const clientStore = useClientStore()
const teamStore = useTeamStore()

// When the client boots up we want to send a ping
baserowPing(configStore.config.clientId)

configStore.onBoot()
clientStore.onBoot()
teamStore.onBoot()

lootDataStore.update({ since: configStore.config.since, items: getAllItems() })

setInterval(() => {
  lootDataStore.update({
    since: configStore.config.since,
    items: getAllItems(),
  })
}, FIVE_SECONDS)

// Update when the loot path changes
watch(
  () => configStore.config.lootFilePath,
  () => {
    lootDataStore.update({
      since: configStore.config.since,
      items: getAllItems(),
    })
  },
)

// Update when since changes
watch(
  () => configStore.config.since,
  () => {
    lootDataStore.update({
      since: configStore.config.since,
      items: getAllItems(),
    })
  },
)

// Update when custom items change
watch(
  () => configStore.config.customItems,
  () => {
    lootDataStore.update({
      since: configStore.config.since,
      items: getAllItems(),
    })
  },
  { deep: true },
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
