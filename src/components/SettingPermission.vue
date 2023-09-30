<script setup>
import { onMounted, ref } from "vue";
import {
  checkLocationPermission,
  checkCameraPermission,
  checkStoragePermission,
  checkMicPermission,
  checkBluetoothPermission,
  requestLocationPermission,
  requestStoragePermission,
  requestMicPermission,
  requestBluetoothPermission,
  requestCameraPermission,
} from "../cordova/permission";

const location = ref("");
const camera = ref("");
const storage = ref("");
const mic = ref("");
const bluetooth = ref("");

const getPermission = async () => {
  location.value = await checkLocationPermission();
  camera.value = await checkCameraPermission();
  storage.value = await checkStoragePermission();
  mic.value = await checkMicPermission();
  bluetooth.value = await checkBluetoothPermission();
};

const openLocationDialog = async () => {
  location.value = await requestLocationPermission();
};
const openCameraDialog = async () => {
  camera.value = await requestCameraPermission();
};
const openStorageDialog = async () => {
  storage.value = await requestStoragePermission();
};
const openMicDialog = async () => {
  mic.value = await requestMicPermission();
};
const openBluetoothDialog = async () => {
  bluetooth.value = await requestBluetoothPermission();
};

onMounted(() => {
  getPermission();
});
</script>

<template>
  <v-card class="mx-auto" max-width="400">
    <v-list lines="three">
      <v-list-subheader>Permission</v-list-subheader>

      <v-list>
        <v-list-item @click="openLocationDialog">
          <template v-slot:prepend>
            <v-checkbox :model-value="location" disabled />
          </template>

          <v-list-item-title>Location</v-list-item-title>
          <v-list-item-subtitle>
            This app collects location data to enable
            <strong>geolocation</strong>, & <strong>ble</strong> nodes even when
            the app is closed or not in use.
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item @click="openCameraDialog">
          <template v-slot:prepend>
            <v-checkbox :model-value="camera" disabled />
          </template>

          <v-list-item-title>Camera</v-list-item-title>
          <v-list-item-subtitle>
            Use camera functions with the <strong>camera</strong>,
            <strong>camera command</strong>, &
            <strong>qrcode scan</strong> nodes.
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item @click="openStorageDialog">
          <template v-slot:prepend>
            <v-checkbox :model-value="storage" disabled />
          </template>

          <v-list-item-title>Storage</v-list-item-title>
          <v-list-item-subtitle>
            Use storage access when uploading
            <strong>flow</strong>, & <strong>env</strong> files.
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item @click="openMicDialog">
          <template v-slot:prepend>
            <v-checkbox :model-value="mic" disabled />
          </template>

          <v-list-item-title>Microphone</v-list-item-title>
          <v-list-item-subtitle>
            Use access to microphones in
            <strong>speech to text</strong>, & <strong>db</strong> nodes.
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item @click="openBluetoothDialog">
          <template v-slot:prepend>
            <v-checkbox :model-value="bluetooth" disabled />
          </template>

          <v-list-item-title>Bluetooth</v-list-item-title>
          <v-list-item-subtitle>
            Use bluetooth in
            <strong>ble</strong> node.
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-list>
  </v-card>
</template>

<style>
.v-list-item-subtitle {
  height: 50px;
}
</style>
