<script setup lang="ts">
import { VDialog, VCard, VCardTitle, VCardText, VTextField, VForm, VCardActions, VBtn, VCheckbox, VSelect } from "vuetify/components";
import {ref, watch} from "vue";
import {Item} from "../utils/item/item.types.ts";
import {useConfigStore} from "../stores/configStore.ts";
import {baserowSubmitItem} from "../utils/baserow/baserow.requests.ts";
import _ from "lodash";
import {NPC_LIST} from "../utils/npc/npc.constants.ts";

const configStore = useConfigStore()
const NPCNames = _.map(NPC_LIST, 'name').sort()

const { itemToAddName } = defineProps<{ itemToAddName: string | null }>()
const emit = defineEmits(['onClose'])

const isOpen = ref<boolean>(false)
const isValid = ref<boolean>(true)
const itemValue = ref<string | null>(null)
const NPCSelected = ref<string | null>(null)
const consent = ref<boolean>(configStore.config.consentToSubmitItem)

const valueRules = [
    (value: string) => !!value || "Value is required",
]

watch(() => itemToAddName, () => {
  isOpen.value = itemToAddName !== null
  itemValue.value = null
  NPCSelected.value = null
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
    value: parseInt(itemValue.value, 10),
    NPCs: NPCSelected.value ? [NPCSelected.value] : [],
  }

  configStore.addCustomItem(item)
  configStore.setConsentToSubmitItem(consent.value)

  if (consent.value) {
    await baserowSubmitItem(item)
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
          <v-form v-model="isValid">
            <v-text-field label="Name" required readonly :value="itemToAddName" variant="solo" />
            <v-text-field label="Value" required placeholder="Value in gold" type="number" variant="solo" :rules="valueRules" v-model="itemValue" />
            <v-select label="NPC to sell to" :items="NPCNames" v-model="NPCSelected"></v-select>
            <v-checkbox label="Consent to Medivialyzer adding the item to the global database (Optional)" v-model="consent"></v-checkbox>
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
