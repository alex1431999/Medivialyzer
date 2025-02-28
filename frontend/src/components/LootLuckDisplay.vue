<script setup lang="ts">
import { VChip, VIcon, VTooltip } from 'vuetify/components'
</script>

<template>
  <v-tooltip text="Loot Luck">
    <template v-slot:activator="{ props }">
      <v-chip v-bind="props" color="green">
        <v-icon icon="mdi-clover"></v-icon>
      </v-chip>
    </template>
  </v-tooltip>
</template>
