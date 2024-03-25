<script setup lang="ts">
import { mdiArrowLeft } from "@mdi/js";
import AppBar from "../components/BaseAppBar.vue";
import BluetoothPermission from "../components/SettingBluetoothPermission.vue";
import CameraPermission from "../components/SettingCameraPermission.vue";
import LocationPermission from "../components/SettingLocationPermission.vue";
import MicPermission from "../components/SettingMicPermission.vue";
import StoragePermission from "../components/SettingStoragePermission.vue";
</script>

<template>
  <AppBar :appIcon="mdiArrowLeft" :title="`Setting`" />
  <v-card class="mx-auto" max-width="400">
    <v-list lines="three">
      <v-list-subheader>Permission</v-list-subheader>
      <v-list>
        <LocationPermission />
        <CameraPermission />
        <StoragePermission />
        <MicPermission />
        <BluetoothPermission />
      </v-list>
    </v-list>
  </v-card>
</template>

<style>
.v-list-item-subtitle {
  height: 50px;
}
</style>
