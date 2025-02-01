<script setup lang="ts">
import { Creature } from '../utils/creature/creature.types.ts'

const { creature } = defineProps<{ creature: Creature }>()
</script>

<template>
  <div>{{ creature.name }}</div>
</template>
