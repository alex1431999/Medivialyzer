<script setup lang="ts">
import { VBtn, VTextField } from 'vuetify/components'
import { Team } from '../stores/teamStore.ts'
import { ref, watch } from 'vue'

const { team } = defineProps<{ team: Team }>()
const emit = defineEmits(['updateName'])
const editNameMode = ref<boolean>(false)

const nameLocal = ref<string>(team.name)

watch(
  () => team.name,
  (name) => (nameLocal.value = name),
)

function onEditNameSave() {
  editNameMode.value = false
  emit('updateName', nameLocal.value)
}
</script>

<template>
  <div class="d-flex ga-2 align-center">
    <v-text-field
      v-model="nameLocal"
      variant="solo-filled"
      label="Name"
      hide-details
      :readonly="!editNameMode"
      :disabled="!editNameMode"
    ></v-text-field>
    <v-btn
      v-if="editNameMode"
      icon="mdi-check"
      size="small"
      @click="onEditNameSave"
    ></v-btn>
    <v-btn
      v-else
      icon="mdi-pencil"
      size="small"
      @click="editNameMode = true"
    ></v-btn>
  </div>
</template>
