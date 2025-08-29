<script setup lang="ts">
import {
  VDialog,
  VCard,
  VCardText,
  VCardTitle,
  VTextField,
  VCardActions,
  VBtn,
  VForm,
} from 'vuetify/components'
import { computed, ref } from 'vue'

const emit = defineEmits(['submit'])
const name = ref<string>('')

const disableSubmit = computed(() => name.value === '')
</script>

<template>
  <v-dialog :model-value="true">
    <v-card>
      <v-card-title>Select a username</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field label="Username" required v-model="name"></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn :disabled="disableSubmit" @click="emit('submit', name)"
          >Submit</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
