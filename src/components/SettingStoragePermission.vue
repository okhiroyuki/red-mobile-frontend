<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  checkStoragePermission,
  requestStoragePermission,
} from "../cordova/permission";

const storage = ref(false);

const getPermission = async () => {
  storage.value = await checkStoragePermission();
};

const openDialog = async () => {
  storage.value = await requestStoragePermission();
};

onMounted(() => {
  getPermission();
});
</script>

<template>
  <v-list-item @click="openDialog">
    <template v-slot:prepend>
      <v-checkbox :model-value="storage" disabled />
    </template>

    <v-list-item-title>Storage</v-list-item-title>
    <v-list-item-subtitle>
      Use storage access when uploading
      <strong>flow</strong>, & <strong>env</strong> files.
    </v-list-item-subtitle>
  </v-list-item>
</template>
