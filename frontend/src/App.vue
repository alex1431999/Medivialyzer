<script setup lang="ts">
import { ref } from 'vue'
import LootList from './components/LootList.vue'
import Header from "./components/Header.vue";
import SettingsMenu from "./components/SettingsMenu.vue";

const showSettings = ref(false)
const ignoredItems = ref<Set<string>>(new Set())

const openSettings = () => {
  showSettings.value = true
}

const closeSettings = () => {
  showSettings.value = false
}

const removeIgnoredItem = (item: string) => {
  ignoredItems.value.delete(item)
}

<template>
    <Header class="app__header" />
    <LootList :ignored-items="ignoredItems" @open-settings="openSettings" />
    <SettingsMenu v-if="showSettings" :ignored-items="ignoredItems" @close="closeSettings" @remove-ignored-item="removeIgnoredItem" />
</template>

<style scoped>
.app__header {
  margin-bottom: 16px;
}
</style>