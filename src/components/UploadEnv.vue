<script setup>
import { mdiCloudUpload } from "@mdi/js";
import { ref, onMounted } from "vue";
import * as Env from "@/cordova/env";
import { readUploadedFileAsText } from "@/resources/file";
import Snackbar from "./BaseSnackBar.vue";
import EnvNote from "./UploadEnvNote.vue";

const filename = ref([]);
const disabledUpload = ref(true);
const disabledReset = ref(false);
const loading = ref(false);
const snackbar = ref(false);
const snackbarText = ref("");
const readData = ref("");

const setDisabledReset = async () => {
  disabledReset.value = await !Env.hasEnv();
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

const selectedFile = async (event) => {
  if (event.target.files) {
    loading.value = true;
    readData.value = "";
    const file = event.target.files[0];
    try {
      const fileContents = await readUploadedFileAsText(file);
      readData.value = fileContents;
      loading.value = false;
      disabledUpload.value = false;
    } catch (e) {
      console.log(e.message);
      filename.value = [];
      loading.value = false;
      disabledUpload.value = true;
    }
  } else {
    readData.value = "";
    disabledUpload.value = true;
  }
};

const clickUpload = async () => {
  try {
    await Env.write(readData.value);
  } catch (e) {
    console.log(e.message);
  }
  disabledReset.value = false;
  disabledUpload.value = true;
  showSnackbar("Set Done.");
};
const clickReset = async () => {
  try {
    await Env.remove();
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
    <v-file-input
      :model-value="filename"
      label="Env file"
      @change="selectedFile"
    />
    <v-textarea
      solo
      name="input-7-4"
      label="Data"
      :model-value="readData"
      disabled
    />
    <v-row class="mb-5">
      <v-btn
        class="ma-1 white--text"
        color="teal darken-1"
        :disabled="disabledUpload"
        :loading="loading"
        @click="clickUpload"
      >
        Upload
        <v-icon right dark>{{ mdiCloudUpload }}</v-icon>
      </v-btn>
      <v-btn
        class="ma-1 white--text"
        color="red darken-4"
        :disabled="disabledReset"
        @click="clickReset"
      >
        Reset
      </v-btn>
    </v-row>
    <EnvNote />
    <Snackbar :text="snackbarText" :snackbar="snackbar" />
  </v-container>
</template>
