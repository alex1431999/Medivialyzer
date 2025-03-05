<script setup lang="ts">
import {
  VBtn,
  VCard,
  VCardActions,
  VCardText,
  VCardTitle,
  VDialog,
} from 'vuetify/components'
import { useLootDataStore } from '../stores/lootDataStore.ts'
import { computed } from 'vue'
import CreatureKilled from './CreatureKilled.vue'
import { groupCreatures } from '../utils/creature/creature.helpers.ts'
import _ from 'lodash'

const lootDataStore = useLootDataStore()

const creatures = computed(() => {
  const creaturesParsed = lootDataStore.lootDataParsed.creatures
  const creaturesGrouped = groupCreatures(creaturesParsed)
  return _.sortBy(creaturesGrouped, ['amount']).reverse()
})
</script>

<template>
  <v-dialog width="700">
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
          <CreatureKilled
            class="mb-2"
            v-for="creature in creatures"
            :key="creature.name"
            :creature="creature"
          ></CreatureKilled>
        </v-card-text>

        <v-card-actions>
          <v-btn text="Close" @click="isActive.value = false"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
