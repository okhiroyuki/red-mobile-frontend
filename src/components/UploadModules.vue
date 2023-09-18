<template>
  <v-container fluid>
    <v-alert v-show="isStarted" type="info">
      After Node-RED is started, it cannot be update.
    </v-alert>

    <v-alert
      v-show="!hasOwned && !isStarted"
      border="left"
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
      prepend-icon="mdiPaperclip"
      :disabled="!hasOwned || loadingCopy || loadingReset"
      @click="select"
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

    <v-alert v-show="!isStarted" outlined color="blue-grey">
      <v-icon>{{ mdiSchool }}</v-icon>
      <div class="title">
        How to update the node-module for custom node RED.
      </div>
      <div>
        <ol>
          <li>
            Generate <strong>node_modules.zip</strong> using this as
            <a
              href="https://github.com/okhiroyuki/redmobile-modules-generator"
              target="_blank"
              >a reference</a
            >.
          </li>
          <li>
            Set the generated <strong>node_modules.zip</strong> to the Android
            device.
          </li>
          <li>Select the <strong>node_modules.zip</strong> file.</li>
          <li>Press upload button to automatically restart the system.</li>
          <li>it will be reflected after reboot.</li>
        </ol>
        <br />
        <strong>Note: </strong>
        <p>
          Reset to initialize to the preset contents. Be sure to reboot in this
          case as well.
        </p>
      </div>
    </v-alert>

    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ snackbarText }}
      <template #action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mdiCloudUpload, mdiSchool, mdiPaperclip } from "@mdi/js";

export default {
  data() {
    return {
      uri: "",
      filename: "",
      loadingCopy: false,
      loadingReset: false,
      disable: true,
      snackbar: false,
      snackbarText: "",
      timeout: 2000,
      purchase: false,
      canPurchase: false,
      loadingPurchase: false,
      mdiCloudUpload,
      mdiSchool,
      mdiPaperclip,
    };
  },
  computed: {
    isStarted() {
      return this.$root.status === "started";
    },
    hasOwned() {
      return this.$root.owned;
    },
  },
  async created() {
    const result = await this.$root.canPurchase();
    this.canPurchase = result;
  },
  methods: {
    async select() {
      const file = await this.$root.getFile("application/zip");
      if (file) {
        this.uri = file.uri;
        this.filename = file.name;
        this.disable = false;
      }
    },
    async copy() {
      this.disable = true;
      this.loadingCopy = true;
      try {
        await this.$root.copyNodeModules(this.uri);
        await this.$root.reset();
      } catch (e) {
        this.loadingCopy = false;
        this.snackbar = true;
        this.snackbarText = "Update Failure";
      }
    },
    async reset() {
      this.disable = true;
      this.loadingReset = true;
      try {
        await this.$root.removeNodeModules();
        await this.$root.reset();
      } catch (e) {
        this.loadingReset = false;
        this.snackbar = true;
        this.snackbarText = "Reset failure";
      }
    },
    async order() {
      const result = await this.$root.order();
      this.loadingPurchase = result;
      this.purchase = result;
    },
  },
};
</script>
