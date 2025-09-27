<script setup lang="ts">
import { VCheckbox, VForm, VSelect, VTextField } from 'vuetify/components'
import _ from 'lodash'
import { NPC_LIST } from '../utils/npc/npc.constants.ts'
import { NPCName } from '../utils/npc/npc.types.ts'

export type ItemFormData = {
  value: {
    item: { name: string; value?: number | string; NPC?: NPCName }
    consent: boolean
    isValid: boolean
  }
}

const model = defineModel<ItemFormData>({ required: true })

const NPCNames = _.map(NPC_LIST, 'name').sort()

const valueRules = [(value: string) => !!value || 'Value is required']
</script>

<template>
  <v-form v-model="model.value.isValid">
    <v-text-field
      required
      readonly
      v-model="model.value.item.name"
      variant="solo"
    />
    <v-text-field
      label="Value"
      required
      placeholder="Value in gold"
      type="number"
      variant="solo"
      :rules="valueRules"
      v-model="model.value.item.value"
    />
    <v-select
      label="NPC to sell to"
      :items="NPCNames"
      v-model="model.value.item.NPC"
    ></v-select>
    <v-checkbox
      label="Consent to Medivialyzer adding the item to the global database (Optional)"
      v-model="model.value.consent"
    ></v-checkbox>
  </v-form>
</template>
