<script setup lang="ts">
import { VDialog, VCard, VCardTitle, VCardText, VTextField, VForm, VCardActions, VBtn } from "vuetify/components";
import {ref, watch} from "vue";

const { itemToAddName } = defineProps<{ itemToAddName: string | null }>()

const isOpen = ref<boolean>(false)
const isValid = ref<boolean>(true)

const valueRules = [
    (value: string) => !!value || "Value is required",
]

watch(() => itemToAddName, () => {
  isOpen.value = itemToAddName !== null
})

</script>

<template>
  <v-dialog max-width="600" v-model="isOpen">
    <template #default>
      <v-card>
        <v-card-title>Add item</v-card-title>
        <v-card-text>
          <v-form v-model="isValid">
            <v-text-field label="Name" required readonly :value="itemToAddName" variant="solo" />
            <v-text-field label="Value" required placeholder="Value in gold" type="number" variant="solo" :rules="valueRules" />
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-btn :disabled="!isValid">Add</v-btn>
          <v-btn @click="isOpen = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
