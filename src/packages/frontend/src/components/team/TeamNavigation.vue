<script setup lang="ts">
import { VList, VListItem, VDivider } from 'vuetify/components'
import { Team, useTeamStore } from '../../stores/teamStore.ts'
import TeamMenu from './TeamMenu.vue'
import { useClientStore } from '../../stores/clientStore.ts'
import { getClient } from '../../utils/client.ts'
import { ref } from 'vue'
import TeamRenameModal from './TeamRenameModal.vue'

const teamStore = useTeamStore()
const clientStore = useClientStore()

const { teamSelected } = defineProps<{ teamSelected: Team | null }>()
const emit = defineEmits(['selectTeam'])

const isRenameModalOpen = ref<boolean>(false)
const teamToRenameSelected = ref<Team | null>(null)

function canLeaveTeam(team: Team) {
  return team.owner.id !== clientStore.client?.id
}

function canDeleteTeam(team: Team) {
  return team.owner.id === clientStore.client?.id
}

function canRenameTeam(team: Team) {
  return team.owner.id === clientStore.client?.id
}

function onRequestRename(team: Team) {
  teamToRenameSelected.value = team
  isRenameModalOpen.value = true
}

async function onChangeName(name: string) {
  if (!teamToRenameSelected.value) throw new Error('No team selected')
  await teamStore.update(teamToRenameSelected.value.id, { name })
}
</script>

<template>
  <div>
    <TeamRenameModal
      v-model:show="isRenameModalOpen"
      :name="teamToRenameSelected?.name || ''"
      @submit="onChangeName($event)"
    />
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
              :can-rename="canRenameTeam(team)"
              :can-delete="canDeleteTeam(team)"
              @leave="teamStore.removeMember(team.id, getClient().id)"
              @rename="onRequestRename(team)"
              @delete="teamStore.remove(team.id)"
            />
          </div>
        </VListItem>
        <v-divider
          v-if="i !== teamStore.teams.length - 1"
          class="mt-2 mb-2"
        ></v-divider>
      </template>
    </v-list>
  </div>
</template>
