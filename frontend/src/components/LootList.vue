<script setup lang="ts">
import {computed} from 'vue'
import LootListItem from './LootListItem.vue'
import {groupLoot} from "../utils/loot/loot.helpers.ts";
import LootListMenu from "./LootListMenu.vue";
import * as _ from "lodash";
import {lootReader} from "../utils/lootReader/lootReader.ts";

const loot = lootReader.getLoot(0)
const lootGrouped = groupLoot(loot)

const totalLootValue = computed(() => {
  const values = lootGrouped.map(lootEntry => lootEntry.item.value * lootEntry.amount)
  return _.sum(values)
})

</script>

<template>
  <LootListMenu class="loot-list__menu" :total-loot-value="totalLootValue" />
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