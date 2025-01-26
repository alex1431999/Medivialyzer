<script setup lang="ts">
import { getConfig } from '../utils/make/make.requests.ts'
import { VCard, VCardTitle, VCardText } from 'vuetify/components'

const config = await getConfig()
</script>

<template>
  <v-card class="upgrade-notification" elevation="4">
    <v-card-title> A new version is available! </v-card-title>
    <v-card-text>Download <a :href="config.downloadLink">here</a></v-card-text>
  </v-card>
</template>

<style scoped>
.upgrade-notification {
  position: absolute;
  bottom: 16px;
  right: 16px;
  width: 400px;
  height: 150px;
  padding: 16px;
}
</style>
