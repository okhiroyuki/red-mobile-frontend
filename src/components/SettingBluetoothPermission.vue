<script setup>
import { onMounted, ref } from "vue";
import {
  checkBluetoothPermission,
  requestBluetoothPermission,
} from "@/cordova/permission";

const bluetooth = ref(false);

const getPermission = async () => {
  bluetooth.value = await checkBluetoothPermission();
};

const openDialog = async () => {
  bluetooth.value = await requestBluetoothPermission();
};

onMounted(() => {
  getPermission();
});
</script>

<template>
  <v-list-item @click="openDialog">
    <template v-slot:prepend>
      <v-checkbox :model-value="bluetooth" disabled />
    </template>

    <v-list-item-title>Bluetooth</v-list-item-title>
    <v-list-item-subtitle>
      Use bluetooth in
      <strong>ble</strong> node.
    </v-list-item-subtitle>
  </v-list-item>
</template>
