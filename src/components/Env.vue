<template>
  <v-container fluid>
    <v-file-input
      v-model="filename"
      accept="*"
      label="Env file"
      @change="selectedFile"
    />
    <v-textarea solo name="input-7-4" label="Data" :value="readData" disabled />
    <v-row class="mb-5">
      <v-btn
        class="ma-1 white--text"
        color="teal darken-1"
        :disabled="disabledUpload"
        :loading="loading"
        @click="clickUpload"
      >
        Upload
        <v-icon right dark icon="mdiCloudUpload" />
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
    <v-alert outlined color="blue-grey" icon="mdiSchool">
      <div class="title">Using environment variables</div>
      <div>
        <p>
          Please prepare env.txt. Environment variables should be added on a new
          line in the form of
          <code>NAME=VALUE</code>.
        </p>
        <p>For example:</p>
        <blockquote>
          DB_HOST=localhost<br />
          DB_USER=root<br />
          DB_PASS=s1mpl3<br />
        </blockquote>
        <br />
        <p>
          Environment variables will always be overwritten. If you want to
          delete the content, please RESET.
        </p>
        <p>
          To use environment variables in Node-RED, see
          <a
            href="https://nodered.org/docs/user-guide/environment-variables"
            target="_blank"
            >here</a
          >.
        </p>
      </div>
    </v-alert>
    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
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
    filename: null,
    disabledUpload: true,
    disabledReset: false,
    loading: false,
    snackbar: false,
    snackbarText: "",
    timeout: 2000,
    readData: "",
    mdiCloudUpload,
    mdiSchool,
  }),
  created() {
    this.disabledReset = !this.$root.hasEnv();
  },
  methods: {
    selectedFile(file) {
      if (file !== null) {
        this.loading = true;
        const reader = new FileReader();
        reader.onloadend = () => {
          this.readData = reader.result;
          this.loading = false;
          this.disabledUpload = false;
        };
        reader.readAsText(file);
      } else {
        this.readData = "";
        this.disabledUpload = true;
      }
    },
    clickUpload() {
      this.$root.envWrite(this.readData);
      this.disabledReset = false;
      this.disabledUpload = true;
      this.snackbar = true;
      this.snackbarText = "Set Done.";
    },
    clickReset() {
      this.readData = "";
      this.filename = null;
      this.$root.envRemove();
      this.disabledReset = true;
      this.snackbar = true;
      this.snackbarText = "Reset Done.";
    },
  },
};
</script>
