<script setup lang="ts">
import { VChip } from 'vuetify/components'
import { computed } from 'vue'
import { formatNumber } from 'medivialyzer-frontend/src/utils/number.ts'

const { profitEach } = defineProps<{ profitEach: number | null }>()

const color = computed(() =>
  profitEach !== null && profitEach > 0 ? 'success' : 'error',
)
</script>

<template>
  <div>
    <v-chip v-if="profitEach !== null" append-icon="mdi-gold" :color="color">
      Profit each: {{ formatNumber(profitEach) }}
    </v-chip>
    <v-chip v-else class="opacity-20" append-icon="mdi-gold">
      Profit each
    </v-chip>
  </div>
</template>
