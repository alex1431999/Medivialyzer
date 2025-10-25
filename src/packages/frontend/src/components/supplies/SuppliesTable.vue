<script setup lang="ts">
import { VDataTable, VIcon, VTextField } from 'vuetify/components'
import { useSuppliesStore } from '../../stores/suppliesStore.ts'

export type SuppliesTableItem = {
  name: string
  isFavorite: boolean
  before: number
  after: number
  cost: number
}

const suppliesStore = useSuppliesStore()

defineProps<{
  items: SuppliesTableItem[]
}>()

const emit = defineEmits<{
  (
    e: 'update:favorite',
    payload: { item: SuppliesTableItem; value: boolean },
  ): void
}>()

const headers = [
  {
    title: 'Favorite',
    key: 'favorite',
    sortable: false,
    width: '1%',
    align: 'start',
  },
  { title: 'Item', key: 'name', align: 'start', sortable: false },
  { title: 'Before', key: 'before', sortable: false, align: 'start' },
  { title: 'After', key: 'after', sortable: false, align: 'start' },
  { title: 'Cost', key: 'cost', align: 'start', sortable: false },
] as const

function onFavoriteClick(item: SuppliesTableItem, value: boolean) {
  emit('update:favorite', { item, value })
}

function itemHasBeforeValue(item: SuppliesTableItem) {
  const before = suppliesStore.supplies[item.name].before
  return before !== undefined && before !== null && before !== ''
}

function itemHasAfterValue(item: SuppliesTableItem) {
  const before = suppliesStore.supplies[item.name].after
  return before !== undefined && before !== null && before !== ''
}

function getBeforeColor(item: SuppliesTableItem): string | undefined {
  return itemHasBeforeValue(item) ? 'success' : undefined
}

function getAfterColor(item: SuppliesTableItem): string | undefined {
  if (itemHasBeforeValue(item)) {
    return itemHasAfterValue(item) ? 'success' : 'warning'
  }

  return undefined
}

function handleEnterKey(event: KeyboardEvent) {
  const currentInput = event.target as HTMLInputElement
  const currentTd = currentInput.closest('td')
  const currentRow = currentInput.closest('tr')

  if (!currentTd || !currentRow) return

  const currentCellIndex = Array.from(currentRow.children).indexOf(currentTd)
  const nextRow = currentRow.nextElementSibling

  if (nextRow) {
    const nextRowCells = Array.from(nextRow.children)
    const targetCell = nextRowCells[currentCellIndex]

    if (targetCell) {
      const nextInput = targetCell.querySelector('input')
      if (nextInput) {
        nextInput.focus()
      }
    }
  }
}
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :sort-by="[]"
    density="compact"
    fixed-header
    height="300px"
    hide-default-footer
    class="data-table"
  >
    <template v-slot:header.favorite="{ column }">
      <span class="d-inline-flex align-center text-secondary">
        <v-icon icon="mdi-star" class="mr-1" color="secondary" />
        {{ column.title }}
      </span>
    </template>

    <template v-slot:header.name="{ column }">
      <span class="d-inline-flex align-center text-secondary">
        <v-icon icon="mdi-package-variant" class="mr-1" color="secondary" />
        {{ column.title }}
      </span>
    </template>

    <template v-slot:header.before="{ column }">
      <span class="d-inline-flex align-center text-secondary">
        <v-icon
          icon="mdi-arrow-up-bold-box-outline"
          class="mr-1"
          color="secondary"
        />
        {{ column.title }}
      </span>
    </template>

    <template v-slot:header.after="{ column }">
      <span class="d-inline-flex align-center text-secondary">
        <v-icon
          icon="mdi-arrow-down-bold-box-outline"
          class="mr-1"
          color="secondary"
        />
        {{ column.title }}
      </span>
    </template>

    <template v-slot:header.cost="{ column }">
      <span class="d-inline-flex align-center text-secondary">
        <v-icon icon="mdi-gold" class="mr-1" color="secondary" />
        {{ column.title }}
      </span>
    </template>

    <template v-slot:item.favorite="{ item }">
      <v-icon v-if="item.isFavorite" @click="onFavoriteClick(item, false)">
        mdi-star
      </v-icon>
      <v-icon v-else @click="onFavoriteClick(item, true)">
        mdi-star-outline
      </v-icon>
    </template>

    <template v-slot:item.before="{ item }">
      <v-text-field
        v-model="suppliesStore.supplies[item.name].before"
        type="number"
        variant="outlined"
        density="compact"
        hide-details
        class="pa-2"
        :color="getBeforeColor(item)"
        :base-color="getBeforeColor(item)"
        @keydown.enter.prevent="handleEnterKey($event)"
      />
    </template>

    <template v-slot:item.after="{ item }">
      <v-text-field
        v-model="suppliesStore.supplies[item.name].after"
        type="number"
        variant="outlined"
        density="compact"
        hide-details
        :color="getAfterColor(item)"
        :base-color="getAfterColor(item)"
        @keydown.enter.prevent="handleEnterKey($event)"
      />
    </template>

    <template v-slot:item.cost="{ item }">
      <v-text-field
        v-model="suppliesStore.supplies[item.name].cost"
        type="number"
        variant="outlined"
        density="compact"
        hide-details
        @keydown.enter.prevent="handleEnterKey($event)"
      />
    </template>
  </v-data-table>
</template>
