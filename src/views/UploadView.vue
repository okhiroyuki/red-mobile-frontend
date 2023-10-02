<script setup>
import AppBar from "../components/BaseAppBar.vue";
import UploadFlows from "../components/UploadFlows.vue";
import UploadEnv from "../components/UploadEnv.vue";
import UploadModules from "../components/UploadModules.vue";
import { mdiArrowLeft } from "@mdi/js";
import { ref } from "vue";

const tabTitles = ref(["Flows", "Env", "Modules"]);
const tabTitle = ref(tabTitles.value[0]);

const tabTitleClick = (_tabTitle) => {
  tabTitle.value = _tabTitle;
};
</script>

<template>
  <AppBar
    @tabTitleClick="tabTitleClick"
    :appIcon="mdiArrowLeft"
    :title="`Upload`"
    :showTab="true"
    :tabTitles="tabTitles"
  >
  </AppBar>
  <div v-if="tabTitle === `Flows`">
    <UploadFlows />
  </div>
  <div v-else-if="tabTitle === `Env`">
    <UploadEnv />
  </div>
  <div v-else>
    <UploadModules />
  </div>
</template>
