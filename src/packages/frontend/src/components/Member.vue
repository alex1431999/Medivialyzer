<script setup lang="ts">
import { VCard, VCardText, VBadge, VChip } from 'vuetify/components'
import { Member } from '../stores/teamStore.ts'
import { Client, useClientStore } from '../stores/clientStore.ts'
import { computed } from 'vue'

const clientStore = useClientStore()

const { member } = defineProps<{ member: Member | Client }>()

const isYou = computed(() => clientStore.client?.id === member.id)
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
    </v-card-text>
  </v-card>
</template>
