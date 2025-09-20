<script setup lang="ts">
import { VList, VListItem } from 'vuetify/components'
import Member from './Member.vue'
import {
  Member as MemberType,
  Team,
  useTeamStore,
} from '../stores/teamStore.ts'
import { useClientStore } from '../stores/clientStore.ts'

const clientStore = useClientStore()
const teamStore = useTeamStore()

const { members, team } = defineProps<{ members: MemberType[]; team: Team }>()
</script>

<template>
  <v-list>
    <v-list-item>
      <Member
        v-if="clientStore.client"
        :member="clientStore.client"
        :waste="teamStore.getWaste(team.id, clientStore.client.id)"
      />
    </v-list-item>
    <v-list-item v-for="member in members" :key="member.id">
      <Member
        :member="member"
        :waste="teamStore.getWaste(team.id, member.id)"
      />
    </v-list-item>
  </v-list>
</template>
