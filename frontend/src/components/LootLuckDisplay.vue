<script setup lang="ts">
import { VChip, VIcon, VTooltip } from 'vuetify/components'
import { computed } from 'vue'

const { lootLuck } = defineProps<{ lootLuck: number }>()

const color = computed(() => {
  if (lootLuck < 0.5) {
    return 'red'
  }

  if (lootLuck < 0.75) {
    return 'yellow'
  }

  if (lootLuck < 1.25) {
    return 'green'
  }

  return '#00FFFF' // Cyan
})
</script>

<template>
  <v-tooltip text="Loot Luck">
    <template v-slot:activator="{ props }">
      <v-chip v-bind="props" :color="color">
        <v-icon icon="mdi-clover"></v-icon>
      </v-chip>
    </template>
  </v-tooltip>
</template>
