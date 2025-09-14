<script setup lang="ts">
import { VList, VListItem } from 'vuetify/components'
import Member from './Member.vue'
import { Member as MemberType, Team } from '../stores/teamStore.ts'
import { useClientStore } from '../stores/clientStore.ts'

const clientStore = useClientStore()

const { members, team } = defineProps<{ members: MemberType[]; team: Team }>()
</script>

<template>
  <v-list>
    <v-list-item>
      <Member
        :team="team"
        v-if="clientStore.client"
        :member="clientStore.client"
      />
    </v-list-item>
    <v-list-item v-for="member in members" :key="member.id">
      <Member :team="team" :member="member" />
    </v-list-item>
  </v-list>
</template>
