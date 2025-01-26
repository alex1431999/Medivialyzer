<script setup lang="ts">
import { AppRemoteConfig, getConfig } from '../utils/make/make.requests.ts'
import { VCard, VCardTitle, VCardText } from 'vuetify/components'
import { computed, onMounted, ref } from 'vue'
import { APP_VERSION } from '../constants/app.ts'

const config = ref<AppRemoteConfig | null>(null)

const versionIsOutdated = computed(() => {
  return config.value && config.value.version !== APP_VERSION
})

const downloadLink = computed(() =>
  config.value ? config.value.downloadLink : '',
)

onMounted(async () => {
  config.value = await getConfig()
})
</script>

<template>
  <v-card v-if="versionIsOutdated" class="upgrade-notification" elevation="4">
    <v-card-title> A new version is available! </v-card-title>
    <v-card-text>Download <a :href="downloadLink">here</a></v-card-text>
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
