<script setup lang="ts">
import { VList, VListItem, VDivider } from 'vuetify/components'
import { Team, useTeamStore } from '../stores/teamStore.ts'

const teamStore = useTeamStore()
const { teamSelected } = defineProps<{ teamSelected: Team | null }>()
const emit = defineEmits(['selectTeam'])
</script>

<template>
  <v-list style="min-width: 150px">
    <template v-for="(team, i) in teamStore.teams" :key="team.id">
      <VListItem
        :active="team.id === teamSelected?.id"
        @click="emit('selectTeam', team)"
      >
        {{ team.name }}
      </VListItem>
      <v-divider
        v-if="i !== teamStore.teams.length - 1"
        class="mt-2 mb-2"
      ></v-divider>
    </template>
  </v-list>
</template>
