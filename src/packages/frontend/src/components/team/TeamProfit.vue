<script setup lang="ts">
import { VChip } from 'vuetify/components'
import { computed } from 'vue'
import { formatNumber } from 'medivialyzer-frontend/src/utils/number.ts'

const { profit, profitEach } = defineProps<{
  profit: number | null
  profitEach: number | null
}>()

const color = computed(() =>
  profit !== null && profit > 0 ? 'success' : 'error',
)
</script>

<template>
  <div class="d-flex ga-2">
    <v-chip v-if="profit !== null" append-icon="mdi-gold" :color="color">
      Profit: {{ formatNumber(profit) }}
    </v-chip>
    <v-chip v-else class="opacity-20" append-icon="mdi-gold"> Profit </v-chip>
    <v-chip v-if="profitEach !== null" append-icon="mdi-gold" :color="color">
      Profit each: {{ formatNumber(profitEach) }}
    </v-chip>
    <v-chip v-else class="opacity-20" append-icon="mdi-gold">
      Profit each
    </v-chip>
  </div>
</template>
