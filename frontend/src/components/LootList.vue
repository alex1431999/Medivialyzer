<script setup lang="ts">
import {computed, ref} from 'vue'
import LootListItem from './LootListItem.vue'
import {groupLoot} from "../utils/loot/loot.helpers.ts";
import LootListMenu from "./LootListMenu.vue";
import * as _ from "lodash";
import {lootReader} from "../utils/lootReader/lootReader.ts";

const ignoredItems = ref<Set<string>>(new Set())

const since = ref<number>(0)

const loot = computed(() => lootReader.getLoot(since.value))

const filteredLoot = computed(() => loot.value.filter(item => !ignoredItems.value.has(item.item.name)))

const lootGrouped = computed(() => groupLoot(filteredLoot.value))

const totalLootValue = computed(() => {
  const values = lootGrouped.value.map(lootEntry => lootEntry.item.value * lootEntry.amount)
  return _.sum(values)
})

function onHuntReset() {
  since.value = Date.now()

function onIgnoreItem(item: Item) {
  ignoredItems.value.add(item.name)
}

}

</script>

<template>
  <div class="loot-list__items">
    <LootListItem class="loot-list__list-item" v-for="lootEntry in lootGrouped" :key="lootEntry.item.name" :loot-entry="lootEntry" @ignore-item="onIgnoreItem"></LootListItem>
  </div>
  <LootListMenu :total-loot-value="totalLootValue" :ignored-items="ignoredItems" @reset="onHuntReset"/>
</template>

<style scoped>
.loot-list__items {
  height: 70vh
}

.loot-list__list-item {
  margin-bottom: 16px;
}
</style>