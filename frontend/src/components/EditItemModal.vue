<script setup lang="ts">
import {
  VBtn,
  VCard,
  VCardActions,
  VCardText,
  VCardTitle,
  VDialog,
} from 'vuetify/components'
import ItemForm, { ItemFormData } from './ItemForm.vue'
import { useConfigStore } from '../stores/configStore.ts'
import { ref, watch } from 'vue'
import { Item } from '../utils/item/item.types.ts'
import { LootEntry } from '../utils/loot/loot.types.ts'
import { baserowSubmitItem } from '../utils/baserow/baserow.requests.ts'

const configStore = useConfigStore()

const { itemToEdit } = defineProps<{ itemToEdit: LootEntry | null }>()
const emit = defineEmits(['onClose'])

const formData = ref<ItemFormData>(initialiseFormData())

const isOpen = ref<boolean>(false)

watch(
  () => itemToEdit,
  () => {
    isOpen.value = itemToEdit !== null
    formData.value = initialiseFormData()
  },
)

watch(isOpen, (value: boolean) => {
  if (!value) {
    emit('onClose')
  }
})

watch(
  () => formData.value.value.consent,
  (consent) => {
    configStore.setConsentToSubmitItem(consent)
  },
)

function initialiseFormData(): ItemFormData {
  const name = itemToEdit?.item.name || ''
  const value = itemToEdit?.item.value || undefined
  const NPC =
    itemToEdit?.item.NPCs?.length && itemToEdit?.item.NPCs[0] !== 'Players'
      ? itemToEdit?.item.NPCs[0]
      : undefined

  return {
    value: {
      item: { name, value, NPC },
      consent: configStore.config.consentToSubmitItem,
      isValid: true,
    },
  }
}

async function submit() {
  if (formData.value.value.item.value === null)
    throw new Error('Value is required')
  if (formData.value.value.item.value === undefined)
    throw new Error('Value is required')

  const item: Item = {
    name: formData.value.value.item.name,
    value: parseInt(formData.value.value.item.value as string, 10),
    NPCs: formData.value.value.item.NPC ? [formData.value.value.item.NPC] : [],
  }

  configStore.addCustomItem(item)
  configStore.setConsentToSubmitItem(formData.value.value.consent)

  if (formData.value.value.consent) {
    await baserowSubmitItem(item, true)
  }

  isOpen.value = false
}
</script>

<template>
  <v-dialog max-width="700" v-model="isOpen">
    <template #default>
      <v-card>
        <v-card-title>Add item</v-card-title>
        <v-card-text>
          <ItemForm v-model="formData"></ItemForm>
        </v-card-text>

        <v-card-actions>
          <v-btn @click="isOpen = false">Close</v-btn>
          <v-btn @click="submit" :disabled="!formData.value.isValid">Add</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped></style>
