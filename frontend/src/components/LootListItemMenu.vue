<script setup lang="ts">
import { VList, VListItem, VMenu, VIcon } from 'vuetify/components'

const emit = defineEmits(['ignore'])
</script>

<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-icon v-bind="props" icon="mdi-dots-vertical"></v-icon>
    </template>
    <v-list>
      <v-list-item @click="emit('ignore')"> Ignore item </v-list-item>
    </v-list>
  </v-menu>
</template>
