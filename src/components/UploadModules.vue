<script setup>
import { mdiCloudUpload } from "@mdi/js";
import { ref, computed, onMounted, inject } from "vue";
import * as Modules from "../cordova/modules";
import Snackbar from "./BaseSnackBar.vue";
import ModulesNote from "./UploadModulesNote.vue";
import FileSelector from "./BaseFileSelector.vue";
import ResetButton from "./BaseResetButton.vue";
const Main = inject("Main");
const Purchase = inject("Purchase");

const uri = ref("");
const filename = ref("");
const loadingCopy = ref(false);
const loadingReset = ref(false);
const disable = ref(true);
const snackbar = ref(false);
const snackbarText = ref("");
const canPurchase = ref(false);
const hasOwned = ref(false);
const status = ref(false);

const isStarted = computed(() => {
  return status.value === "started";
});

const setCanPurchase = async () => {
  canPurchase.value = await Purchase.canPurchase();
};

const getOwned = async () => {
  hasOwned.value = await Purchase.getOwned();
};

onMounted(() => {
  Purchase.setCallback((_owned) => {
    hasOwned.value = _owned;
  });
  Main.setStatusCallback((_status) => {
    status.value = _status;
  });
  getOwned();
  setCanPurchase();
  status.value = Main.getStatus();
});

const showSnackbar = (text) => {
  snackbarText.value = text;
  snackbar.value = true;
  setTimeout(() => {
    snackbar.value = false;
  }, "1000");
};

const select = (file) => {
  uri.value = file.uri;
  filename.value = file.name;
  disable.value = false;
};

const copy = async () => {
  disable.value = true;
  loadingCopy.value = true;
  try {
    await Modules.copy(uri.value);
    Main.reset();
  } catch (e) {
    loadingCopy.value = false;
    showSnackbar("Update Failure");
  }
};
const reset = async () => {
  disable.value = true;
  loadingReset.value = true;
  try {
    await Modules.remove();
    Main.reset();
  } catch (e) {
    loadingReset.value = false;
    showSnackbar("Reset failure");
  }
};
const order = async () => {
  await Purchase.order();
};
</script>

<template>
  <v-container fluid>
    <v-alert v-show="isStarted" type="info">
      After Node-RED is started, it cannot be update.
    </v-alert>

    <v-alert
      v-show="!hasOwned && !isStarted"
      border="start"
      colored-border
      type="info"
      elevation="2"
    >
      <p>To use this feature, you need to purchase a subscription.</p>
      <p>
        If you can't press the buy button, please select another tab and come
        back.
      </p>
      <v-btn color="primary" :disabled="!canPurchase" @click="order">
        Purchase
      </v-btn>
    </v-alert>

    <FileSelector
      v-if="!isStarted"
      :label="'modules'"
      :metadata="'application/zip'"
      :disabled="!hasOwned || loadingCopy || loadingReset"
      @selectFile="select"
    />

    <v-row class="mb-5">
      <v-btn
        v-show="!isStarted"
        class="ma-1 white--text"
        color="teal darken-1"
        :loading="loadingCopy"
        :disabled="!hasOwned || disable"
        @click="copy"
      >
        Upload
        <v-icon right dark>{{ mdiCloudUpload }}</v-icon>
      </v-btn>
      <ResetButton
        v-if="!isStarted"
        :disabled="loadingCopy || loadingReset"
        :loading="loadingReset"
        @clickReset="reset"
      />
    </v-row>

    <ModulesNote :isShow="!isStarted" />
    <Snackbar :text="snackbarText" :snackbar="snackbar" />
  </v-container>
</template>
