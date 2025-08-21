<script setup lang="ts">
import { VCard, VCardText } from 'vuetify/components'
import { Member } from '../stores/teamStore.ts'
import { Client } from '../stores/clientStore.ts'

const { member } = defineProps<{ member: Member | Client }>()
</script>

<template>
  <v-card>
    <v-card-text>{{ member.name }}</v-card-text>
  </v-card>
</template>
