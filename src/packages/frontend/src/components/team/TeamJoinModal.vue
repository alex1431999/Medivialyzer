<script setup lang="ts">
import {
  VBtn,
  VCard,
  VCardActions,
  VCardText,
  VCardTitle,
  VDialog,
  VForm,
  VTextField,
} from 'vuetify/components'
import { ref } from 'vue'

const show = defineModel<boolean>('show')
const teamId = ref<string>('')

const emit = defineEmits(['join'])

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
        <v-form>
          <v-text-field
            required
            label="Team ID"
            v-model="teamId"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="show = false">Close</v-btn>
        <v-btn @click="onJoin">Join</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
