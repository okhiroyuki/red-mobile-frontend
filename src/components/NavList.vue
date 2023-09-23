<template>
  <v-list>
    <v-list-item title="RedMobile">
      <template v-slot:prepend>
        <v-avatar size="36px">
          <v-img v-bind:src="logo" />
        </v-avatar>
      </template>
    </v-list-item>
  </v-list>
  <v-divider />

  <v-list v-model="selectedItem">
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
    <v-list-item>
      <template v-slot:prepend>
        <v-icon>{{ mdiInformationVariant }}</v-icon>
      </template>
      <v-list-item-title>
        {{ version }}
      </v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script setup>
import {
  mdiHome,
  mdiCloudUpload,
  mdiCog,
  mdiLicense,
  mdiNoteText,
  mdiGooglePlay,
  mdiOpenInNew,
  mdiInformationVariant,
} from "@mdi/js";
import logo from "../assets/logo.png";
import { ref, onMounted } from "vue";
import { getVersion } from "../cordova/version";
import { requestReview } from "../cordova/util";

const selectedItem = ref(1);
const version = ref("");
const items = ref([
  {
    text: "Home",
    icon: mdiHome,
    to: "/",
    target: "",
    subIcon: "",
  },
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
    to: "/policy",
    target: "",
    subIcon: "",
  },
  {
    text: "Feedback",
    icon: mdiGooglePlay,
    to: "",
    target: "",
    subIcon: mdiOpenInNew,
  },
]);

const formatVersion = async () => {
  version.value = `Version ${await getVersion()}`;
};

onMounted(() => {
  formatVersion();
});

const click = (item) => {
  if (item.text === "Feedback") {
    requestReview();
  }
};
</script>
