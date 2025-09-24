<script setup lang="ts">
import { VChip, VIcon, VTooltip } from 'vuetify/components'

const { payout } = defineProps<{ payout?: number }>()
</script>

<template>
  <v-tooltip text="Payout" location="top">
    <template v-slot:activator="{ props }">
      <v-chip
        v-if="payout !== undefined"
        v-bind="props"
        color="secondary"
        append-icon="mdi-gold"
      >
        {{ payout }}
      </v-chip>
      <v-chip v-else v-bind="props" class="opacity-20" color="success">
        <v-icon>mdi-gold</v-icon>
      </v-chip>
    </template>
  </v-tooltip>
</template>
