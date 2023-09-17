<template>
  <v-container fluid>
    <v-alert
      v-show="disabled"
      type="info"
    >
      After Node-RED is up and running, flow data can be updated.
    </v-alert>

    <v-file-input
      v-show="!disabled"
      accept="application/json"
      label="Flow file"
      @change="selectedFile"
    />
    <v-btn
      v-show="!disabled"
      color="teal darken-1"
      class="mb-5 white--text"
      :loading="loading"
      :disabled="disabled || !canUpload"
      @click="upload"
    >
      Upload
      <v-icon
        right
        dark
        icon="mdiCloudUpload"
      />
    </v-btn>

    <v-alert
      v-show="!disabled"
      outlined
      color="blue-grey"
      icon="mdiSchool"
    >
      <div class="title">
        Importing and Exporting Flows
      </div>
      <div>
        Flows can be imported and exported from the editor using their JSON
        format, making it very easy to share flows with others.<br>For more
        information, please refer to
        <a
          href="https://nodered.org/docs/user-guide/editor/workspace/import-export"
          target="_blank"
        >here</a>.
      </div>
    </v-alert>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
    >
      {{ snackbarText }}
      <template #action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mdiCloudUpload, mdiSchool } from "@mdi/js";

export default {
  data: () => ({
    data: "",
    loading: false,
    canUpload: false,
    snackbar: false,
    snackbarText: "",
    timeout: 2000,
    mdiCloudUpload,
    mdiSchool,
  }),
  computed: {
    disabled() {
      return this.$root.status !== "started";
    },
  },
  methods: {
    selectedFile(file) {
      if (file !== null) {
        this.loading = true;
        const reader = new FileReader();
        reader.onloadend = () => {
          this.data = reader.result;
          this.loading = false;
          this.canUpload = true;
        };
        reader.readAsText(file);
      } else {
        this.canUpload = false;
      }
    },
    async upload() {
      this.canUpload = false;
      this.loading = true;
      try {
        const port = this.$root.getItem("port", 1880);
        const url = `http://127.0.0.1:${port}/upload`;
        await this.axios.post(url, { data: this.data });
        this.loading = false;
        this.snackbarText = "suceess upload";
        this.snackbar = true;
      } catch (error) {
        this.data = "";
        this.loading = false;
        this.snackbarText = error.message;
        this.snackbar = true;
      }
    },
  },
};
</script>
