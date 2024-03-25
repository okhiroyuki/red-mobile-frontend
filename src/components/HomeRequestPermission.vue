<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  checkBluetoothPermission,
  checkCameraPermission,
  checkLocationPermission,
  checkMicPermission,
  checkStoragePermission,
} from "../cordova/permission";
import { isCordova } from "../cordova/util";

const hasPermission = ref(false);

const checkPermission = async (): Promise<boolean> => {
  return (
    (await checkLocationPermission()) &&
    (await checkCameraPermission()) &&
    (await checkMicPermission()) &&
    (await checkStoragePermission()) &&
    (await checkBluetoothPermission())
  );
};

onMounted(async () => {
  if (isCordova()) {
    hasPermission.value = await checkPermission();
  }
});
</script>

<template>
  <div class="mt-5">
    <v-alert
      :model-value="!hasPermission"
      start
      colored-border
      type="info"
      elevation="2"
    >
      Check the permissions required to use the app in Menu >
      <router-link to="/setting">Setting</router-link>.
    </v-alert>
  </div>
</template>
