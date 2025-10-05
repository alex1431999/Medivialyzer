<script setup lang="ts">
import {
  VBtn,
  VDialog,
  VCard,
  VCardTitle,
  VCardText,
  VCardActions,
  VTextField,
} from 'vuetify/components'
import { computed, ref, watch } from 'vue'
import { Team, useTeamStore } from '../../stores/teamStore.ts'
import { useNotifications } from '../../composables/useNotifications.ts'
import { useLoot } from '../../composables/useLoot.ts'
import { getMembersWithWaste } from '../../utils/waste/waste.utils.ts'

const teamStore = useTeamStore()
const { totalLootValue } = useLoot()
const { notify } = useNotifications()

const { team } = defineProps<{ team: Team }>()

const isOpen = ref<boolean>(false)
const lootAmount = ref<string>(totalLootValue.value.toString())
const isLoading = ref<boolean>(false)

const isDisabled = computed(
  () => getMembersWithWaste(team.wastes, team.resetTimestamp).length === 0,
)

// Reset the value when the modal opens/closes
watch(
  () => isOpen.value,
  () => {
    setTimeout(() => {
      lootAmount.value = totalLootValue.value.toString()
    }, 500)
  },
)

watch(
  () => totalLootValue.value,
  () => (lootAmount.value = totalLootValue.value.toString()),
  { immediate: true },
)

async function onSplit() {
  isLoading.value = true

  await teamStore.update(team.id, {
    lootAmount: parseInt(lootAmount.value, 10),
  })

  notify('Split Loot', 'success')
  isOpen.value = false
  isLoading.value = false
}
</script>

<template>
  <v-dialog max-width="400" v-model="isOpen">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        variant="outlined"
        class="w-25"
        color="secondary"
        v-bind="activatorProps"
        :disabled="isDisabled"
      >
        Split Loot
      </v-btn>
    </template>

    <template v-slot:default>
      <v-card>
        <v-card-title>Split loot</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="lootAmount"
            label="Loot amount"
            type="number"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn text="Split" :loading="isLoading" @click="onSplit"></v-btn>
          <v-btn text="Cancel" @click="isOpen = false"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
