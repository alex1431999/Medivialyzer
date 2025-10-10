<script setup lang="ts">
import {
  VBtn,
  VCard,
  VCardActions,
  VCardText,
  VCardTitle,
  VDialog,
  VTextField,
} from 'vuetify/components'
import { computed, ref } from 'vue'

const show = defineModel<boolean>('show')
const teamId = ref<string>('')

const emit = defineEmits(['join'])

const isJoinDisabled = computed(() => teamId.value === '')

function onJoin() {
  emit('join', teamId.value)
  show.value = false
}
</script>

<template>
  <v-dialog v-model="show" width="400">
    <v-card>
      <v-card-title>Join Team</v-card-title>
      <v-card-text>
        <v-text-field required label="Team ID" v-model="teamId"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="show = false">Close</v-btn>
        <v-btn @click="onJoin" :disabled="isJoinDisabled">Join</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
