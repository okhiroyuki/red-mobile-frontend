<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  checkLocationPermission,
  requestLocationPermission,
} from "../cordova/permission";

const location = ref(false);

const getPermission = async () => {
  location.value = await checkLocationPermission();
};

const openDialog = async () => {
  location.value = await requestLocationPermission();
};

onMounted(() => {
  getPermission();
});
</script>

<template>
  <v-list-item @click="openDialog">
    <template v-slot:prepend>
      <v-checkbox :model-value="location" disabled />
    </template>

    <v-list-item-title>Location</v-list-item-title>
    <v-list-item-subtitle>
      This app collects location data to enable
      <strong>geolocation</strong>, & <strong>ble</strong> nodes even when the
      app is closed or not in use.
    </v-list-item-subtitle>
  </v-list-item>
</template>
