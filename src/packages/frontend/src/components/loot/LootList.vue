<script setup lang="ts">
import { computed, ref } from 'vue'
import { VAlert } from 'vuetify/components'
import LootListItem from './LootListItem.vue'
import LootListMenu from './LootListMenu.vue'
import { useConfigStore } from '../../stores/configStore.ts'
import { THIRTY_MINUTES } from '../../constants/time.ts'
import LootTimeDisplay from './LootTimeDisplay.vue'
import LootProfitDisplay from './LootProfitDisplay.vue'
import { useSuppliesStore } from '../../stores/suppliesStore.ts'
import { LootEntry } from '../../utils/loot/loot.types.ts'
import ItemAddModal from './item/ItemAddModal.vue'
import ItemEditModal from './item/ItemEditModal.vue'
import { useLootDataStore } from '../../stores/lootDataStore.ts'
import LootLuckDisplay from './LootLuckDisplay.vue'
import Loader from '../Loader.vue'
import { useLoot } from '../../composables/useLoot.ts'

const configStore = useConfigStore()
const suppliesStore = useSuppliesStore()
const lootDataStore = useLootDataStore()

const { loot, totalLootValue } = useLoot()

const itemToAddName = ref<string | null>(null)
const itemToEdit = ref<LootEntry | null>(null)

const isLootLoading = computed(() => lootDataStore.isParsingLootData)

const creatures = computed(
  () => lootDataStore.lootDataParsed.creaturesCurrentHunt,
)
const creaturesAverageLoot = computed(
  () => lootDataStore.lootDataParsed.creaturesWithAverageLoot,
)

const lootSorted = computed(() =>
  loot.value.sort((a, b) => {
    const aValue = a.item.value !== undefined ? a.item.value : -1 // -1 make sure that unknown items are at the bototm of the list
    const bValue = b.item.value !== undefined ? b.item.value : -1

    return a.amount * aValue > b.amount * bValue ? -1 : 1
  }),
)

const profit = computed(() => {
  return totalLootValue.value - suppliesStore.totalSuppliesUsed
})

const lootLuck = computed(() => {
  let expectedTotalValue = 0

  creatures.value.forEach((creature) => {
    const creatureAverageLootFound = creaturesAverageLoot.value.find(
      (creatureAverageLoot) =>
        creatureAverageLoot.creature.name === creature.name,
    )

    if (creatureAverageLootFound) {
      expectedTotalValue += creatureAverageLootFound.averageLootValue
    }
  })

  return expectedTotalValue ? totalLootValue.value / expectedTotalValue : 1
})

function onReset() {
  configStore.setConfig({ since: Date.now() })
}

function onForward() {
  configStore.setConfig({ since: configStore.config.since + THIRTY_MINUTES })
}

function onBack() {
  configStore.setConfig({ since: configStore.config.since - THIRTY_MINUTES })
}

function onIgnore(itemName: string) {
  configStore.addIgnoredItem(itemName)
}

function onLootItemClicked(entry: LootEntry) {
  itemToAddName.value = entry.item.name
}

function onLootItemEdit(entry: LootEntry) {
  itemToEdit.value = entry
}
</script>

<template>
  <ItemAddModal
    :item-to-add-name="itemToAddName"
    @on-close="itemToAddName = null"
  />
  <ItemEditModal :item-to-edit="itemToEdit" @on-close="itemToEdit = null" />

  <div class="loot-list__header">
    <LootTimeDisplay
      class="loot-list__time-display"
      :since="configStore.config.since"
    />
    <div class="d-flex ga-2">
      <LootLuckDisplay :lootLuck="lootLuck" />
      <LootProfitDisplay :profit="profit" />
    </div>
  </div>

  <div class="loot-list__items">
    <LootListItem
      v-if="!isLootLoading"
      v-for="lootEntry in lootSorted"
      class="loot-list__list-item"
      :key="lootEntry.item.name"
      :loot-entry="lootEntry"
      @ignore="onIgnore"
      @click="onLootItemClicked(lootEntry)"
      @edit="onLootItemEdit(lootEntry)"
    >
    </LootListItem>
    <Loader class="d-flex justify-center align-center h-100" v-else />
    <div
      v-if="!isLootLoading && lootSorted.length === 0"
      class="d-flex justify-center w-100"
    >
      <div class="w-3ß">
        <v-alert color="secondary" type="info">
          No loot found in the timeframe selected
        </v-alert>
      </div>
    </div>
  </div>

  <LootListMenu
    class="loot-list__menu"
    :total-loot-value="totalLootValue"
    @reset="onReset"
    @forward="onForward"
    @back="onBack"
  />
</template>

<style scoped>
.loot-list__header {
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
}

.loot-list__items {
  height: 73vh;
  overflow-y: auto;
}

.loot-list__list-item {
  margin-bottom: 16px;
}

.loot-list__menu {
  margin-top: 16px;
}
</style>
