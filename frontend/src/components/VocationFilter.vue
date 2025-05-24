<script setup lang="ts">
import { VBtn } from 'vuetify/components'
import { VOCATIONS } from '../constants/vocations.ts'

const vocations = Object.values(VOCATIONS)
</script>

<template>
  <div class="d-flex justify-space-between">
    <div v-for="vocation in vocations" :key="vocation.name">
      <v-btn>{{ vocation.name }}</v-btn>
    </div>
  </div>
</template>
