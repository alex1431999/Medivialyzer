<script setup lang="ts">
import { computed, ref } from "vue";
import LootListItem from "./LootListItem.vue";
import { groupLoot } from "../utils/loot/loot.helpers.ts";
import LootListMenu from "./LootListMenu.vue";
import * as _ from "lodash";
import { LootParser } from "../utils/lootParser/lootParser.ts";
import { electron } from "../utils/electron/electron.constants.ts";
import { useConfigStore } from "../stores/configStore.ts";
import { FIVE_SECONDS, THIRTY_MINUTES } from "../constants/time.ts";
import LootTimeDisplay from "./LootTimeDisplay.vue";
import LootProfitDisplay from "./LootProfitDisplay.vue";
import { useSuppliesStore } from "../stores/suppliesStore.ts";
import { LootEntry } from "../utils/loot/loot.types.ts";
import AddItemModal from "./AddItemModal.vue";

const configStore = useConfigStore();
const suppliesStore = useSuppliesStore();

const itemToAddName = ref<string | null>(null);

const lootData = ref<string>(electron.getLootData());

// Update the loot data regularly
setInterval(() => {
  lootData.value = electron.getLootData();
}, FIVE_SECONDS);

const loot = computed(() => {
  const lootParser = new LootParser(lootData.value);
  return lootParser.getLoot(configStore.config.since);
});

const lootFiltered = computed(() =>
  loot.value.filter(
    (lootCurrent) =>
      !configStore.config.ignoredItems.includes(lootCurrent.item.name),
  ),
);
const lootGrouped = computed(() => groupLoot(lootFiltered.value));
const lootSorted = computed(() =>
  lootGrouped.value.sort((a, b) => {
    const aValue = a.item.value !== undefined ? a.item.value : -1; // -1 make sure that unknown items are at the bototm of the list
    const bValue = b.item.value !== undefined ? b.item.value : -1;

    return a.amount * aValue > b.amount * bValue ? -1 : 1;
  }),
);

const totalLootValue = computed(() => {
  const values = lootGrouped.value.map(
    (lootEntry) => (lootEntry.item.value || 0) * lootEntry.amount,
  );
  return _.sum(values);
});

const profit = computed(() => {
  return totalLootValue.value - suppliesStore.totalSuppliesUsed;
});

function onReset() {
  configStore.setConfig({ since: Date.now() });
}

function onForward() {
  configStore.setConfig({ since: configStore.config.since + THIRTY_MINUTES });
}

function onBack() {
  configStore.setConfig({ since: configStore.config.since - THIRTY_MINUTES });
}

function onIgnore(itemName: string) {
  configStore.addIgnoredItem(itemName);
}

function onLootItemClicked(entry: LootEntry) {
  itemToAddName.value = entry.item.name;
}
</script>

<template>
  <AddItemModal
    :item-to-add-name="itemToAddName"
    @on-close="itemToAddName = null"
  />

  <div class="loot-list__header">
    <LootTimeDisplay
      class="loot-list__time-display"
      :since="configStore.config.since"
    />
    <LootProfitDisplay :profit="profit" />
  </div>

  <div class="loot-list__items">
    <LootListItem
      v-for="lootEntry in lootSorted"
      class="loot-list__list-item"
      :key="lootEntry.item.name"
      :loot-entry="lootEntry"
      @ignore="onIgnore"
      @click="onLootItemClicked(lootEntry)"
    >
    </LootListItem>
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
  height: 57vh;
  overflow-y: scroll;
}

.loot-list__list-item {
  margin-bottom: 16px;
}

.loot-list__menu {
  margin-top: 16px;
}
</style>
