<script setup lang="ts">
import { VList, VListItem, VMenu, VIcon } from 'vuetify/components'

const { canRemove } = defineProps<{ canRemove: boolean }>()

const emit = defineEmits(['remove'])
</script>

<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-icon v-bind="props" icon="mdi-dots-vertical"></v-icon>
    </template>
    <v-list>
      <v-list-item :disabled="!canRemove" @click="emit('remove')">
        Remove
      </v-list-item>
    </v-list>
  </v-menu>
</template>
