<script setup lang="ts">
import { VChip, VIcon, VTooltip } from 'vuetify/components'
import { WasteDto } from '../../utils/generated/api-client'
import { formatNumber } from 'medivialyzer-frontend/src/utils/number.ts'

const { waste } = defineProps<{ waste?: WasteDto }>()
</script>

<template>
  <v-tooltip text="Waste" location="top">
    <template v-slot:activator="{ props }">
      <v-chip
        v-bind="props"
        v-if="waste !== undefined"
        color="warning"
        append-icon="mdi-gold"
      >
        {{ formatNumber(waste.wasteAmount) }}
      </v-chip>
      <v-chip v-bind="props" v-else class="opacity-20" color="warning">
        <v-icon>mdi-gold</v-icon>
      </v-chip>
    </template>
  </v-tooltip>
</template>
