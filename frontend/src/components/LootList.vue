<script setup lang="ts">
import { defineProps } from 'vue'
import LootListItem from './LootListItem.vue'
import {Loot} from "../utils/loot/loot.types.ts";
import {groupLoot} from "../utils/loot/loot.helpers.ts";

const { loot } = defineProps<{ loot: Loot[] }>()
const lootGrouped = groupLoot(loot)

</script>

<template>
  <LootListItem class="loot-list__list-item" v-for="lootEntry in lootGrouped" :key="lootEntry.item.name" :loot-entry="lootEntry"></LootListItem>
</template>

<style scoped>
.loot-list__list-item {
  margin-bottom: 16px;
}
</style>