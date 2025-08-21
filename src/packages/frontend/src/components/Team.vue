<script setup lang="ts">
import Members from './Members.vue'
import { Team } from '../stores/teamStore.ts'

const { team } = defineProps<{ team: Team }>()
</script>

<template>
  {{ team.name }}
  <Members />
</template>
