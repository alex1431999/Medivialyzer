<script setup lang="ts">
import { VBtn, VTooltip } from 'vuetify/components'
</script>

<template>
  <div class="button-container">
    <v-tooltip location="top" text="Backwards 30 minutes">
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          @click="$emit('back')"
          size="small"
          color="secondary"
          icon="mdi-arrow-left"
        />
      </template>
    </v-tooltip>

    <v-tooltip location="top" text="Reset hunt">
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          @click="$emit('reset')"
          size="small"
          color="secondary"
          icon="mdi-refresh"
        />
      </template>
    </v-tooltip>

    <v-tooltip location="top" text="Forward 30 minutes">
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          @click="$emit('forward')"
          size="small"
          color="secondary"
          icon="mdi-arrow-right"
        />
      </template>
    </v-tooltip>
  </div>
</template>

<style scoped>
.button-container {
  display: flex;
  gap: 10px;
}
</style>
