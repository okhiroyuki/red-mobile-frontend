<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col>
        <v-text-field
          v-model="username"
          type="text"
          :disabled="disabled"
          label="Username"
        />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col>
        <v-text-field
          v-model="password"
          label="Password"
          :append-inner-icon="showPassword ? mdiEye : mdiEyeOff"
          :type="showPassword ? 'text' : 'password'"
          :disabled="disabled"
          @click:append-inner="showPassword = !showPassword"
        />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col>
        <v-text-field
          v-model="port"
          type="number"
          :disabled="disabled"
          :rules="[rules.required]"
          label="Port"
        />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="6" style="height: 40px">
        <v-checkbox v-model="keepAwake" class="mt-0 mr-1" label="keepAwake">
        </v-checkbox>
      </v-col>
      <v-col cols="6" style="height: 40px">
        <v-checkbox v-model="autoStart" class="mt-0 mr-1" label="AutoStart" />
      </v-col>
      <v-col cols="6" style="height: 60px">
        <v-checkbox
          v-model="env"
          class="mt-0 mr-1"
          label="CustomEnv"
          disabled
        />
      </v-col>
      <v-col cols="6" style="height: 60px">
        <v-checkbox
          v-model="hasModules"
          class="mt-0 mr-1"
          label="CustomModules"
          disabled
        />
      </v-col>
    </v-row>
    <v-row class="mt-1">
      <v-col>
        <v-btn
          color="teal darken-1"
          class="white--text"
          :disabled="loading"
          :loading="loading"
          block
          x-large
          style="text-transform: none"
          @click="click"
        >
          {{ buttonTitle }}
          <v-icon v-if="isStarted"> {{ mdiOpenInNew }}</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-fab-transition>
      <v-btn
        v-show="isStarted"
        color="red darken-3"
        elevation="8"
        icon=""
        style="bottom: 50px; right: 20px; position: fixed"
      >
        <v-icon @click="dashboard">{{ mdiChartBox }}</v-icon>
      </v-btn>
    </v-fab-transition>

    <div class="mt-5">
      <v-alert
        v-show="!hasPermission"
        start
        colored-border
        type="info"
        elevation="2"
      >
        Check the permissions required to use the app in Menu >
        <router-link to="/setting">Setting</router-link>.
      </v-alert>
    </div>
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
import { mdiChartBox, mdiOpenInNew, mdiEye, mdiEyeOff } from "@mdi/js";

let vm;
let ipWatch;
let statusWatch;

export default {
  data() {
    return {
      mdiChartBox,
      mdiOpenInNew,
      mdiEye,
      mdiEyeOff,
      showPassword: false,
      username: "",
      password: "",
      port: 1880,
      keepAwake: false,
      autoStart: false,
      env: false,
      loading: false,
      snackbar: false,
      snackbarText: "",
      timeout: 2000,
      buttonTitle: "Start",
      disabled: false,
      rules: {
        required: (value) => !!value || "Required.",
      },
    };
  },
  computed: {
    isStarted() {
      return vm.status === "started";
    },
    isStart() {
      return vm.status === "start";
    },
    isPrepare() {
      return vm.status === "prepare";
    },
    hasPermission() {
      return (
        vm.permission.location &&
        vm.permission.camera &&
        vm.permission.mic &&
        vm.permission.storage &&
        vm.permission.bluetooth
      );
    },
    hasModules() {
      return vm.hasModules;
    },
  },
  watch: {
    keepAwake(val) {
      const oldValue = vm.getBooleanItem("keepawake", false);
      if (oldValue !== val) {
        window.localStorage.setItem("keepawake", val);
        vm.setKeepAwake(val);
      }
    },
    autoStart(val) {
      const oldValue = vm.getBooleanItem("autostart", false);
      if (oldValue !== val) {
        window.localStorage.setItem("autostart", val);
        if (val) {
          if (this.isStarted) {
            this.snackbarText = "Start automatically next time.";
            this.snackbar = true;
          } else if (this.isPrepare) {
            this.click();
          }
        }
      }
    },
  },
  created() {
    vm = this.$root;
    // eslint-disable-next-line no-unused-vars
    ipWatch = vm.$watch("ip", (n, o) => {
      if (this.isStarted) {
        this.buttonTitle = `http://${n}:${this.port}/red `;
      }
    });
    // eslint-disable-next-line no-unused-vars
    statusWatch = vm.$watch("status", (n, o) => {
      if (this.isStarted) {
        this.setStart();
      } else if (this.isPrepare && this.autoStart) {
        this.click();
      }
    });
    this.username = vm.getItem("username", "");
    this.password = vm.getItem("password", "");
    this.port = vm.getItem("port", 1880);
    this.autoStart = vm.getBooleanItem("autostart", false);
    this.keepAwake = vm.getBooleanItem("keepawake", false);
    this.env = vm.hasEnv();
    if (this.isStarted) {
      this.setStart();
    } else if (this.isStart) {
      this.setLoading();
    }
  },
  beforeUnmount() {
    ipWatch();
    statusWatch();
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    click(e) {
      if (this.isStarted) {
        vm.launchNodeRED(this.buttonTitle);
      } else {
        if (!vm.validatePort(this.port)) {
          this.snackbarText = "Please set port.";
          this.snackbar = true;
          return;
        }
        if (!vm.validateLogin(this.username, this.password)) {
          this.snackbarText = "must password if set username.";
          this.snackbar = true;
          return;
        }
        this.setLoading();
        this.saveParams(this.username, this.password, this.port);
        vm.start(this.username, this.password, this.port);
      }
    },
    saveParams(user, pass, port) {
      window.localStorage.setItem("username", user);
      window.localStorage.setItem("password", pass);
      window.localStorage.setItem("port", port);
    },
    setStart() {
      this.buttonTitle = `http://${vm.ip}:${this.port}/red`;
      this.disabled = true;
      this.loading = false;
    },
    dashboard() {
      vm.openDashboard();
    },
    setLoading() {
      this.disabled = true;
      this.loading = true;
    },
  },
};
</script>
