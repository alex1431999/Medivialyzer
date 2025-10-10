<script setup lang="ts">
import { VChip, VIcon, VTooltip } from 'vuetify/components'
import { computed } from 'vue'
import { formatNumber } from '../../utils/number.ts'

const { profit } = defineProps<{ profit: number }>()

const profitFormatted = computed(() => formatNumber(profit))

const color = computed(() => (profit >= 0 ? 'success' : 'error'))
</script>

<template>
  <v-tooltip text="Solo hunt profit">
    <template v-slot:activator="{ props }">
      <v-chip v-bind="props" :color="color">
        <span class="mr-1">{{ profitFormatted }}</span>
        <v-icon icon="mdi-gold"></v-icon>
      </v-chip>
    </template>
  </v-tooltip>
</template>
