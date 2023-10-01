<script setup>
import NavListAvatar from "./NavListAvatar.vue";
import NavListItems from "./NavListItems.vue";
import NavListVersion from "./NavListVersion.vue";
import { ref } from "vue";

const selectedItem = ref(1);
</script>

<template>
  <NavListAvatar />
  <v-divider />
  <v-list v-model="selectedItem">
    <NavListItems />
    <NavListVersion />
  </v-list>
</template>
