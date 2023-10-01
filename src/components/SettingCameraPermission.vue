<script setup>
import { onMounted, ref } from "vue";
import {
  checkCameraPermission,
  requestCameraPermission,
} from "../cordova/permission";

const camera = ref(false);

const getPermission = async () => {
  camera.value = await checkCameraPermission();
};

const openDialog = async () => {
  camera.value = await requestCameraPermission();
};

onMounted(() => {
  getPermission();
});
</script>

<template>
  <v-list-item @click="openDialog">
    <template v-slot:prepend>
      <v-checkbox :model-value="camera" disabled />
    </template>

    <v-list-item-title>Camera</v-list-item-title>
    <v-list-item-subtitle>
      Use camera functions with the <strong>camera</strong>,
      <strong>camera command</strong>, & <strong>qrcode scan</strong> nodes.
    </v-list-item-subtitle>
  </v-list-item>
</template>
