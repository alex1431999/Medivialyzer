<script setup lang="ts">
import {
  VBtn,
  VCard,
  VCardText,
  VCardTitle,
  VDialog,
  VCardActions,
  VDivider,
} from 'vuetify/components'
import {
  useTeamStore,
  Team as TeamType,
  TeamCreateData,
} from '../stores/teamStore.ts'
import NoTeamsPlaceholder from './NoTeamsPlaceholder.vue'
import Team from './Team.vue'
import TeamNavigation from './TeamNavigation.vue'
import { computed, ref, watch } from 'vue'
import CreateTeamModal from './CreateTeamModal.vue'
import RequestLoader from './RequestLoader.vue'
import { useNotifications } from '../composables/useNotifications.ts'
import JoinTeamModal from './JoinTeamModal.vue'
import _ from 'lodash'
import { AxiosError } from 'axios'

const { notify } = useNotifications()

const teamStore = useTeamStore()

const isTeamModalOpen = ref<boolean>(false)
const isCreateTeamModalOpen = ref<boolean>(false)
const isJoinTeamModalOpen = ref<boolean>(false)

const hasTeams = computed(() => teamStore.teams.length > 0)
const actionButtonColor = computed(() =>
  hasTeams.value ? undefined : 'secondary',
)

const teamSelected = ref<TeamType | null>(null)

// Auto select the first team when no selection was made yet
watch(
  () => teamStore.teams,
  (teams) => {
    const teamIds = _.map(teams, 'id')

    // Auto select first team if no team has been selected yet
    if (teamSelected.value === null && teams.length > 0) {
      teamSelected.value = teams[0]
    }

    // Remove selected team if the selected team got deleted
    if (teamSelected.value && !teamIds.includes(teamSelected.value.id)) {
      teamSelected.value = teams.length > 0 ? teams[0] : null
    } else if (teamSelected.value) {
      // Update selected team in case the values have changed
      teamSelected.value =
        teams.find((team) => team.id === teamSelected.value?.id) || null
    }
  },
  { immediate: true, deep: true },
)

// We refresh the team store data when the modal opens so a user can force
// a refresh by just reopening the modal
watch(
  () => isTeamModalOpen.value,
  async () => {
    if (isTeamModalOpen.value) {
      await teamStore.refresh()
    }
  },
)

async function onCreateTeam(createData: TeamCreateData) {
  teamSelected.value = await teamStore.create(createData)
  notify('Team successfully created', 'success')
}

async function onJoinTeam(id: string) {
  try {
    teamSelected.value = await teamStore.join(id)
    notify('Team successfully joined', 'success')
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.status === 404 || error.status === 500) {
        notify(`A team with id ${id} does not exist`, 'error')
      } else if (error.status === 400) {
        notify('You are already part of this team', 'error')
      } else {
        throw error
      }
    } else {
      throw error
    }
  }
}

async function onUpdateTeamName(name: string) {
  if (!teamSelected.value) throw new Error('No team selected')

  const id = teamSelected.value.id
  await teamStore.update(id, { name })

  notify('Name updated successfully', 'success')
}
</script>

<template>
  <v-dialog max-width="900" min-height="500" v-model="isTeamModalOpen">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        size="small"
        icon="mdi-account-group"
        color="secondary"
        v-bind="activatorProps"
      />
    </template>

    <template v-slot:default>
      <CreateTeamModal
        v-model:show="isCreateTeamModalOpen"
        @create="onCreateTeam"
      />
      <JoinTeamModal v-model:show="isJoinTeamModalOpen" @join="onJoinTeam" />
      <v-card>
        <v-card-title class="supplies-modal__header">
          <div>Team</div>
        </v-card-title>
        <v-card-text class="d-flex">
          <RequestLoader
            class="ml-auto mr-auto"
            v-if="teamStore.isLoading"
          ></RequestLoader>
          <template v-else>
            <TeamNavigation
              v-if="hasTeams"
              :team-selected="teamSelected"
              @selectTeam="(team) => (teamSelected = team)"
            />
            <NoTeamsPlaceholder v-if="!hasTeams" />
            <v-divider
              v-if="teamSelected"
              vertical
              class="mr-5 ml-5"
            ></v-divider>
            <Team
              v-if="teamSelected"
              :team="teamSelected"
              @update-name="(name) => onUpdateTeamName(name)"
            />
          </template>
        </v-card-text>
        <v-card-actions>
          <v-btn
            :active-color="actionButtonColor"
            :active="!hasTeams"
            @click="isCreateTeamModalOpen = true"
            >Create Team</v-btn
          >
          <v-btn
            :active-color="actionButtonColor"
            :active="!hasTeams"
            @click="isJoinTeamModalOpen = true"
            >Join Team</v-btn
          >
          <v-btn>Close</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
