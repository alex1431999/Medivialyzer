<script setup lang="ts">
import { VChip, VIcon, VTooltip } from 'vuetify/components'

const { totalLootValue } = defineProps<{ totalLootValue: number }>()
</script>

<template>
  <v-tooltip text="Total loot">
    <template v-slot:activator="{ props }">
      <v-chip v-bind="props" color="secondary">
        <span class="mr-1">{{ totalLootValue }}</span>
        <v-icon icon="mdi-gold"></v-icon>
      </v-chip>
    </template>
  </v-tooltip>
</template>

<style scoped></style>
