<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import NavigationDrawer from "./BaseNavigationDrawer.vue";
import Tab from "./BaseTab.vue";

const emits = defineEmits<{
  tabTitleClick: [value: string];
}>();
const props = defineProps({
  appIcon: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  showTab: {
    type: Boolean,
    required: false,
    default: false,
  },
  tabTitles: {
    type: Array,
    required: false,
    default: () => [],
  },
});

const appIcon = ref(props.appIcon);
const title = ref(props.title);
const showTab = ref(props.showTab);
const tabTitles = ref(props.tabTitles);

const sidebar = ref(false);
const router = useRouter();

const tabTitleClick = (tabTitle: string) => {
  emits("tabTitleClick", tabTitle);
};

const navIconClick = () => {
  console.log(`navIconClick :${title.value}`);
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
    <template v-if="showTab" #extension>
      <Tab @tabTitleClick="tabTitleClick" :titles="tabTitles" />
    </template>
  </v-app-bar>
  <NavigationDrawer :sidebar="sidebar" />
</template>
