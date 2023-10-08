<script setup lang="ts">
import { ref, watch } from "vue";
import NavList from "./NavList.vue";

const props = defineProps({
  sidebar: Boolean,
});

const sidebar = ref(props.sidebar);

watch(
  () => props.sidebar,
  () => {
    sidebar.value = props.sidebar;
  },
);
</script>

<template>
  <v-navigation-drawer v-model="sidebar" location="left" temporary>
    <NavList />
  </v-navigation-drawer>
</template>
