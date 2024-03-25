<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { hasEnv } from "../cordova/env";
import * as Modules from "../cordova/modules";
import { getBooleanItem, setKeepAwake } from "../cordova/util";

const emits = defineEmits<{
  changeAutoStart: [value: boolean];
}>();

const autoStart = ref(false);
const keepAwake = ref(false);
const modules = ref(false);
const env = ref(false);

onMounted(() => {
  autoStart.value = getBooleanItem("autostart");
  keepAwake.value = getBooleanItem("keepawake");
  hasModules();
  env.value = hasEnv();
});

watch(
  () => keepAwake.value,
  () => {
    window.localStorage.setItem(
      "keepawake",
      Boolean(keepAwake.value).toString(),
    );
    setKeepAwake(keepAwake.value);
  },
);

watch(
  () => autoStart.value,
  () => {
    window.localStorage.setItem(
      "autostart",
      Boolean(autoStart.value).toString(),
    );
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
