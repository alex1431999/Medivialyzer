<script setup lang="ts">
import { VBtn } from 'vuetify/components';
</script>

<template>
  <div class="button-container">
    <v-btn @click="$emit('back')" size="small" color="secondary" icon="mdi-arrow-left" />
    <v-btn @click="$emit('reset')" size="small" color="secondary" icon="mdi-refresh" />
    <v-btn @click="$emit('forward')" size="small" color="secondary" icon="mdi-arrow-right" />
  </div>
</template>

<style scoped>
.button-container {
  display: flex;
  gap: 10px;
}
</style>
