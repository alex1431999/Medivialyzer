<script setup lang="ts">
import { VList, VListItem } from 'vuetify/components'
import Member from './Member.vue'
import { Member as MemberType, Team } from '../../../stores/teamStore.ts'

const { members, team } = defineProps<{ members: MemberType[]; team: Team }>()
</script>

<template>
  <v-list style="max-height: 300px">
    <v-list-item>
      <Member :member="team.owner" :team="team" />
    </v-list-item>
    <v-list-item v-for="member in members" :key="member.id">
      <Member :member="member" :team="team" />
    </v-list-item>
  </v-list>
</template>
