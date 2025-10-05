<script setup lang="ts">
import { VDataTable, VIcon } from 'vuetify/components'

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
    :items-per-page="-1"
    density="compact"
    fixed-header
    height="280px"
    hide-default-footer
    class="data-table"
  >
    <template v-slot:header.name="{ column }">
      <span class="d-inline-flex align-center text-secondary">
        <v-icon icon="mdi-paw" class="mr-1" color="secondary" />
        {{ column.title }}
      </span>
    </template>

    <template v-slot:header.amount="{ column }">
      <span class="d-inline-flex align-center text-secondary">
        <v-icon icon="mdi-counter" class="mr-1" color="secondary" />
        {{ column.title }}
      </span>
    </template>

    <template v-slot:header.killsPerHour="{ column }">
      <span class="d-inline-flex align-center text-secondary">
        <v-icon icon="mdi-sword-cross" class="mr-1" color="secondary" />
        {{ column.title }}
      </span>
    </template>

    <template v-slot:header.avgLoot="{ column }">
      <span class="d-inline-flex align-center text-secondary">
        <v-icon icon="mdi-gold" class="mr-1" color="secondary" />
        {{ column.title }}
      </span>
    </template>

    <template v-slot:item.avgLoot="{ item }">
      {{ item.avgLoot.toFixed() }}
    </template>
  </v-data-table>
</template>
