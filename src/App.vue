<script setup lang="ts">
import { inject, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { moveToBackground } from "./cordova/background";
import { isCordova } from "./cordova/util";
const Main = inject("Main") as Main;

const router = useRouter();
const route = useRoute();

onMounted(() => {
  if (isCordova()) router.push("/");
  Main.setBackKeyDownCallback(() => {
    console.log("onBackKeyDown");
    if (route.path === "/") {
      moveToBackground();
    } else {
      window.history.back();
    }
  });
});
</script>

<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

    <v-footer padless color="red darken-4" app>
      <v-col class="text-center" cols="12" />
    </v-footer>
  </v-app>
</template>
