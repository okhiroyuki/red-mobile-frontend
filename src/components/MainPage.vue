<script setup>
import { mdiEye, mdiEyeOff } from "@mdi/js";
import { ref, computed, inject, onMounted, watch } from "vue";
import { validatePort, validateLogin, getItem } from "@/cordova/util";
import Snackbar from "./SnackBar.vue";
import DashboardButton from "./MainPage/DashboardButton.vue";
import RequestPermission from "./MainPage/RequestPermission.vue";
import StartButton from "./MainPage/StartButton.vue";
import CheckBoxes from "./MainPage/CheckBoxes.vue";
const Main = inject("Main");

const status = ref("");
const showPassword = ref(false);
const username = ref("");
const password = ref("");
const port = ref(1880);
const autoStart = ref(false);
const loading = ref(false);
const snackbar = ref(false);
const snackbarText = ref("");
const buttonTitle = ref("Start");
const disabled = ref(false);
const rules = ref({
  required: (value) => !!value || "Required.",
});

onMounted(() => {
  username.value = getItem("username", "");
  password.value = getItem("password", "");
  port.value = getItem("port", "1880");
  Main.setStatusCallback((_status) => {
    status.value = _status;
  });
  status.value = Main.getStatus();
});

const isStarted = computed(() => {
  return status.value === "started";
});

const isStart = computed(() => {
  return status.value === "start";
});

const isPrepare = computed(() => {
  return status.value === "prepare";
});

watch(
  () => status.value,
  () => {
    if (isStarted.value) {
      start();
    } else if (isStart.value) {
      startLoading();
    } else if (isPrepare.value && autoStart.value) {
      click();
    }
  },
);

const changeAutoStart = (_status) => {
  autoStart.value = _status;
  if (_status) {
    if (isStarted.value) {
      showSnackbar("Start automatically next time.");
    } else if (isPrepare.value) {
      click();
    }
  }
};

const showSnackbar = (text) => {
  snackbarText.value = text;
  snackbar.value = true;
  setTimeout(() => {
    snackbar.value = false;
  }, "1000");
};

const click = () => {
  console.log("click");
  if (isStarted.value) {
    Main.launchNodeRED(buttonTitle.value);
  } else {
    if (!validatePort(port.value)) {
      showSnackbar("Please set port.");
      return;
    }
    if (!validateLogin(username.value, password.value)) {
      showSnackbar("must password if set username.");
      return;
    }
    startLoading();
    saveParams(username.value, password.value, port.value);
    Main.start(username.value, password.value, port.value);
  }
};

const saveParams = async (user, pass, port) => {
  await window.localStorage.setItem("username", user);
  await window.localStorage.setItem("password", pass);
  await window.localStorage.setItem("port", port);
};

const start = () => {
  const ip = Main.getIp();
  buttonTitle.value = `http://${ip}:${port.value}/red`;
  disabled.value = true;
  loading.value = false;
};

const startLoading = () => {
  disabled.value = true;
  loading.value = true;
};
</script>

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
    <CheckBoxes @changeAutoStart="changeAutoStart" />
    <StartButton
      :loading="loading"
      :title="buttonTitle"
      :isStarted="isStarted"
      @clickButton="click"
    />
    <DashboardButton v-if="isStarted" />

    <RequestPermission />
    <Snackbar :text="snackbarText" :snackbar="snackbar" />
  </v-container>
</template>
