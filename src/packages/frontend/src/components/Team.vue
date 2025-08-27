<script setup lang="ts">
import Members from './Members.vue'
import { Team } from '../stores/teamStore.ts'
import { VTextField, VBtn } from 'vuetify/components'

const { team } = defineProps<{ team: Team }>()
</script>

<template>
  <div class="d-flex flex-column w-100">
    <div class="d-flex w-100">
      <v-text-field
        readonly
        variant="solo"
        :value="team.name"
        class="mr-2"
      ></v-text-field>
      <v-btn icon="mdi-pen"></v-btn>
    </div>
    <Members :members="team.members || []" />
  </div>
</template>
