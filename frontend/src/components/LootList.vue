<script setup lang="ts">
import {computed, ref} from 'vue'
import LootListItem from './LootListItem.vue'
import {groupLoot} from "../utils/loot/loot.helpers.ts";
import LootListMenu from "./LootListMenu.vue";
import * as _ from "lodash";
import {lootReader} from "../utils/lootReader/lootReader.ts";

const since = ref<number>(0)

const loot = computed(() => lootReader.getLoot(since.value))

const lootGrouped = computed(() => groupLoot(loot.value))

const totalLootValue = computed(() => {
  const values = lootGrouped.value.map(lootEntry => lootEntry.item.value * lootEntry.amount)
  return _.sum(values)
})

function onHuntReset() {
  since.value = Date.now()
}

</script>

<template>
  <LootListMenu class="loot-list__menu" :total-loot-value="totalLootValue" @reset="onHuntReset"/>
  <LootListItem class="loot-list__list-item" v-for="lootEntry in lootGrouped" :key="lootEntry.item.name" :loot-entry="lootEntry"></LootListItem>
</template>

<style scoped>
.loot-list__menu {
  margin-bottom: 16px;
}

.loot-list__list-item {
  margin-bottom: 16px;
}
</style>