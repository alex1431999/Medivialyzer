<script setup lang="ts">
import LootList from './components/LootList.vue'
import Header from './components/Header.vue'
import UpgradeNotification from './components/UpgradeNotification.vue'
</script>

<template>
  <Header class="app__header" />
  <LootList />
  <UpgradeNotification />
</template>

<style scoped>
.app__header {
  margin-bottom: 16px;
}
</style>
