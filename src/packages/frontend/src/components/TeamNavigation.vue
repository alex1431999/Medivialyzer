<script setup lang="ts">
import { VList, VListItem, VDivider } from 'vuetify/components'
import { Team, useTeamStore } from '../stores/teamStore.ts'
import TeamMenu from './TeamMenu.vue'
import { useClientStore } from '../stores/clientStore.ts'

const teamStore = useTeamStore()
const clientStore = useClientStore()

const { teamSelected } = defineProps<{ teamSelected: Team | null }>()
const emit = defineEmits(['selectTeam'])

function canLeaveTeam(team: Team) {
  return team.owner.id !== clientStore.client?.id
}

function canDeleteTeam(team: Team) {
  return team.owner.id === clientStore.client?.id
}
</script>

<template>
  <v-list style="min-width: 150px">
    <template v-for="(team, i) in teamStore.teams" :key="team.id">
      <VListItem
        :active="team.id === teamSelected?.id"
        @click="emit('selectTeam', team)"
      >
        <div class="d-flex justify-space-between">
          {{ team.name }}
          <TeamMenu
            :can-leave="canLeaveTeam(team)"
            :can-delete="canDeleteTeam(team)"
          />
        </div>
      </VListItem>
      <v-divider
        v-if="i !== teamStore.teams.length - 1"
        class="mt-2 mb-2"
      ></v-divider>
    </template>
  </v-list>
</template>
