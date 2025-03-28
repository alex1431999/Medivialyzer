<script setup lang="ts">
import {
  CreatureGrouped,
  CreatureWithAverageLoot,
} from '../utils/creature/creature.types.ts'
import {
  VChip,
  VBadge,
  VCard,
  VCardText,
  VIcon,
  VTooltip,
} from 'vuetify/components'

const { creature } = defineProps<{
  creature: CreatureGrouped
  creatureWithAverageLoot: CreatureWithAverageLoot
}>()
</script>

<template>
  <v-card>
    <v-card-text class="d-flex justify-space-between">
      <v-badge color="secondary" :content="`${creature.amount}x`">
        <v-chip>
          {{ creature.name }}
        </v-chip>
      </v-badge>

      <v-tooltip text="Average loot per kill">
        <template v-slot:activator="{ props }">
          <v-chip v-bind="props" color="secondary">
            <span class="mr-1">{{
              creatureWithAverageLoot.averageLootValue.toFixed(2)
            }}</span>
            <v-icon icon="mdi-gold"></v-icon>
          </v-chip>
        </template>
      </v-tooltip>
    </v-card-text>
  </v-card>
</template>
