<script setup lang="ts">
import { mdiInformationVariant } from "@mdi/js";
import { ref, onMounted } from "vue";
import { getVersion } from "../cordova/version";

const version = ref("");
const formatVersion = async () => {
  version.value = `Version ${await getVersion()}`;
};

onMounted(() => {
  formatVersion();
});
</script>
<template>
  <v-list-item>
    <template v-slot:prepend>
      <v-icon>{{ mdiInformationVariant }}</v-icon>
    </template>
    <v-list-item-title>
      {{ version }}
    </v-list-item-title>
  </v-list-item>
</template>
