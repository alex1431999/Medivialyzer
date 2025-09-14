<script setup lang="ts">
import Members from './Members.vue'
import { Team } from '../stores/teamStore.ts'
import TeamId from './TeamId.vue'
import TeamName from './TeamName.vue'

const { team } = defineProps<{ team: Team }>()
const emit = defineEmits(['updateName'])
</script>

<template>
  <div class="d-flex flex-column w-100">
    <TeamId :id="team.id" class="mb-3" />
    <TeamName
      class="mb-3"
      :team="team"
      @update-name="(value) => emit('updateName', value)"
    ></TeamName>
    <Members :team="team" :members="team.members || []" />
  </div>
</template>
