<script setup lang="ts">
import { VList, VListItem } from 'vuetify/components'
import { useTeamStore } from '../stores/teamStore.ts'

const teamStore = useTeamStore()
const emit = defineEmits(['selectTeam'])
</script>

<template>
  <v-list style="min-width: 150px">
    <VListItem
      v-for="team in teamStore.teams"
      :key="team.id"
      @click="emit('selectTeam', team)"
    >
      {{ team.name }}
    </VListItem>
  </v-list>
</template>
