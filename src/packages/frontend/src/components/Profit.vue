<script setup lang="ts">
import { VChip, VIcon } from 'vuetify/components'

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
  <v-chip v-else class="opacity-20" color="success">
    <v-icon>mdi-gold</v-icon>
  </v-chip>
</template>
