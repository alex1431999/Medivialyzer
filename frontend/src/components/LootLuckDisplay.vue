<script setup lang="ts">
import { VChip, VIcon, VTooltip } from 'vuetify/components'
import { computed } from 'vue'

const { lootLuck } = defineProps<{ lootLuck: number }>()

const lootLuckAsPercentage = computed(() => (lootLuck * 100).toFixed(0))

const color = computed(() => {
  if (lootLuck < 0.75) {
    return 'red'
  }

  if (lootLuck < 0.9) {
    return 'yellow'
  }

  if (lootLuck < 1.2) {
    return 'green'
  }

  return '#00FFFF' // Cyan
})

const tooltipText = computed(() => {
  if (lootLuck < 0.75) {
    return `Loot Luck - Very bad - ${lootLuckAsPercentage.value}%`
  }

  if (lootLuck < 0.9) {
    return `Loot Luck - Bad - ${lootLuckAsPercentage.value}%`
  }

  if (lootLuck < 1.2) {
    return `Loot Luck - Good - ${lootLuckAsPercentage.value}%`
  }

  return `Loot Luck - Insanely good - ${lootLuckAsPercentage.value}%`
})
</script>

<template>
  <v-tooltip :text="tooltipText">
    <template v-slot:activator="{ props }">
      <v-chip v-bind="props" :color="color">
        <v-icon icon="mdi-clover"></v-icon>
      </v-chip>
    </template>
  </v-tooltip>
</template>
