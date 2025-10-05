<script setup lang="ts">
import { VBtn } from 'vuetify/components'
import { Team, useTeamStore } from '../../stores/teamStore.ts'
import { ref } from 'vue'

const teamStore = useTeamStore()

const { team } = defineProps<{ team: Team }>()

const isLoading = ref(false)

async function onDone() {
  isLoading.value = true

  await teamStore.reset(team.id)

  isLoading.value = false
}
</script>

<template>
  <v-btn
    text="Done"
    variant="outlined"
    color="secondary"
    @click="onDone"
    :loading="isLoading"
  ></v-btn>
</template>
