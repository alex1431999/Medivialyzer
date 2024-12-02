<script setup lang="ts">
import { defineProps } from 'vue'
import { Loot } from '../utils/lootReader/lootReader.types'

const { lootEntry } = defineProps<{ lootEntry: Loot }>()

</script>

<template>
  {{ lootEntry }}
</template>