<script setup lang="ts">
import { VList, VListItem, VDivider } from 'vuetify/components'
import { useTeamStore } from '../stores/teamStore.ts'

const teamStore = useTeamStore()
const emit = defineEmits(['selectTeam'])
</script>

<template>
  <v-list style="min-width: 150px">
    <template v-for="(team, i) in teamStore.teams" :key="team.id">
      <VListItem @click="emit('selectTeam', team)">
        {{ team.name }}
      </VListItem>
      <v-divider
        v-if="i !== teamStore.teams.length - 1"
        class="mt-2 mb-2"
      ></v-divider>
    </template>
  </v-list>
</template>
