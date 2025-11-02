<script setup lang="ts">
import { VSnackbar, VBtn } from 'vuetify/components'
import { useNotifications } from '../composables/useNotifications.ts'

const { show, message, color } = useNotifications()
</script>

<template>
  <v-snackbar
    v-model="show"
    :timeout="2500"
    :color="color"
    location="bottom center"
    variant="elevated"
  >
    {{ message }}

    <template v-slot:actions>
      <v-btn variant="text" @click="show = false"> Close </v-btn>
    </template>
  </v-snackbar>
</template>
