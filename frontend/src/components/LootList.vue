<script setup lang="ts">
import {computed, defineProps} from 'vue'
import LootListItem from './LootListItem.vue'
import {Loot} from "../utils/loot/loot.types.ts";
import {groupLoot} from "../utils/loot/loot.helpers.ts";
import LootListMenu from "./LootListMenu.vue";
import * as _ from "lodash";

const { loot } = defineProps<{ loot: Loot[] }>()
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