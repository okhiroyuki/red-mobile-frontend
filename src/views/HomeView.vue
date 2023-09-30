<script setup>
import MainPage from "../components/MainPage.vue";
import AppBar from "../components/AppBar.vue";

import { mdiMenu } from "@mdi/js";
import { ref } from "vue";

const title = ref("Home");
</script>

<template>
  <AppBar :appIcon="mdiMenu" :title="title" :showUploadTab="false" />
  <main>
    <MainPage />
  </main>
</template>
