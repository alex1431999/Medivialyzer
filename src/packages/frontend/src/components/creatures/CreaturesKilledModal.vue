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
import CreaturesKilled from './CreaturesKilled.vue'
import {
  getCreatureKillsPerHour,
  getCreatureWithAverageLoot,
  groupCreatures,
} from '../../utils/creature/creature.helpers.ts'
import _ from 'lodash'
import { CreatureGrouped } from '../../utils/creature/creature.types.ts'
import CreaturesKilledEmptyPlaceholder from './CreaturesKilledEmptyPlaceholder.vue'

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

const creaturesWithAverageLootCurrentHunt = computed(
  () => lootDataStore.lootDataParsed.creaturesWithAverageLootCurrentHunt,
)

const creaturesWithAverageLootGeneral = computed(
  () => lootDataStore.lootDataParsed.creaturesWithAverageLoot,
)

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
  <v-dialog max-width="900">
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

          <v-tabs-window v-model="tab" class="mt-2">
            <v-autocomplete
              class="mb-2"
              label="Search creature"
              :items="creatureNames"
              v-model="creaturesSearchValue"
            />

            <v-tabs-window-item value="current">
              <div v-if="creaturesCurrentHunt.length" class="creatures-list">
                <CreaturesKilled
                  class="mb-2"
                  v-for="creature in creaturesCurrentHunt"
                  :key="creature.name"
                  :creature="creature"
                  :creature-kills-per-hour="
                    getCreatureKillsPerHour(
                      creature,
                      lootDataStore.lootDataParsed.creaturesCurrentHunt,
                    )
                  "
                  :creature-with-average-loot="
                    getCreatureWithAverageLoot(
                      creaturesWithAverageLootCurrentHunt,
                      creature,
                    )
                  "
                ></CreaturesKilled>
              </div>
              <CreaturesKilledEmptyPlaceholder v-else />
            </v-tabs-window-item>

            <v-tabs-window-item value="general">
              <div v-if="creaturesGeneral.length" class="creatures-list">
                <CreaturesKilled
                  class="mb-2"
                  v-for="creature in creaturesGeneral"
                  :key="creature.name"
                  :creature="creature"
                  :creature-with-average-loot="
                    getCreatureWithAverageLoot(
                      creaturesWithAverageLootGeneral,
                      creature,
                    )
                  "
                ></CreaturesKilled>
              </div>
              <CreaturesKilledEmptyPlaceholder v-else />
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

<style scoped>
.creatures-list {
  max-height: 400px;
  overflow-y: auto;
}
</style>
