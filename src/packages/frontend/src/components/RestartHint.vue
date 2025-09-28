<script setup lang="ts">
import {
  VCard,
  VCardTitle,
  VCardText,
  VCardActions,
  VBtn,
} from 'vuetify/components'
import { useConfigStore } from '../stores/configStore.ts'
import { useLoot } from '../composables/useLoot.ts'
import { computed } from 'vue'

const configStore = useConfigStore()
const { loot } = useLoot()

const show = computed(
  () => loot.value.length && !configStore.config.restartHintAcknowledged,
)
</script>

<template>
  <v-card v-if="show" class="restart-hint" elevation="4">
    <v-card-title>Keeping loot up to date</v-card-title>
    <v-card-text
      >After you are done hunting, make sure to restart your Medivia game client
      to keep your loot up to date
    </v-card-text>
    <v-card-actions>
      <v-btn @click="configStore.setConfig({ restartHintAcknowledged: true })">
        Okay sure!
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.restart-hint {
  position: absolute;
  bottom: 16px;
  right: 16px;
  width: 400px;
  padding: 16px;
}
</style>
