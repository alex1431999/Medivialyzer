<script setup lang="ts">
import {
  VBtn,
  VDialog,
  VTable,
  VCard,
  VCardText,
  VChip,
  VIcon,
  VCardTitle,
  VCardActions,
  VTextField,
  VDivider,
} from 'vuetify/components'
import { SUPPLIES } from '../utils/supplies/supplies.constants.ts'
import { useSuppliesStore } from '../stores/suppliesStore.ts'
import { computed, watch } from 'vue'
import { formatNumber } from '../utils/number.ts'
import { useConfigStore } from '../stores/configStore.ts'
import VocationFilter from './VocationFilter.vue'
import { Vocation, VocationIdentifier } from '../types/vocation.types.ts'
import { VOCATIONS } from '../constants/vocations.ts'

const suppliesStore = useSuppliesStore()
const configStore = useConfigStore()

const totalSuppliesUsedFormatted = computed(() =>
  formatNumber(suppliesStore.totalSuppliesUsed),
)

const vocationSelected = computed(
  () =>
    VOCATIONS[
      configStore.config.supplyFilter.vocationSelected as VocationIdentifier
    ] as Vocation,
)

const suppliesFiltered = computed(() =>
  SUPPLIES.filter((supply) =>
    vocationSelected.value.supplies.includes(supply.name),
  ),
)

watch(
  () => suppliesStore.supplies,
  (supplies) => {
    configStore.setSupplies(supplies)
  },
  { deep: true },
)

function onReset() {
  suppliesStore.reset()
}

function onVocationFilterUpdate(vocationIdentifier: VocationIdentifier) {
  configStore.setConfig({
    supplyFilter: { vocationSelected: vocationIdentifier },
  })
}
</script>

<template>
  <v-dialog max-width="600">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        size="small"
        icon="mdi-flask"
        color="secondary"
        v-bind="activatorProps"
      />
    </template>

    <template v-slot:default="{ isActive }">
      <v-card>
        <v-card-title class="supplies-modal__header">
          <div>Supplies</div>
          <v-chip color="warning">
            {{ totalSuppliesUsedFormatted }}
            <v-icon icon="mdi-gold" />
          </v-chip>
        </v-card-title>
        <v-card-text>
          <VocationFilter
            class="mb-3 mt-3"
            :active-vocation-id="vocationSelected.id"
            @update="onVocationFilterUpdate"
          />
          <v-divider />
          <v-table class="supplies-modal__table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Before</th>
                <th>After</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="supply in suppliesFiltered">
                <td>{{ supply.name }}</td>
                <td>
                  <v-text-field
                    v-model="suppliesStore.supplies[supply.name].before"
                    type="number"
                    variant="solo"
                  />
                </td>
                <td>
                  <v-text-field
                    v-model="suppliesStore.supplies[supply.name].after"
                    type="number"
                    variant="solo"
                  />
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card-text>

        <v-card-actions>
          <v-btn text="Reset" @click="onReset"></v-btn>
          <v-btn text="Close" @click="isActive.value = false"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped>
.supplies-modal__header {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.supplies-modal__table {
  max-height: 300px;
}
</style>
