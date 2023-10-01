<script setup>
import { ref, onMounted } from "vue";
import { hasEnv, write, remove } from "../cordova/env";
import { readAsText } from "../cordova/util";
import Snackbar from "./BaseSnackBar.vue";
import EnvNote from "./UploadEnvNote.vue";
import ResetButton from "./BaseResetButton.vue";
import UploadButton from "./BaseUploadButton.vue";
import FileSelector from "./BaseFileSelector.vue";
const filename = ref([]);
const disabledUpload = ref(true);
const disabledReset = ref(false);
const loading = ref(false);
const snackbar = ref(false);
const snackbarText = ref("");
const readData = ref("");

const setDisabledReset = async () => {
  disabledReset.value = await !hasEnv();
};

onMounted(() => {
  setDisabledReset();
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
    loading.value = false;
    disabledUpload.value = false;
  } catch (e) {
    console.log(e.message);
    filename.value = [];
    loading.value = false;
    disabledUpload.value = true;
  }
};

const clickUpload = async () => {
  try {
    await write(readData.value);
  } catch (e) {
    console.log(e.message);
  }
  disabledReset.value = false;
  disabledUpload.value = true;
  showSnackbar("Set Done.");
};

const clickReset = async () => {
  try {
    await remove();
  } catch (e) {
    console.log(e.message);
  }
  readData.value = "";
  filename.value = [];
  disabledReset.value = true;
  showSnackbar("Reset Done.");
};
</script>

<template>
  <v-container fluid>
    <FileSelector :label="'Env file'" @selectFile="selectFile" />
    <v-textarea
      solo
      name="input-7-4"
      label="Data"
      :model-value="readData"
      disabled
    />
    <v-row class="mb-5">
      <UploadButton
        :disabled="disabledUpload"
        :loading="loading"
        @click="clickUpload"
      />
      <ResetButton :disabled="disabledReset" @click="clickReset" />
    </v-row>
    <EnvNote />
    <Snackbar :text="snackbarText" :snackbar="snackbar" />
  </v-container>
</template>
