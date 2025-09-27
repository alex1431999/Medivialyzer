<script setup lang="ts">
import { VBtn } from 'vuetify/components'
import { VOCATIONS } from '../../constants/vocations.ts'
import { VocationIdentifier } from '../../types/vocation.types.ts'

const vocations = Object.values(VOCATIONS)

const { activeVocationId } = defineProps<{
  activeVocationId: VocationIdentifier
}>()

const emit = defineEmits(['update'])

function isActive(id: VocationIdentifier) {
  return id === activeVocationId
}
</script>

<template>
  <div class="d-flex justify-space-between">
    <div v-for="vocation in vocations" :key="vocation.name">
      <v-btn
        :active="isActive(vocation.id)"
        active-color="secondary"
        @click="emit('update', vocation.id)"
      >
        {{ vocation.name }}
      </v-btn>
    </div>
  </div>
</template>
