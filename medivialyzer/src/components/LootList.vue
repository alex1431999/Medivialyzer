<script setup lang="ts">
import { defineProps } from 'vue'
import { Loot } from '../utils/lootReader/lootReader.types'

const { loot } = defineProps<{ loot: Loot[] }>()
</script>

<template>
  {{loot}}
</template>