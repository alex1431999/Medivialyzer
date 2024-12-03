<script setup lang="ts">
import LootList from './components/LootList.vue'
import Header from "./components/Header.vue";
import {lootReader} from "./utils/lootReader/lootReader";

const loot = lootReader.getLoot(0)
</script>

<template>
    <Header class="app__header" />
    <LootList :loot="loot" />
</template>

<style scoped>
.app__header {
  margin-bottom: 16px;
}
</style>