<script setup lang="ts">
import {
  VBtn,
  VDialog,
  VCard,
  VCardText,
  VIcon,
  VCardTitle,
  VCardActions,
  VTextField,
  VDivider,
  VDataTable,
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

const suppliesStore = useSuppliesStore()
const configStore = useConfigStore()

const headers = [
  { title: 'Favorite', key: 'favorite', sortable: false, width: '1%', align: 'start' },
  { title: 'Item', key: 'name', align: 'start', sortable: false },
  { title: 'Before', key: 'before', sortable: false, align: 'start' },
  { title: 'After', key: 'after', sortable: false, align: 'start' },
  { title: 'Cost', key: 'cost', align: 'start', sortable: false },
] as const

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

const tableItems = computed(() => {
  return suppliesFiltered.value.map((supply) => {
    const before = suppliesStore.supplies[supply.name]?.before || 0
    const after = suppliesStore.supplies[supply.name]?.after || 0
    const cost = suppliesStore.supplies[supply.name]?.cost || supply.value
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
</script>

<template>
  <v-dialog max-width="900">
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
          <SuppliesVocationFilter
            class="mb-3 mt-3"
            :active-vocation-id="vocationSelected.id"
            @update="onVocationFilterUpdate"
          />
          <v-divider />
          <v-data-table
            :headers="headers"
            :items="tableItems"
            :sort-by="[]"
            density="compact"
            fixed-header
            height="300px"
            hide-default-footer
          >
            <template v-slot:header.favorite="{ column }">
              <span class="d-inline-flex align-center">
                <v-icon icon="mdi-star" class="mr-1" />
                {{ column.title }}
              </span>
            </template>

            <template v-slot:header.name="{ column }">
              <span class="d-inline-flex align-center">
                <v-icon icon="mdi-package-variant" class="mr-1" />
                {{ column.title }}
              </span>
            </template>

            <template v-slot:header.before="{ column }">
              <span class="d-inline-flex align-center">
                <v-icon icon="mdi-arrow-up-bold-box-outline" class="mr-1" />
                {{ column.title }}
              </span>
            </template>

            <template v-slot:header.after="{ column }">
              <span class="d-inline-flex align-center">
                <v-icon icon="mdi-arrow-down-bold-box-outline" class="mr-1" />
                {{ column.title }}
              </span>
            </template>

            <template v-slot:header.cost="{ column }">
              <span class="d-inline-flex align-center">
                <v-icon icon="mdi-gold" class="mr-1" />
                {{ column.title }}
              </span>
            </template>

            <template v-slot:item.favorite="{ item }">
              <v-icon
                v-if="item.isFavorite"
                @click="setIsFavorite(item, false)"
              >
                mdi-star
              </v-icon>
              <v-icon v-else @click="setIsFavorite(item, true)">
                mdi-star-outline
              </v-icon>
            </template>

            <template v-slot:item.before="{ item }">
              <v-text-field
                v-model="suppliesStore.supplies[item.name].before"
                type="number"
                variant="plain"
                density="compact"
                hide-details
              />
            </template>

            <template v-slot:item.after="{ item }">
              <v-text-field
                v-model="suppliesStore.supplies[item.name].after"
                type="number"
                variant="plain"
                density="compact"
                hide-details
              />
            </template>

            <template v-slot:item.cost="{ item }">
              <v-text-field
                v-model="suppliesStore.supplies[item.name].cost"
                type="number"
                variant="plain"
                density="compact"
                hide-details
              />
            </template>
          </v-data-table>
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