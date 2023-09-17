<template>
  <v-app>
    <v-navigation-drawer v-model="$root.sidebar" absolute temporary app>
      <NavList :version="version" @event-click="closeDrawer" />
    </v-navigation-drawer>

    <v-app-bar color="red darken-4" dark app>
      <v-app-bar-nav-icon @click="navClick">
        <v-icon v-text="appIcon" />
      </v-app-bar-nav-icon>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <template v-if="showTab" v-slot:extension>
        <Tab />
      </template>
    </v-app-bar>

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

<script>
import NavList from "@/components/NavList.vue";
import Tab from "@/components/UploadTab.vue";

export default {
  components: {
    NavList,
    Tab,
  },
  data: () => ({
    navigation: false,
    title: "RedMobile",
    appIcon: "mdi-menu",
    showTab: false,
    selectTab: 0,
    version: "",
  }),
  watch: {
    // eslint-disable-next-line no-unused-vars
    $route(to, from) {
      this.createPageParams(to);
    },
  },
  methods: {
    createPageParams(to) {
      this.title = to.meta.title;
      this.appIcon = to.meta.icon;
      this.showTab = to.meta.tab;
    },
    // eslint-disable-next-line no-unused-vars
    navClick(e) {
      this.version = this.$root.getVersion();
      if (this.appIcon === "mdi-menu") {
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
