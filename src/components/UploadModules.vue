<script setup>
import { mdiCloudUpload, mdiPaperclip } from "@mdi/js";
import { ref, computed, onMounted, inject } from "vue";
import * as Modules from "@/cordova/modules";
import { getFile } from "@/cordova/util";
import Snackbar from "./SnackBar.vue";
import ModulesNote from "./UploadModules/ModulesNote.vue";
const Main = inject("Main");
const Purchase = inject("Purchase");

const uri = ref("");
const filename = ref("");
const loadingCopy = ref(false);
const loadingReset = ref(false);
const disable = ref(true);
const snackbar = ref(false);
const snackbarText = ref("");
const purchase = ref(false);
const canPurchase = ref(false);
const loadingPurchase = ref(false);
const hasOwned = ref(false);
const status = ref(false);

onMounted(() => {
  Main.setStatusCallback((_status) => {
    status.value = _status;
  });
  status.value = Main.getStatus();
});

const isStarted = computed(() => {
  return status.value === "started";
});

const setCanPurchase = async () => {
  canPurchase.value = await Purchase.canPurchase();
};

onMounted(() => {
  Purchase.setCallback((_owned) => {
    hasOwned.value = _owned;
  });
  setCanPurchase();
});

const showSnackbar = (text) => {
  snackbarText.value = text;
  snackbar.value = true;
  setTimeout(() => {
    snackbar.value = false;
  }, "1000");
};

const select = async () => {
  const file = await getFile("application/zip");
  if (file) {
    uri.value = file.uri;
    filename.value = file.name;
    disable.value = false;
  }
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
  const result = await Purchase.order();
  loadingPurchase.value = result;
  purchase.value = result;
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
      <v-btn
        color="primary"
        :disabled="purchase || !canPurchase"
        @click="order"
      >
        Purchase
      </v-btn>
    </v-alert>

    <v-text-field
      v-show="!isStarted"
      label="modules"
      :value="filename"
      :disabled="!hasOwned || loadingCopy || loadingReset"
      @click="select"
    >
      <template v-slot:prepend>
        <v-icon>{{ mdiPaperclip }}</v-icon>
      </template>
    </v-text-field>

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
      <v-btn
        v-show="!isStarted"
        class="ma-1 white--text"
        color="red darken-4"
        :disabled="loadingCopy || loadingReset"
        :loading="loadingReset"
        @click="reset"
      >
        Reset
      </v-btn>
    </v-row>

    <ModulesNote :isShow="!isStarted" />
    <Snackbar :text="snackbarText" :snackbar="snackbar" />
  </v-container>
</template>
