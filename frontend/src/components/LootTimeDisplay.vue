<script setup lang="ts">
import {computed} from "vue";
import { VChip } from "vuetify/components";
import moment from "moment";

const { since } = defineProps<{ since: number }>()

const sinceFormatted = computed(() => {
  return moment(since).format("DD. MMM HH:mm")
})
</script>

<template>
  <v-chip>
    Loot since: {{ sinceFormatted }}
  </v-chip>
</template>
