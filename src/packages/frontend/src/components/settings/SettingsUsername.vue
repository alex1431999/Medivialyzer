<script setup lang="ts">
import { VTextField, VBtn } from 'vuetify/components'
import { ref } from 'vue'
import { useClientStore } from '../../stores/clientStore.ts'
import { useNotifications } from '../../composables/useNotifications.ts'

const { notify } = useNotifications()

const clientStore = useClientStore()

const isEditMode = ref(false)
const userName = ref<string>(clientStore.client?.name || '')

async function onChangeName() {
  await clientStore.update({ name: userName.value })
  isEditMode.value = false

  notify('Name successfully changed', 'success')
}
</script>

<template>
  <div class="d-flex ga-2">
    <v-text-field
      :disabled="!isEditMode"
      label="Username"
      v-model="userName"
    ></v-text-field>
    <v-btn v-if="isEditMode" icon="mdi-check" @click="onChangeName"></v-btn>
    <v-btn v-else icon="mdi-pencil" @click="isEditMode = true"></v-btn>
  </div>
</template>
