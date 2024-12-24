<script setup lang="ts">
import { VDialog, VCard, VCardTitle, VCardText, VTextField, VForm, VCardActions, VBtn } from "vuetify/components";
import {ref, watch} from "vue";
import {Item} from "../utils/item/item.types.ts";
import {useConfigStore} from "../stores/configStore.ts";
import {baserowSubmitItem} from "../utils/baserow/baserow.requests.ts";

const configStore = useConfigStore()

const { itemToAddName } = defineProps<{ itemToAddName: string | null }>()
const emit = defineEmits(['onClose'])

const isOpen = ref<boolean>(false)
const isValid = ref<boolean>(true)
const itemValue = ref<string | null>(null)

const valueRules = [
    (value: string) => !!value || "Value is required",
]

watch(() => itemToAddName, () => {
  isOpen.value = itemToAddName !== null
  itemValue.value = null
})

watch(isOpen, (value: boolean) => {
  if (!value) {
    emit('onClose')
  }
})

async function submit() {
  if (!itemToAddName) throw new Error('Name is required')
  if (!itemValue.value) throw new Error('Value is required')

  const item: Item = {
    name: itemToAddName,
    value: parseInt(itemValue.value, 10)
  }

  configStore.addCustomItem(item)

  await baserowSubmitItem(item)

  isOpen.value = false
}

</script>

<template>
  <v-dialog max-width="600" v-model="isOpen">
    <template #default>
      <v-card>
        <v-card-title>Add item</v-card-title>
        <v-card-text>
          <v-form v-model="isValid">
            <v-text-field label="Name" required readonly :value="itemToAddName" variant="solo" />
            <v-text-field label="Value" required placeholder="Value in gold" type="number" variant="solo" :rules="valueRules" v-model="itemValue" />
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-btn @click="isOpen = false">Close</v-btn>
          <v-btn @click="submit" :disabled="!isValid">Add</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
