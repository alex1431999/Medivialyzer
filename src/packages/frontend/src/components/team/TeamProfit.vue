<script setup lang="ts">
import { VChip, VTooltip } from 'vuetify/components'
import { computed } from 'vue'
import { formatNumber } from 'medivialyzer-frontend/src/utils/number.ts'

const { profit, profitEach } = defineProps<{
  profit: number
  profitEach: number
}>()

const color = computed(() =>
  profit !== null && profit > 0 ? 'success' : 'error',
)

const profitEachString = computed(
  () => `Profit each: ${formatNumber(profitEach)}`,
)
</script>

<template>
  <div class="d-flex ga-2">
    <v-tooltip location="top" :text="profitEachString">
      <template v-slot:activator="{ props }">
        <v-chip append-icon="mdi-gold" :color="color" v-bind="props">
          Profit: {{ formatNumber(profit) }}
        </v-chip>
      </template>
    </v-tooltip>
  </div>
</template>
