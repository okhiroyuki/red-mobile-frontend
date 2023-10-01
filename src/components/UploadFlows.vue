<script setup>
import { mdiCloudUpload } from "@mdi/js";
import { ref, computed, inject, onMounted } from "vue";
import Snackbar from "./BaseSnackBar.vue";
import FlowNote from "./UploadFlowsNote.vue";
const axios = inject("axios");
const Main = inject("Main");

const readData = ref("");
const loading = ref(false);
const canUpload = ref(false);
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

const selectedFile = async (event) => {
  if (event.target.files) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      readData.value = reader.result;
      loading.value = false;
      canUpload.value = true;
    };
    reader.onerror = () => {
      readData.value = "";
      loading.value = true;
      canUpload.value = false;
    };
    loading.value = true;
    reader.readAsText(file);
  } else {
    canUpload.value = false;
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
  canUpload.value = false;
  loading.value = true;
  try {
    const port = getItem("port", 1880);
    const url = `http://127.0.0.1:${port}/upload`;
    await axios.post(url, { data: readData.value });
    loading.value = false;
    showSnackbar("suceess upload");
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

    <v-file-input v-show="!disabled" label="Flow file" @change="selectedFile" />
    <v-btn
      v-show="!disabled"
      color="teal darken-1"
      class="mb-5 white--text"
      :loading="loading"
      :disabled="disabled || !canUpload"
      @click="upload"
    >
      Upload
      <v-icon right dark>{{ mdiCloudUpload }}</v-icon>
    </v-btn>

    <FlowNote :isShow="!disabled" />
    <Snackbar :text="snackbarText" :snackbar="snackbar" />
  </v-container>
</template>
