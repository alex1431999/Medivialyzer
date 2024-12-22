<script setup lang="ts">
import {VChip, VIcon} from "vuetify/components";

const { profit } = defineProps<{ profit: number }>()
</script>

<template>
  <v-chip color="success">
    {{ profit }}
    <v-icon icon="mdi-gold"></v-icon>
  </v-chip>
</template>
