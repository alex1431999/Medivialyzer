<script setup lang="ts">
import { VChip } from 'vuetify/components'

const { profitAmount } = defineProps<{ profitAmount?: number }>()
</script>

<template>
  <v-chip
    v-if="profitAmount !== undefined"
    color="secondary"
    append-icon="mdi-gold"
  >
    {{ profitAmount }}
  </v-chip>
</template>
