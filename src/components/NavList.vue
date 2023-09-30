<script setup>
import ListTop from "./NavList/ListTop.vue";
import ListItems from "./NavList/ListItems.vue";
import ListVersion from "./NavList/ListVersion.vue";
import { ref } from "vue";

const selectedItem = ref(1);
</script>

<template>
  <ListTop />
  <v-divider />
  <v-list v-model="selectedItem">
    <ListItems />
    <ListVersion />
  </v-list>
</template>
