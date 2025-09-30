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
import { ref } from 'vue'

const show = defineModel<boolean>('show')

const { name } = defineProps<{ name: string }>()

const emit = defineEmits(['submit', 'close'])

const nameUpdated = ref<string>(name)

async function onSubmit() {
  emit('submit', nameUpdated.value)
  show.value = false
}
</script>

<template>
  <v-dialog max-width="400" v-model="show">
    <template v-slot:default>
      <v-card>
        <v-card-title>Update team name</v-card-title>
        <v-card-text>
          <v-text-field v-model="nameUpdated" label="Name" />
        </v-card-text>
        <v-card-actions>
          <v-btn
            text="Submit"
            :disabled="nameUpdated === ''"
            @click="onSubmit"
          ></v-btn>
          <v-btn text="Cancel" @click="show = false"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
