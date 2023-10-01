<script setup>
import { ref, computed, inject, onMounted, watch } from "vue";
import { validatePort, validateLogin, getItem } from "../cordova/util";
import Snackbar from "../components/BaseSnackBar.vue";
import AppBar from "../components/BaseAppBar.vue";
import DashboardButton from "../components/HomeDashboardButton.vue";
import RequestPermission from "../components/HomeRequestPermission.vue";
import StartButton from "../components/HomeStartButton.vue";
import CheckBoxes from "../components/HomeCheckBoxes.vue";
import Password from "../components/HomePassword.vue";
import Port from "../components/HomePort.vue";
import Username from "../components/HomeUsername.vue";
import { mdiMenu } from "@mdi/js";

const Main = inject("Main");

const title = "Home";
const status = ref("");
const username = ref("");
const password = ref("");
const port = ref(1880);
const autoStart = ref(false);
const loading = ref(false);
const snackbar = ref(false);
const snackbarText = ref("");
const buttonTitle = ref("Start");
const disabled = ref(false);

onMounted(() => {
  username.value = getItem("username", "");
  password.value = getItem("password", "");
  port.value = Number(getItem("port", "1880"));
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
  <AppBar :appIcon="mdiMenu" :title="title" />
  <main>
    <v-container fluid>
      <Username :username="username" :disabled="disabled" />
      <Password :password="password" :disabled="disabled" />
      <Port :port="port" :disabled="disabled" />
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
  </main>
</template>
