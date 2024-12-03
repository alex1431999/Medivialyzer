<script setup lang="ts">
import LootList from './components/LootList.vue'
import {lootReader} from "./utils/lootReader/lootReader";

const loot = lootReader.getLoot(0)
</script>

<template>
    <LootList :loot="loot" ></LootList>
</template>
