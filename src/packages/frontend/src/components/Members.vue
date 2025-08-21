<script setup lang="ts">
import { VList, VListItem } from 'vuetify/components'
import Member from './Member.vue'
import { Member as MemberType } from '../stores/teamStore.ts'

const { members } = defineProps<{ members: MemberType[] }>()
</script>

<template>
  <v-list>
    <v-list-item v-for="member in members" :key="member.id">
      <Member />
    </v-list-item>
  </v-list>
</template>
