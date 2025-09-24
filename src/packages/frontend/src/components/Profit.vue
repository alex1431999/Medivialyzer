<script setup lang="ts">
import { VChip, VIcon, VTooltip } from 'vuetify/components'

const { profitAmount } = defineProps<{ profitAmount?: number }>()
</script>

<template>
  <v-tooltip text="Payout" location="top">
    <template v-slot:activator="{ props }">
      <v-chip
        v-if="profitAmount !== undefined"
        v-bind="props"
        color="secondary"
        append-icon="mdi-gold"
      >
        {{ profitAmount }}
      </v-chip>
      <v-chip v-else v-bind="props" class="opacity-20" color="success">
        <v-icon>mdi-gold</v-icon>
      </v-chip>
    </template>
  </v-tooltip>
</template>
