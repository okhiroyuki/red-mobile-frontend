<script setup>
import * as Modules from "../cordova/modules";
import { hasEnv } from "../cordova/env";
import { ref, onMounted, watch } from "vue";
import { getBooleanItem, setKeepAwake } from "../cordova/util";

const emits = defineEmits(["changeAutoStart"]);

const autoStart = ref(false);
const keepAwake = ref(false);
const modules = ref(false);
const env = ref(false);

onMounted(() => {
  autoStart.value = getBooleanItem("autostart", false);
  keepAwake.value = getBooleanItem("keepawake", false);
  hasModules();
  env.value = hasEnv();
});

watch(
  () => keepAwake.value,
  () => {
    window.localStorage.setItem("keepawake", keepAwake.value);
    setKeepAwake(keepAwake.value);
  },
);

watch(
  () => autoStart.value,
  () => {
    window.localStorage.setItem("autostart", autoStart.value);
    emits("changeAutoStart", autoStart.value);
  },
);

const hasModules = async () => {
  modules.value = await Modules.hasModules();
};
</script>

<template>
  <v-row no-gutters>
    <v-col cols="6" style="height: 40px">
      <v-checkbox v-model="keepAwake" class="mt-0 mr-1" label="keepAwake" />
    </v-col>
    <v-col cols="6" style="height: 40px">
      <v-checkbox v-model="autoStart" class="mt-0 mr-1" label="AutoStart" />
    </v-col>
    <v-col cols="6" style="height: 60px">
      <v-checkbox v-model="env" class="mt-0 mr-1" label="CustomEnv" disabled />
    </v-col>
    <v-col cols="6" style="height: 60px">
      <v-checkbox
        v-model="modules"
        class="mt-0 mr-1"
        label="CustomModules"
        disabled
      />
    </v-col>
  </v-row>
</template>
