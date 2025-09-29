<script setup lang="ts">
import { VDataTable } from 'vuetify/components'

export type CreaturesKilledTableItem = {
  name: string
  amount: number
  killsPerHour?: number
  avgLoot: number
}

const { items } = defineProps<{
  items: CreaturesKilledTableItem[]
}>()

const headers = [
  { title: 'Creature', key: 'name', align: 'start' },
  { title: 'Amount', key: 'amount', align: 'end' },
  { title: 'Kills/h', key: 'killsPerHour', align: 'end' },
  { title: 'Avg. Loot', key: 'avgLoot', align: 'end' },
] as const
</script>

<template>
  <v-data-table
    v-if="items.length"
    :headers="headers"
    :items="items"
    density="compact"
    fixed-header
    height="280px"
    hide-default-footer
  >
    <template v-slot:item.avgLoot="{ item }">
      {{ item.avgLoot.toFixed(2) }}
    </template>
  </v-data-table>
</template>
