<script setup>
import AppBar from "../components/BaseAppBar.vue";
import LicenseContents from "../components/LicenseContents.vue";
import { mdiArrowLeft } from "@mdi/js";
import { ref } from "vue";
const title = ref("License");
</script>

<template>
  <AppBar :appIcon="mdiArrowLeft" :title="title" />
  <LicenseContents />
</template>
