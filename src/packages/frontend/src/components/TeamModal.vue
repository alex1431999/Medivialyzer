<script setup lang="ts">
import {
  VBtn,
  VCard,
  VCardText,
  VCardTitle,
  VDialog,
  VCardActions,
} from 'vuetify/components'
import { useTeamStore } from '../stores/teamStore.ts'
import NoTeamsPlaceholder from './NoTeamsPlaceholder.vue'
import Team from './Team.vue'
import TeamNavigation from './TeamNavigation.vue'
import { computed } from 'vue'

const teamStore = useTeamStore()

const hasTeams = computed(() => teamStore.teams.length > 0)
const actionButtonColor = computed(() =>
  hasTeams.value ? undefined : 'secondary',
)
</script>

<template>
  <v-dialog max-width="900" min-height="400">
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
        <v-card-text class="d-flex">
          <TeamNavigation v-if="hasTeams" />
          <NoTeamsPlaceholder v-if="!hasTeams" />
          <Team v-else />
        </v-card-text>
        <v-card-actions>
          <v-btn :active-color="actionButtonColor" :active="!hasTeams"
            >Create Team</v-btn
          >
          <v-btn :active-color="actionButtonColor" :active="!hasTeams"
            >Join Team</v-btn
          >
          <v-btn>Close</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
