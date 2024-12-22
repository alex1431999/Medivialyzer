<script setup lang="ts">
import {VChip, VIcon} from "vuetify/components";
import {computed} from "vue";

const { profit } = defineProps<{ profit: number }>()

const color = computed(() => profit > 0 ? 'success' : 'error')
</script>

<template>
  <v-chip :color="color">
    {{ profit }}
    <v-icon icon="mdi-gold"></v-icon>
  </v-chip>
</template>
