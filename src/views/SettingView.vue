<script setup>
import AppBar from "../components/AppBar.vue";
import SettingPermission from "../components/SettingPermission.vue";
import { mdiArrowLeft } from "@mdi/js";
import { ref } from "vue";
const title = ref("Setting");
</script>

<template>
  <AppBar :appIcon="mdiArrowLeft" :title="title" :showUploadTab="false" />
  <SettingPermission />
</template>
