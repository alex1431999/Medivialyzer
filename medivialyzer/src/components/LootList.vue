<script setup lang="ts">
import { defineProps } from 'vue'
import { Loot } from '../utils/lootReader/lootReader.types'
import LootListItem from './LootListItem.vue'

const { loot } = defineProps<{ loot: Loot[] }>()

</script>

<template>
  <LootListItem v-for="lootEntry in loot" :loot-entry="lootEntry"></LootListItem>
</template>