<script setup lang="ts">
import { VList, VListItem } from 'vuetify/components'
import Member from './Member.vue'
import { Member as MemberType } from '../stores/teamStore.ts'
import { useClientStore } from '../stores/clientStore.ts'

const clientStore = useClientStore()

const { members } = defineProps<{ members: MemberType[] }>()
</script>

<template>
  <v-list>
    <v-list-item>
      <Member v-if="clientStore.client" :member="clientStore.client" />
    </v-list-item>
    <v-list-item v-for="member in members" :key="member.id">
      <Member :member="member" />
    </v-list-item>
  </v-list>
</template>
