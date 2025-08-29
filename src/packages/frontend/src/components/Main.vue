<script setup lang="ts">
import Header from './Header.vue'
import LootList from './LootList.vue'
import { useLootDataStore } from '../stores/lootDataStore.ts'
import { useConfigStore } from '../stores/configStore.ts'
import { useClientStore } from '../stores/clientStore.ts'
import { useTeamStore } from '../stores/teamStore.ts'
import { baserowPing } from '../utils/baserow/baserow.requests.ts'
import { getAllItems } from '../utils/item/item.helpers.ts'
import { watch } from 'vue'
import { FIVE_SECONDS } from '../constants/time.ts'
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
</template>

<style scoped>
.app__header {
  margin-bottom: 16px;
}
</style>
