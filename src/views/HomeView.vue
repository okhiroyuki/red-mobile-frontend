<script setup lang="ts">
import { mdiMenu } from "@mdi/js";
import { computed, inject, onMounted, ref, watch } from "vue";
import AppBar from "../components/BaseAppBar.vue";
import Snackbar from "../components/BaseSnackBar.vue";
import CheckBoxes from "../components/HomeCheckBoxes.vue";
import DashboardButton from "../components/HomeDashboardButton.vue";
import Password from "../components/HomePassword.vue";
import Port from "../components/HomePort.vue";
import RequestPermission from "../components/HomeRequestPermission.vue";
import StartButton from "../components/HomeStartButton.vue";
import Username from "../components/HomeUsername.vue";
import { getItem, validateLogin, validatePort } from "../cordova/util";

const Main = inject("Main") as Main;

const status = ref("");
const username = ref(getItem("username", ""));
const password = ref(getItem("password", ""));
const port = ref(getItem("port", "1880"));
const autoStart = ref(false);
const loading = ref(false);
const snackbar = ref(false);
const snackbarText = ref("");
const buttonTitle = ref("Start");
const disabled = ref(false);

onMounted(() => {
  Main.setStatusCallback((_status: string) => {
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

const changeAutoStart = (_status: boolean) => {
  autoStart.value = _status;
  if (_status) {
    if (isStarted.value) {
      showSnackbar("Start automatically next time.");
    } else if (isPrepare.value) {
      click();
    }
  }
};

const showSnackbar = (text: string) => {
  snackbarText.value = text;
  snackbar.value = true;
  setTimeout(() => {
    snackbar.value = false;
  }, 1000);
};

const click = () => {
  console.log("click");
  console.log(`${username.value} : ${password.value} : ${port.value}`);

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

const saveParams = (user: string, pass: string, port: string) => {
  window.localStorage.setItem("username", user);
  window.localStorage.setItem("password", pass);
  window.localStorage.setItem("port", port);
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

const updateUsername = (_username: string) => {
  console.log(_username);
  username.value = _username;
};

const updatePassword = (_password: string) => {
  password.value = _password;
};

const updatePort = (_port: string) => {
  port.value = _port;
};
</script>

<template>
  <AppBar :appIcon="mdiMenu" :title="`Home`" />
  <main>
    <v-container fluid>
      <Username
        :username="username"
        :disabled="disabled"
        @update="updateUsername"
      />
      <Password
        :password="password"
        :disabled="disabled"
        @update="updatePassword"
      />
      <Port :port="port" :disabled="disabled" @update="updatePort" />
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
