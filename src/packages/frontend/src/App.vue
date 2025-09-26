<script setup lang="ts">
import UpgradeNotification from './components/UpgradeNotification.vue'
import { computed } from 'vue'
import { useConfigStore } from './stores/configStore.ts'
import { useClientStore } from './stores/clientStore.ts'
import ClientModal from './components/ClientModal.vue'
import Main from './components/Main.vue'
import NotificationProvider from './components/NotificationProvider.vue'

const configStore = useConfigStore()
const clientStore = useClientStore()

configStore.onBoot()
clientStore.onBoot()

const showClientModal = computed(
  () => clientStore.initialized && clientStore.client === null,
)

async function onCreateClient(name: string) {
  await clientStore.create(name)
}
</script>

<template>
  <ClientModal @submit="onCreateClient" v-if="showClientModal" />
  <Main v-else />
  <UpgradeNotification />
  <NotificationProvider />
</template>
