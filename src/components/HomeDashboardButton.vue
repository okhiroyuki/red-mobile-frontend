<script setup lang="ts">
import { mdiChartBox } from "@mdi/js";
import { inject } from "vue";
const Main = inject("Main") as Main;

const clickDashBoard = () => {
  console.log("dashboard");
  Main.openDashboard();
};
</script>

<template>
  <v-fab-transition>
    <v-btn
      color="red darken-3"
      elevation="8"
      icon=""
      style="bottom: 50px; right: 20px; position: fixed"
    >
      <v-icon @click="clickDashBoard">{{ mdiChartBox }}</v-icon>
    </v-btn>
  </v-fab-transition>
</template>
