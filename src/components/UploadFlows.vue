<script setup lan="ts">
import { ref, computed, inject, onMounted } from "vue";
import Snackbar from "./BaseSnackBar.vue";
import FlowNote from "./UploadFlowsNote.vue";
import UploadButton from "./BaseUploadButton.vue";
import FileSelector from "./BaseFileSelector.vue";
import { readAsText } from "../cordova/util";
const axios = inject("axios");
const Main = inject("Main");

const readData = ref("");
const loading = ref(false);
const snackbar = ref(false);
const snackbarText = ref("");
const status = ref("");

const disabled = computed(() => {
  return status.value !== "started";
});

onMounted(() => {
  Main.setStatusCallback((_status) => {
    status.value = _status;
  });
  status.value = Main.getStatus();
});

const showSnackbar = (text) => {
  snackbarText.value = text;
  snackbar.value = true;
  setTimeout(() => {
    snackbar.value = false;
  }, "1000");
};

const selectFile = async (file) => {
  try {
    readData.value = await readAsText(file.uri);
  } catch (e) {
    console.log(e.message);
  }
};

const getItem = (item, defaultValue) => {
  const val = window.localStorage.getItem(item);
  if (val !== null) {
    return val;
  }
  return defaultValue;
};

const upload = async () => {
  loading.value = true;
  try {
    const port = getItem("port", 1880);
    const url = `http://localhost:${port}/upload`;
    await axios.post(url, { data: readData.value });
    loading.value = false;
    readData.value = "";
    showSnackbar("success upload");
  } catch (error) {
    readData.value = "";
    loading.value = false;
    showSnackbar(error.message);
  }
};
</script>

<template>
  <v-container fluid>
    <v-alert v-show="disabled" type="info">
      After Node-RED is up and running, flow data can be updated.
    </v-alert>
    <div v-if="!disabled">
      <FileSelector :label="'Flow file'" @selectFile="selectFile" />
      <UploadButton :disabled="!readData" :loading="loading" @click="upload" />
      <FlowNote />
    </div>
    <Snackbar :text="snackbarText" :snackbar="snackbar" />
  </v-container>
</template>
