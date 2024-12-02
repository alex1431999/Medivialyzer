<script setup lang="ts">
import { defineProps } from 'vue'
import LootListItem from './LootListItem.vue'
import {Loot} from "../utils/loot/loot.types.ts";
import {groupLoot} from "../utils/loot/loot.helpers.ts";

const { loot } = defineProps<{ loot: Loot[] }>()
const lootGrouped = groupLoot(loot)

</script>

<template>
  <LootListItem v-for="lootEntry in lootGrouped" :loot-entry="lootEntry"></LootListItem>
</template>