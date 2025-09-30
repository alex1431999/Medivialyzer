<script setup lang="ts">
import {
  VBtn,
  VDialog,
  VCard,
  VCardTitle,
  VCardText,
  VCardActions,
  VTextField,
} from 'vuetify/components'

const show = defineModel<boolean>('show')
const name = defineModel<string>('name')

const emit = defineEmits(['submit', 'close'])

async function onSubmit() {
  emit('submit', name.value)
  show.value = false
}
</script>

<template>
  <v-dialog max-width="400" v-model="show">
    <template v-slot:default>
      <v-card>
        <v-card-title>Update team name</v-card-title>
        <v-card-text>
          <v-text-field v-model="name" label="Name" />
        </v-card-text>
        <v-card-actions>
          <v-btn
            text="Submit"
            :disabled="name === ''"
            @click="onSubmit"
          ></v-btn>
          <v-btn text="Cancel" @click="show = false"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
