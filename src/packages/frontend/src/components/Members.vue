<script setup lang="ts">
import Member from './Member.vue'
import { VCard, VCardText, VCardTitle, VChip, VIcon } from 'vuetify/components'

function onInvitationIdCopy() {
  console.log('TODO')
}
</script>

<template>
  <VCard>
    <v-card-title>
      <div class="d-flex justify-space-between">
        <span>Members</span>
        <v-chip color="secondary">
          TODO
          <v-icon
            icon="mdi-clipboard"
            class="ml-2"
            @click="onInvitationIdCopy"
          ></v-icon>
        </v-chip>
      </div>
    </v-card-title>
    <v-card-text>
      <Member class="mb-3" />
      <Member class="mb-3" />
      <Member class="mb-3" />
    </v-card-text>
  </VCard>
</template>
