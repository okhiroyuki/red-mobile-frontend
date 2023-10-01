<script setup>
import AppBar from "../components/BaseAppBar.vue";
import LicenseContents from "../components/LicenseContents.vue";
import { mdiArrowLeft } from "@mdi/js";
</script>

<template>
  <AppBar :appIcon="mdiArrowLeft" :title="`License`" />
  <LicenseContents />
</template>
