<script setup lang="ts">
import {
  mdiCloudUpload,
  mdiCog,
  mdiGooglePlay,
  mdiLicense,
  mdiNoteText,
  mdiOpenInNew,
} from "@mdi/js";
import { ref } from "vue";
import { requestReview } from "../cordova/util";

const items = ref([
  {
    text: "Upload",
    icon: mdiCloudUpload,
    to: "/upload",
    target: "",
    subIcon: "",
  },
  {
    text: "Setting",
    icon: mdiCog,
    to: "/setting",
    target: "",
    subIcon: "",
  },
  {
    text: "License",
    icon: mdiLicense,
    to: "/license",
    target: "",
    subIcon: "",
  },
  {
    text: "Privacy Policy",
    icon: mdiNoteText,
    to: "",
    target: "",
    subIcon: mdiOpenInNew,
  },
  {
    text: "Feedback",
    icon: mdiGooglePlay,
    to: "",
    target: "",
    subIcon: mdiOpenInNew,
  },
]);

const click = (item: { text: string }) => {
  if (item.text === "Feedback") {
    requestReview();
  } else if (item.text === "Privacy Policy") {
    window.open("https://red-mobile.github.io/privacypolicy/", "_blank");
  }
};
</script>
<template>
  <v-list-item
    v-for="(item, i) in items"
    :key="i"
    :to="item.to"
    :target="item.target"
    @click="click(item)"
  >
    <template v-slot:prepend>
      <v-icon>{{ item.icon }}</v-icon>
    </template>
    <v-list-item-title>{{ item.text }}</v-list-item-title>
    <template v-slot:append>
      <v-icon v-if="item.subIcon">{{ item.subIcon }}</v-icon>
    </template>
  </v-list-item>
</template>
