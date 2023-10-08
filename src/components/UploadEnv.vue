<script setup lang="ts">
import { ref, onMounted } from "vue";
import { hasEnv, write, remove } from "../cordova/env";
import { readAsText } from "../cordova/util";
import Snackbar from "./BaseSnackBar.vue";
import EnvNote from "./UploadEnvNote.vue";
import ResetButton from "./BaseResetButton.vue";
import UploadButton from "./BaseUploadButton.vue";
import FileSelector from "./BaseFileSelector.vue";

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

const showSnackbar = (text: string) => {
  snackbarText.value = text;
  snackbar.value = true;
  setTimeout(() => {
    snackbar.value = false;
  }, 1000);
};

const selectFile = async (file: { uri: string }) => {
  loading.value = true;
  try {
    readData.value = await readAsText(file.uri);
  } catch (e: any) {
    console.log(e.message);
  } finally {
    loading.value = false;
  }
};

const clickUpload = async () => {
  try {
    await write(readData.value);
    readData.value = "";
    disabledReset.value = false;
    showSnackbar("Set Done.");
  } catch (e: any) {
    console.log(e.message);
    showSnackbar("Upload Failure.");
  }
};

const clickReset = async () => {
  try {
    await remove();
    disabledReset.value = true;
    showSnackbar("Reset Done.");
  } catch (e: any) {
    console.log(e.message);
    showSnackbar("Reset Failure.");
  }
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
        :disabled="!readData"
        :loading="loading"
        @click="clickUpload"
      />
      <ResetButton :disabled="disabledReset" @click="clickReset" />
    </v-row>
    <EnvNote />
    <Snackbar :text="snackbarText" :snackbar="snackbar" />
  </v-container>
</template>
