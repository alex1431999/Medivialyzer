<script setup lang="ts">
import Members from './Members.vue'
import { Team } from '../stores/teamStore.ts'
import { VTextField, VBtn } from 'vuetify/components'
import { computed, ref, watch } from 'vue'

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
  <div class="d-flex flex-column w-100">
    <div class="d-flex w-100 align-center">
      <v-text-field
        v-model="nameLocal"
        variant="solo-filled"
        hide-details
        :readonly="!editNameMode"
        :disabled="!editNameMode"
        class="mr-2"
      ></v-text-field>
      <v-btn
        v-if="editNameMode"
        icon="mdi-check"
        @click="onEditNameSave"
      ></v-btn>
      <v-btn v-else icon="mdi-pencil" @click="editNameMode = true"></v-btn>
    </div>
    <Members :members="team.members || []" />
  </div>
</template>
