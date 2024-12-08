<script setup lang="ts">
import {computed} from "vue";
import { VChip } from "vuetify/components";

const { since } = defineProps<{ since: number }>()

const sinceFormatted = computed(() => {
  const date = new Date(since)
  return `${date.getHours()}:${date.getMinutes()}`
})
</script>

<template>
  <v-chip>
    Loot since: {{ sinceFormatted }}
  </v-chip>
</template>
