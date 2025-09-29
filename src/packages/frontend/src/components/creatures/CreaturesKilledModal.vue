<script setup lang="ts">
import {
  VBtn,
  VCard,
  VCardActions,
  VCardText,
  VCardTitle,
  VDialog,
  VTabs,
  VTab,
  VTabsWindow,
  VTabsWindowItem,
  VAutocomplete,
} from 'vuetify/components'
import { useLootDataStore } from '../../stores/lootDataStore.ts'
import { computed, ref } from 'vue'
import {
  getCreatureKillsPerHour,
  getCreatureWithAverageLoot,
  groupCreatures,
} from '../../utils/creature/creature.helpers.ts'
import _ from 'lodash'
import { CreatureGrouped } from '../../utils/creature/creature.types.ts'
import CreaturesKilledEmptyPlaceholder from './CreaturesKilledEmptyPlaceholder.vue'
import CreaturesKilledTable, {
  CreaturesKilledTableItem,
} from './CreaturesKilledTable.vue'

const lootDataStore = useLootDataStore()

const tab = ref<string>('current')
const creaturesSearchValue = ref<string | null>(null)

const creaturesCurrentHunt = computed(() => {
  const creaturesParsed = lootDataStore.lootDataParsed.creaturesCurrentHunt
  const creaturesGrouped = groupCreatures(creaturesParsed)
  const creaturesFiltered = filterCreatures(creaturesGrouped)
  return _.sortBy(creaturesFiltered, ['amount']).reverse()
})

const creaturesGeneral = computed(() => {
  const creaturesParsed = lootDataStore.lootDataParsed.creatures
  const creaturesGrouped = groupCreatures(creaturesParsed)
  const creaturesFiltered = filterCreatures(creaturesGrouped)
  return _.sortBy(creaturesFiltered, ['amount']).reverse()
})

const tableItemsCurrent = computed<CreaturesKilledTableItem[]>(() => {
  return creaturesCurrentHunt.value.map((creature) => ({
    name: creature.name,
    amount: creature.amount,
    killsPerHour: getCreatureKillsPerHour(
      creature,
      lootDataStore.lootDataParsed.creaturesCurrentHunt,
    ),
    avgLoot: getCreatureWithAverageLoot(
      lootDataStore.lootDataParsed.creaturesWithAverageLootCurrentHunt,
      creature,
    ).averageLootValue,
  }))
})

const tableItemsGeneral = computed<CreaturesKilledTableItem[]>(() => {
  return creaturesGeneral.value.map((creature) => ({
    name: creature.name,
    amount: creature.amount,
    avgLoot: getCreatureWithAverageLoot(
      lootDataStore.lootDataParsed.creaturesWithAverageLoot,
      creature,
    ).averageLootValue,
  }))
})

const creatureNames = computed(() =>
  creaturesGeneral.value.map((creature) => creature.name),
)

function filterCreatures(creatures: CreatureGrouped[]) {
  return creatures.filter((creature) =>
    creaturesSearchValue.value !== null
      ? creature.name.toLowerCase().includes(creaturesSearchValue.value)
      : true,
  )
}
</script>

<template>
  <v-dialog max-width="900" height="570">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        size="small"
        icon="mdi-spider"
        color="secondary"
        v-bind="activatorProps"
      />
    </template>

    <template v-slot:default="{ isActive }">
      <v-card>
        <v-card-title> Creatures killed </v-card-title>
        <v-card-text>
          <v-tabs color="secondary" v-model="tab">
            <v-tab value="current">Current Hunt</v-tab>
            <v-tab value="general">General</v-tab>
          </v-tabs>

          <v-tabs-window v-model="tab" class="mt-3">
            <v-autocomplete
              label="Search creature"
              :items="creatureNames"
              v-model="creaturesSearchValue"
              density="compact"
              clearable
            />

            <v-tabs-window-item value="current">
              <CreaturesKilledTable :items="tableItemsCurrent" />
              <CreaturesKilledEmptyPlaceholder
                v-if="!tableItemsCurrent.length"
              />
            </v-tabs-window-item>

            <v-tabs-window-item value="general">
              <CreaturesKilledTable :items="tableItemsGeneral" />
              <CreaturesKilledEmptyPlaceholder
                v-if="!tableItemsGeneral.length"
              />
            </v-tabs-window-item>
          </v-tabs-window>
        </v-card-text>

        <v-card-actions>
          <v-btn text="Close" @click="isActive.value = false"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
