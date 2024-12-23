<script setup lang="ts">
import {VChip, VIcon, VTooltip} from "vuetify/components";
import {computed} from "vue";

const { profit } = defineProps<{ profit: number }>()

const color = computed(() => profit > 0 ? 'success' : 'error')
</script>

<template>
  <v-tooltip text="Profit">
    <template v-slot:activator="{ props }">
        <v-chip v-bind="props" :color="color">
          {{ profit }}
          <v-icon icon="mdi-gold"></v-icon>
        </v-chip>
      </template>
  </v-tooltip>
</template>
