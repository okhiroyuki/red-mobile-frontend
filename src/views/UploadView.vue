<script setup>
import UploadFlows from "../components/UploadFlows.vue";
import UploadEnv from "../components/UploadEnv.vue";
import UploadModules from "../components/UploadModules.vue";
import AppBar from "../components/AppBar.vue";
import { mdiArrowLeft } from "@mdi/js";
import { ref } from "vue";

const title = ref("Upload");
const tabTitle = ref("Flows");

const tabTitleClick = (_tabTitle) => {
  tabTitle.value = _tabTitle;
};
</script>

<template>
  <AppBar
    @tabTitleClick="tabTitleClick"
    :appIcon="mdiArrowLeft"
    :title="title"
    :showUploadTab="true"
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
