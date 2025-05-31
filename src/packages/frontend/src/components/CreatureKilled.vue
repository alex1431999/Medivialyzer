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

const { creature, creatureWithAverageLoot, creatureKillsPerHour } =
  defineProps<{
    creature: CreatureGrouped
    creatureWithAverageLoot: CreatureWithAverageLoot
    creatureKillsPerHour?: number
  }>()
</script>

<template>
  <v-card>
    <v-card-text class="creature-row">
      <!-- Left Cell: Name & Amount -->
      <div class="cell">
        <v-badge color="secondary" :content="`${creature.amount}x`">
          <v-chip>
            {{ creature.name }}
          </v-chip>
        </v-badge>
      </div>

      <!-- Center Cell: Kills per Hour -->
      <div class="cell">
        <v-tooltip v-if="creatureKillsPerHour" text="Kills per hour">
          <template v-slot:activator="{ props }">
            <v-chip v-bind="props" color="#00FFFF">
              <span class="mr-1">{{ creatureKillsPerHour }}</span>
              <v-icon icon="mdi-sword"></v-icon>
              <v-icon icon="mdi-timer-sand"></v-icon>
            </v-chip>
          </template>
        </v-tooltip>
      </div>

      <!-- Right Cell: Average Loot -->
      <div class="cell">
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
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.creature-row {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 12px;
}

.cell:nth-child(1) {
  justify-self: start;
}

.cell:nth-child(2) {
  justify-self: center;
}

.cell:nth-child(3) {
  justify-self: end;
}
</style>
