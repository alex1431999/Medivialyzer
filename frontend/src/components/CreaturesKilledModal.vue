<script setup lang="ts">
import {
  VBtn,
  VCard,
  VCardActions,
  VCardText,
  VCardTitle,
  VDialog,
} from 'vuetify/components'
import { useConfigStore } from '../stores/configStore.ts'
import { useLootDataStore } from '../stores/lootDataStore.ts'
import { computed } from 'vue'
import { LootParser } from '../utils/lootParser/lootParser.ts'
import CreatureKilled from './CreatureKilled.vue'

const configStore = useConfigStore()
const lootDataStore = useLootDataStore()

const creatures = computed(() => {
  const lootParser = new LootParser(lootDataStore.lootData)
  return lootParser.getCreatures(configStore.config.since)
})
</script>

<template>
  <v-dialog>
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
            v-for="creature in creatures"
            :key="creature.name"
          ></CreatureKilled>
        </v-card-text>

        <v-card-actions>
          <v-btn text="Close" @click="isActive.value = false"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
