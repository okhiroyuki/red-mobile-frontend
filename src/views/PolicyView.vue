<script setup>
import AppBar from "../components/AppBar.vue";
import LoadPolicy from "../components/LoadPolicy.vue";
import { mdiArrowLeft } from "@mdi/js";
import { ref } from "vue";
const title = ref("Policy");
</script>

<template>
  <AppBar :appIcon="mdiArrowLeft" :title="title" :showUploadTab="false" />
  <LoadPolicy />
</template>
