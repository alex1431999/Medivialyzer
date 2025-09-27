<script setup lang="ts">
import { VList, VListItem, VMenu, VIcon } from 'vuetify/components'

const emit = defineEmits(['leave', 'delete'])

const { canLeave, canDelete } = defineProps<{
  canLeave: boolean
  canDelete: boolean
}>()
</script>

<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-icon v-bind="props" icon="mdi-dots-vertical"></v-icon>
    </template>
    <v-list>
      <v-list-item :disabled="!canLeave" @click="emit('leave')">
        Leave
      </v-list-item>
      <v-list-item :disabled="!canDelete" @click="emit('delete')">
        Delete
      </v-list-item>
    </v-list>
  </v-menu>
</template>
