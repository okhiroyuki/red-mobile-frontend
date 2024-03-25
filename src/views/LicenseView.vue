<script setup lang="ts">
import { mdiArrowLeft } from "@mdi/js";
import AppBar from "../components/BaseAppBar.vue";
import LicenseContents from "../components/LicenseContents.vue";
</script>

<template>
  <AppBar :appIcon="mdiArrowLeft" :title="`License`" />
  <LicenseContents />
</template>
