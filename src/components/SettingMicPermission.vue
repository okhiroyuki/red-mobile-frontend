<script setup>
import { onMounted, ref } from "vue";
import {
  checkMicPermission,
  requestMicPermission,
} from "../cordova/permission";

const mic = ref(false);

const getPermission = async () => {
  mic.value = await checkMicPermission();
};

const openDialog = async () => {
  mic.value = await requestMicPermission();
};

onMounted(() => {
  getPermission();
});
</script>

<template>
  <v-list-item @click="openDialog">
    <template v-slot:prepend>
      <v-checkbox :model-value="mic" disabled />
    </template>

    <v-list-item-title>Microphone</v-list-item-title>
    <v-list-item-subtitle>
      Use access to microphones in
      <strong>speech to text</strong>, & <strong>db</strong> nodes.
    </v-list-item-subtitle>
  </v-list-item>
</template>
