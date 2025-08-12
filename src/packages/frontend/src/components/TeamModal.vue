<script setup lang="ts">
import {
  VBtn,
  VCard,
  VCardText,
  VCardTitle,
  VDialog,
  VTextField,
} from 'vuetify/components'
import Members from './Members.vue'
import { useTeamStore } from '../stores/teamStore.ts'
import NoTeamsPlaceholder from './NoTeamsPlaceholder.vue'
import Team from './Team.vue'

const teamStore = useTeamStore()
</script>

<template>
  <v-dialog max-width="900">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        size="small"
        icon="mdi-account-group"
        color="secondary"
        v-bind="activatorProps"
      />
    </template>

    <template v-slot:default>
      <v-card>
        <v-card-title class="supplies-modal__header">
          <div>Team</div>
        </v-card-title>
        <v-card-text>
          <NoTeamsPlaceholder v-if="teamStore.teams.length === 0" />
          <Team v-else />
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>
