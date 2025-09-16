<script setup lang="ts">
import { VChip } from 'vuetify/components'
import { Waste } from '../stores/teamStore.ts'

const { waste } = defineProps<{ waste?: Waste }>()
</script>

<template>
  <v-chip v-if="waste !== undefined" color="warning" append-icon="mdi-gold">
    {{ waste.wasteAmount }}
  </v-chip>
</template>
