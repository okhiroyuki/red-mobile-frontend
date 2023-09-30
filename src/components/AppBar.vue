<script setup>
import UploadTab from "./UploadTab.vue";
import NavigationDrawer from "./NavigationDrawer.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";

const emits = defineEmits(["tabTitleClick"]);
const props = defineProps({
  appIcon: String,
  title: String,
  showUploadTab: Boolean,
});

const appIcon = ref(props.appIcon);
const title = ref(props.title);
const showUplaodTab = ref(props.showUploadTab);

const sidebar = ref(false);
const router = useRouter();

const tabTitleClick = (tabTitle) => {
  emits("tabTitleClick", tabTitle);
};

const navIconClick = () => {
  console.log("navIconClick :" + title.value);
  if (title.value === "Home") {
    sidebar.value = !sidebar.value;
  } else {
    router.push("/");
  }
};
</script>

<template>
  <v-app-bar color="red darken-4" dark app>
    <v-app-bar-nav-icon :icon="appIcon" @click="navIconClick" />
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <template v-if="showUplaodTab" #extension>
      <UploadTab @tabTitleClick="tabTitleClick" />
    </template>
  </v-app-bar>
  <NavigationDrawer :sidebar="sidebar" />
</template>
