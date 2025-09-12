<script setup lang="ts">
import {
  VBtn,
  VDialog,
  VCard,
  VCardTitle,
  VCardText,
  VSelect,
  VCardActions,
} from 'vuetify/components'
import { computed, ref } from 'vue'
import { Team, useTeamStore } from '../stores/teamStore.ts'
import { useNotifications } from '../composables/useNotifications.ts'

const teamStore = useTeamStore()
const { notify } = useNotifications()

const isOpen = ref<boolean>(false)
const teamSelected = ref<Team | null>(teamStore.teams[0] || null)

const teamOptions = computed(() =>
  teamStore.teams.map((team) => ({ title: team.name, value: team })),
)

async function onSubmitWaste() {
  console.log('TODO')
  notify('Waste submitted', 'success')
  isOpen.value = false
}
</script>

<template>
  <v-dialog max-width="400" v-model="isOpen">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" text="Submit" />
    </template>

    <v-card>
      <v-card-title>Submit waste</v-card-title>
      <v-card-text>
        <v-select
          label="Team"
          required
          :items="teamOptions"
          v-model="teamSelected"
        ></v-select>
      </v-card-text>
      <v-card-actions>
        <v-btn
          text="Submit"
          :disabled="teamSelected === null"
          @click="onSubmitWaste"
        ></v-btn>
        <v-btn text="Cancel" @click="isOpen = false"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
