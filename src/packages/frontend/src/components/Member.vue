<script setup lang="ts">
import { VCard, VCardText, VBadge, VChip } from 'vuetify/components'
import { Member, Team } from '../stores/teamStore.ts'
import { Client, useClientStore } from '../stores/clientStore.ts'
import Waste from './Waste.vue'
import { computed } from 'vue'
import _ from 'lodash'

const clientStore = useClientStore()

const { member, team } = defineProps<{ member: Member | Client; team: Team }>()

const isYou = computed(() => clientStore.client?.id === member.id)

const waste = computed(() =>
  _.sortBy(team.wastes, 'createdAt')
    .reverse()
    .find((wasteCurrent) => wasteCurrent.client.id === member.id),
)
</script>

<template>
  <v-card>
    <v-card-text>
      <v-badge v-if="!isYou"> {{ member.name }} </v-badge>
      <v-badge v-else color="secondary" content="You">
        <v-chip>
          {{ member.name }}
        </v-chip>
      </v-badge>

      <Waste :waste-amount="waste?.wasteAmount" />
    </v-card-text>
  </v-card>
</template>
