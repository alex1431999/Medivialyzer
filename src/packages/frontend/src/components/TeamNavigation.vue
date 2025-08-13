<script setup lang="ts">
import { VList, VListItem } from 'vuetify/components'
import { useTeamStore } from '../stores/teamStore.ts'

const teamStore = useTeamStore()
</script>

<template>
  <v-list style="min-width: 150px">
    <VListItem v-for="team in teamStore.teams" :key="team.id">
      {{ team.name }}
    </VListItem>
  </v-list>
</template>
