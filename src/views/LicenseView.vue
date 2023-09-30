<script setup>
import AppBar from "../components/AppBar.vue";
import ShowLicense from "@/components/ShowLicense.vue";
import { mdiArrowLeft } from "@mdi/js";
import { ref } from "vue";
const title = ref("License");
</script>

<template>
  <AppBar :appIcon="mdiArrowLeft" :title="title" :showUploadTab="false" />
  <ShowLicense />
</template>
