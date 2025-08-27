<script setup lang="ts">
import Members from './Members.vue'
import { Team } from '../stores/teamStore.ts'

const { team } = defineProps<{ team: Team }>()
</script>

<template>
  <div class="d-flex flex-column">
    <h2>{{ team.name }}</h2>
    <Members :members="team.members || []" />
  </div>
</template>
