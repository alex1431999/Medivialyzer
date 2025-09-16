<script setup lang="ts">
import { VChip, VIcon } from 'vuetify/components'
import { WasteDto } from '../utils/generated/api-client'

const { waste } = defineProps<{ waste?: WasteDto }>()
</script>

<template>
  <v-chip v-if="waste !== undefined" color="warning" append-icon="mdi-gold">
    {{ waste.wasteAmount }}
  </v-chip>
  <v-chip v-else class="opacity-20" color="warning">
    <v-icon>mdi-gold</v-icon>
  </v-chip>
</template>
