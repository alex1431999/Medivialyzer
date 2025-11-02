<script setup lang="ts">
import { VChip, VIcon, VTooltip } from 'vuetify/components'
import { formatNumber } from 'medivialyzer-frontend/src/utils/number.ts'
import { useNotifications } from '../../../composables/useNotifications.ts'

const { notify } = useNotifications()

const { payout } = defineProps<{ payout?: number }>()

function onClick() {
  if (payout !== undefined) {
    navigator.clipboard.writeText(payout.toString())
    notify('Copied to clipboard')
  }
}
</script>

<template>
  <v-tooltip text="Payout" location="top">
    <template v-slot:activator="{ props }">
      <v-chip
        v-if="payout !== undefined"
        v-bind="props"
        color="secondary"
        append-icon="mdi-gold"
        @click="onClick"
      >
        {{ formatNumber(payout) }}
      </v-chip>
      <v-chip v-else v-bind="props" class="opacity-20" color="success">
        <v-icon>mdi-gold</v-icon>
      </v-chip>
    </template>
  </v-tooltip>
</template>
