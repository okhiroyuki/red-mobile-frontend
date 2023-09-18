<script>
import NavList from "@/components/NavList.vue";
import Tab from "@/components/UploadTab.vue";
import { mdiMenu } from "@mdi/js";

export default {
  components: {
    NavList,
    Tab,
  },
  data() {
    return {
      navigation: false,
      title: "RedMobile",
      appIcon: mdiMenu,
      showTab: false,
      selectTab: 0,
      version: "",
    };
  },
  watch: {
    $route(to) {
      this.createPageParams(to);
    },
  },
  methods: {
    createPageParams(to) {
      this.title = to.meta.title;
      this.appIcon = to.meta.icon;
      this.showTab = to.meta.tab;
    },
    navClick() {
      this.version = this.$root.getVersion();
      if (this.appIcon === mdiMenu) {
        this.$root.sidebar = true;
      } else {
        this.$router.push({ path: "/" });
      }
    },
    closeDrawer(i) {
      this.$root.sidebar = false;
      if (i === "5") {
        this.$root.requestReview();
      }
    },
  },
};
</script>

<template>
  <v-app>
    <v-app-bar color="red darken-4" dark app>
      <v-app-bar-nav-icon :icon="appIcon" @click="navClick" />
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <template v-if="showTab" #extension>
        <Tab />
      </template>
    </v-app-bar>

    <v-navigation-drawer v-model="$root.sidebar" absolute temporary>
      <NavList :version="version" @event-click="closeDrawer" />
    </v-navigation-drawer>

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
