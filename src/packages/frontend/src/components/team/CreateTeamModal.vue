<script setup lang="ts">
import {
  VDialog,
  VCard,
  VCardTitle,
  VCardText,
  VForm,
  VTextField,
  VBtn,
  VCardActions,
} from 'vuetify/components'
import { ref } from 'vue'
import { TeamCreateData } from '../../stores/teamStore.ts'

const show = defineModel<boolean>('show')
const createTeamData = ref<TeamCreateData>({ name: '' })

const emit = defineEmits(['create'])

function onCreate() {
  emit('create', createTeamData.value)
  show.value = false
}
</script>

<template>
  <v-dialog v-model="show" width="400">
    <v-card>
      <v-card-title>Create Team</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            required
            label="Name"
            v-model="createTeamData.name"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="show = false">Close</v-btn>
        <v-btn @click="onCreate">Create</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
