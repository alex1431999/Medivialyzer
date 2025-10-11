<script setup lang="ts">
import LootList from './loot/LootList.vue'
import { useLootDataStore } from '../stores/lootDataStore.ts'
import { useConfigStore } from '../stores/configStore.ts'
import { useClientStore } from '../stores/clientStore.ts'
import { useTeamStore } from '../stores/teamStore.ts'
import { baserowPing } from '../utils/baserow/baserow.requests.ts'
import { getAllItems } from '../utils/item/item.helpers.ts'
import { watch } from 'vue'
const lootDataStore = useLootDataStore()
const configStore = useConfigStore()
const clientStore = useClientStore()
const teamStore = useTeamStore()

// When the client boots up we want to send a ping
baserowPing(configStore.config.clientId)

configStore.onBoot()
clientStore.onBoot()

lootDataStore.init()

// Only try to load the teamStore once client has been initialised
watch(
  () => clientStore.initialized,
  () => {
    teamStore.onBoot()
  },
)

// Update when the loot path changes
watch(
  () => configStore.config.lootFilePath,
  () => {
    lootDataStore.updateOptions({
      since: configStore.config.since,
      items: getAllItems(),
    })
  },
)

// Update when since changes
watch(
  () => configStore.config.since,
  () => {
    lootDataStore.updateOptions({
      since: configStore.config.since,
      items: getAllItems(),
    })
  },
)

// Update when custom items change
watch(
  () => configStore.config.customItems,
  () => {
    lootDataStore.updateOptions({
      since: configStore.config.since,
      items: getAllItems(),
    })
  },
  { deep: true },
)
</script>

<template>
  <LootList />
</template>
