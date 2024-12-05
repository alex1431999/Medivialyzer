<script setup lang="ts">
import {computed, ref} from 'vue'
import LootListItem from './LootListItem.vue'
import {groupLoot} from "../utils/loot/loot.helpers.ts";
import LootListMenu from "./LootListMenu.vue";
import * as _ from "lodash";
import {LootReader} from "../utils/lootReader/lootReader.ts";
import {electron} from "../utils/electron/electron.constants.ts";
import {useConfigStore} from "../stores/configStore.ts";

const config = useConfigStore()

const lootData = ref<string>('')

// Update the loot data regularly
setInterval(() => {
  lootData.value = electron.getLootData()
}, 1000) // TODO increase the timeout for production

const loot = computed(() => {
  const lootReader = new LootReader(lootData.value)
  return lootReader.getLoot(config.since)
})

const lootGrouped = computed(() => groupLoot(loot.value))
const lootSorted = computed(() => lootGrouped.value.sort((a, b) =>
    (a.amount * a.item.value) > (b.amount * b.item.value) ? -1 : 1
))

const totalLootValue = computed(() => {
  const values = lootGrouped.value.map(lootEntry => lootEntry.item.value * lootEntry.amount)
  return _.sum(values)
})

function onHuntReset() {
  config.$patch({ since: Date.now() })
}

</script>

<template>
  <div class="loot-list__items">
    <LootListItem class="loot-list__list-item" v-for="lootEntry in lootSorted" :key="lootEntry.item.name" :loot-entry="lootEntry"></LootListItem>
  </div>
  <LootListMenu class="loot-list__menu" :total-loot-value="totalLootValue" @reset="onHuntReset"/>
</template>

<style scoped>
.loot-list__items {
  height: 65vh;
  overflow-y: scroll;
}

.loot-list__list-item {
  margin-bottom: 16px;
}

.loot-list__menu {
  margin-top: 16px;
}
</style>