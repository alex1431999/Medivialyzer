<script setup lang="ts">
import {
  VBtn,
  VDialog,
  VCard,
  VCardText,
  VIcon,
  VCardTitle,
  VCardActions,
  VDivider,
  VChip,
} from 'vuetify/components'
import { SUPPLIES } from '../../utils/supplies/supplies.constants.ts'
import { useSuppliesStore } from '../../stores/suppliesStore.ts'
import { computed, watch } from 'vue'
import { formatNumber } from '../../utils/number.ts'
import { useConfigStore } from '../../stores/configStore.ts'
import SuppliesVocationFilter from './SuppliesVocationFilter.vue'
import { Vocation, VocationIdentifier } from '../../types/vocation.types.ts'
import { VOCATIONS } from '../../constants/vocations.ts'
import { Supply } from '../../utils/supplies/supplies.types.ts'
import SuppliesSubmitWasteModal from './SuppliesSubmitWasteModal.vue'
import _ from 'lodash'
import SuppliesTable, { SuppliesTableItem } from './SuppliesTable.vue'

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
  ).sort((supply) => (getIsFavorite(supply) ? -1 : 1)),
)

const tableItems = computed<SuppliesTableItem[]>(() => {
  return suppliesFiltered.value.map((supply) => {
    const before = suppliesStore.supplies[supply.name]?.before || 0
    const after = suppliesStore.supplies[supply.name]?.after || 0
    const cost = suppliesStore.supplies[supply.name]?.cost || 0
    return {
      ...supply,
      isFavorite: getIsFavorite(supply),
      before,
      after,
      cost,
    }
  })
})

const suppliesFavorites = computed(() => configStore.config.suppliesFavorites)

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

function getIsFavorite(supply: Supply): boolean {
  return !!_.get(
    suppliesFavorites.value,
    `${vocationSelected.value.id}.${supply.name}`,
  )
}

function setIsFavorite(supply: Supply, value: boolean) {
  const suppliesFavoritesClone = _.cloneDeep(suppliesFavorites.value)
  _.set(
    suppliesFavoritesClone,
    `${vocationSelected.value.id}.${supply.name}`,
    value,
  )

  configStore.setConfig({ suppliesFavorites: suppliesFavoritesClone })
}

function onUpdateFavorite(payload: {
  item: SuppliesTableItem
  value: boolean
}) {
  setIsFavorite(payload.item, payload.value)
}
</script>

<template>
  <v-dialog max-width="1100" height="80%">
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
        <v-card-text style="height: 80%">
          <SuppliesVocationFilter
            class="mb-3 mt-3"
            :active-vocation-id="vocationSelected.id"
            @update="onVocationFilterUpdate"
          />
          <v-divider />
          <SuppliesTable
            :items="tableItems"
            @update:favorite="onUpdateFavorite"
          />
        </v-card-text>

        <v-card-actions>
          <SuppliesSubmitWasteModal
            :calculated-waste="suppliesStore.totalSuppliesUsed"
          />
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
</style>
