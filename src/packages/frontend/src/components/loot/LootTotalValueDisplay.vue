<script setup lang="ts">
import { VChip, VIcon, VTooltip } from 'vuetify/components'
import { computed } from 'vue'
import { formatNumber } from '../../utils/number.ts'

const { totalLootValue } = defineProps<{ totalLootValue: number }>()

const totalLootValueFormatted = computed(() => formatNumber(totalLootValue))
</script>

<template>
  <div style="width: 150px" class="d-flex justify-end">
    <v-tooltip text="Total loot">
      <template v-slot:activator="{ props }">
        <v-chip v-bind="props" color="secondary">
          <span class="mr-1">{{ totalLootValueFormatted }}</span>
          <v-icon icon="mdi-gold"></v-icon>
        </v-chip>
      </template>
    </v-tooltip>
  </div>
</template>

<style scoped></style>
